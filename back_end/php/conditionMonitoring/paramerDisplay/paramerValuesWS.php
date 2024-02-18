<?php
    ignore_user_abort(); // 后台运行
    set_time_limit(0); // 取消脚本运行时间的超时上限
    include '../../utils/util.php';

    class ReturnRP{
        public $RPTime="";
        public $RP_index="";
        public $RPName="";
        public $RPUnitName="";
        public $RPValue=[];
    }

    function databaseSelect($index){
        //该程序用于查询指定index参数的ATA章节在数据库中的记录
        // $con=mysqli_connect("127.0.0.1", "root", "root", "OMHMS","8889"); 
        $con=mysqli_connect("localhost", "root", "2185", "OMHMS");
        //$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");	
        if (!$con){
            die('Could not connect:' . mysqli_connect_error());
        }

        $res_data = array();

        for($i=0;$i<count($index);$i++){

            $item = new ReturnRP();
            $item->RP_index = $index[$i];

            $query="select `".$index[$i]."` from Upper_MonitoringRP_log_20230313 order by idx DESC LIMIT 1";
            $result = mysqli_query($con, $query);


            $query_RP = "select RP_NAME,RP_Unit_Name from RP_info where RP_index = ".$index[$i];
            $result_RP = mysqli_query($con, $query_RP);
            
            if (mysqli_num_rows($result_RP)>0){
                while($row=mysqli_fetch_assoc($result_RP)){
                    $item->RPUnitName = $row["RP_Unit_Name"];
                    $item->RPName = $row["RP_NAME"];
                }
            }

            if (mysqli_num_rows($result)){
                while($row = mysqli_fetch_assoc($result)){
                    $item->RPValue = $row[$index[$i]];
                }
            }else{
                //A表中无数据，则去B表查询
                $query="select `".$index[$i]."` from Lower_MonitoringRP_log_20230313 order by idx DESC LIMIT 1";
                $result = mysqli_query($con, $query);

                while($row = mysqli_fetch_assoc($result)){
                    $item->RPValue=$row[$index[$i]];
                }
            }

            array_push($res_data, json_encode($item));    
        }
        return $res_data;
    }
    // 以下程序用于页面初始化时展示最初的数据记录
    // 创建用于和前端通过WebSocket交互的Socket
    $client = socketCreate('localhost', 8839);

    // 读取WebSocket端建立连接的报文，用于编写WebSocket回信的头部
    $request = socket_read($client, 81920);
    $headers = headersCreate($request);
    socket_write($client, $headers, strlen($headers));
    echo $request;
    echo $headers;


    // 以下程序用于实现对页面数据随硬件消息的监听与动态更新 
    // 创建用于和硬件设备通过TCP监听的Socket
    $socketTCP = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    // 设置 ip 被释放后立即可使用
    socket_set_option($socketTCP, SOL_SOCKET, SO_REUSEADDR, true);
    socket_bind($socketTCP, '127.0.0.1', 3047);
    socket_listen($socketTCP);

    //设置client，socketTCP为非阻塞模式
    socket_set_nonblock($client);
    socket_set_nonblock($socketTCP);

    while(true){
        $buf = socket_read($client, 81920);

        //持续判断，如果前端没有发送index，则阻塞直至收到前端发来的index
        if ($buf) {

            $buff = websocketDecode($buf);

            if($buff == "back"){
                echo "continue is used";
                continue;
            }

            // 读取前端所选取参数的index，将string形式的index参数解码后，转为array格式
            $index = explode(',', $buff);

            echo "index is: $buff end\n";
            // 查询选中index所对应的数据
            // 装载了json格式数据的数组$res被转为了string格式，并经过了encode编码以便socket和websocket通信，最终传输的数据类型为string
            $res = databaseSelect($index);
            $result = websocketEncode(implode($res));

            // 数据写回给前端
            socket_write($client, $result, strlen($result));

            //监听硬件设备是否通过127.0.0.1/3046端口以TCP传输发送信息
            //若发送信息，则立即查询数据库，并将信息通过localhost/8874端口以Websocket的形式传输给前端
            //此处并没有来自监听硬件设备的信息，而是直接以1Hz的频率查询数据库并返回
            // $conn_sock = socket_accept($socketTCP);
            // socket_getpeername($conn_sock, $ip, $port);

            while (true) {
                sleep(1);
                //如果前端传来退出的消息，则直接跳出当前循环，阻塞至下一次index读取
                if(websocketDecode(socket_read($client, 81920)) == "back"){
                    break;
                }
                $res = databaseSelect($index);
                $result = websocketEncode(implode($res));
                socket_write($client, $result, strlen($result));
            }
        }
    }



    
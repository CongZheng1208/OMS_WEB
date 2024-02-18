<?php
    ignore_user_abort(); // 后台运行
    set_time_limit(0); // 取消脚本运行时间的超时上限

    include '../../utils/util.php';

    // 创建用于和前端通过WebSocket交互的Socket
    $client = socketCreate('localhost', 8789);

    // 读取WebSocket端建立连接的报文，用于编写WebSocket回信的头部
    $request = socket_read($client, 8192);
    $headers = headersCreate($request);
    socket_write($client, $headers, strlen($headers));

    // 创建用于和硬件设备通过TCP监听的TCP Socket
    $socketTCP = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    // 设置 ip 被释放后立即可使用
    socket_set_option($socketTCP, SOL_SOCKET, SO_REUSEADDR, true);

    //监听时，需要监听自身主机的外网ip地址（192.168.1.149）对应端口，而非目标连接主机ip
    //socket_bind($socketTCP, '192.168.1.149', 5043);
    socket_bind($socketTCP, "127.0.0.1", 5039);
    socket_listen($socketTCP);

    echo $request;
    echo $headers;

    // 设置client和socketTCP均为非阻塞模式
    socket_set_nonblock($client);
    socket_set_nonblock($socketTCP);



    $str = "{\"testId\":10}";
    $flag = 0;
    $str1 =  websocketEncode("NothingReceived"); 


    // 以下程序用于实现对页面数据随TCP数据端的监听与动态更新 
    // 监听前端页面流转事件，并通过目标端口以TCP传输动态更新选中ip所对应的数据
    while (true) {

        // 读取前端所选取参数的id
        $buf = socket_read($client, 8192);

        // 若前端发来数据，则继续
        if($buf){
        
            $id = websocketDecode($buf);

            echo "The id msg from vue is:";
            echo $id;
            echo "\n";

            //首次TCP建立
            if($flag == 0){
                $socketReadBufferTCP = socket_accept($socketTCP);
                $flag = 1;
            }
            

            // 如果没有收到TCP数据端传来的数据，则跳出本次循环继续等待TCP端数据
            if(!$socketReadBufferTCP){
                echo "No connection with TCP socket\n";
                continue;
            }

            //如果id为IamBack，则证明目前已退出该页面，可能面临重新选择id
            //立刻退出当前循环，重新监听id，并向TCP数据端发送信息以使其
            if(substr($id,0,6) == "ImBack"){
                
                socket_write($socketReadBufferTCP, $str, strlen($str));
                echo "back is used";
                echo $id;
                continue;
            }

            //将客户端传入的id等数据传给DET数据设备端
            socket_getpeername($socketReadBufferTCP, $ip, $port);

            $id = "{\"testId\":".$id."}";
            //$id = "{\"testId\":10}";
            socket_write($socketReadBufferTCP, $id, strlen($id));
            echo "send to TCP successfully";
    

            while (true) {
                sleep(1);

                $msg = socket_read($client, 8192);
                $msg = websocketDecode($msg);
        
                if(substr($msg,0,6) == "ImBack"){
                    echo "Break is used\n";
                    echo $msg;
                    echo "\n";
                    echo "The msg send to sw is :\n";
                    echo $str;
                    echo "\n";

                    socket_write($socketReadBufferTCP, $str, strlen($str));

                    echo "Send successfully!\n";
                    break;
                }
                
                //将从数据设备端获得的数据，通过websocket传给前端
                $result = socket_read($socketReadBufferTCP, 81920);

                if(!$result){
                    echo "No data sent by TCP socket\n";
                    // 如果没有从TCP端收到任何信息，则重复发送上一秒的数据
                    socket_write($client, $str1, strlen($str1));
                }else{
                    // DET端传入的数据是json格式。因此需要将其转为string格式，并去除result中所有的转义符，以方便websocket传输
                    $resultBuffer = $result; 
                    $result = websocketEncode(json_encode(json_decode(json_encode($result))));
                    socket_write($client, $result, strlen($result));
                }
            }
        }
    }





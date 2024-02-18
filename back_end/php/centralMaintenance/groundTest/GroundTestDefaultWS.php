<?php
    ignore_user_abort(); // 后台运行
    set_time_limit(0); // 取消脚本运行时间的超时上限
    include '../../utils/util.php';

	class ReturnJson{
		public $id=0;
		public $ATA=0;
		public $equ_name="";
		public $test_name="";
		public $start_time="";
		public $status = 0;
		public $progress = 0;
		public $status_cfg_index = 0;
		public $status_test_index = 0;
		public $ata_index =0;
		public $equi_index = 0;
		public $instruct = 0;
	}
    function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }
    function databaseSelect(){

        $statusArray = [
            "GROUND_TEST_PASS",
            "GROUND_TEST_INPUT_REQUIRED",
            "GROUND_TEST_IN_PROGRESS",
            "GROUND_TEST_NOT_STARTED",
            "GROUND_TEST_FAIL",
            "GROUND_TEST_PAUSED",
            "GROUND_TEST_INHIBITED",
            "GROUND_TEST_ERROR",
            "GROUND_TEST_ABORTED",
            "GROUND_TEST_COMPLETE"
        ];
        //该程序用于查询指定index参数的ATA章节在数据库中的记录
        // $con=mysqli_connect("127.0.0.1", "root", "root", "OMHMS","8889"); 

        $con = mysqli_connect("localhost", "root", "root", "OMHMS");
        if (!$con){
            die('Could not connect:' . mysqli_connect_error());
        }
        // 查表failure_log
        $query="select * from gt_status_table";
        $result = mysqli_query($con, $query);
        $res = array();
        //查询结果的数量
        if (mysqli_num_rows($result) > 0){
            // 获取查询结果的一行
            while($row = mysqli_fetch_assoc($result)){
                $item = new ReturnJson(); 
                $item->id = $row['id']; 
                $item->ATA = $row['ATA'];
                $item->equ_name = $row['equ_name'];
                $item->test_name = $row['test_name'];
                $item->start_time = $row['start_time'];
                $item->status = $statusArray[$row['status']];
                $item->progress = $row['progress'];
                $item->status_cfg_index = $row['status_cfg_index'];
                $item->ata_index = $row['ata_index'];
                $item->equi_index = $row['equi_index'];
                $item->instruct = $row['instruct'];	
                array_push($res, $item);
            }
        }
        return json_encode($res);
    }
    // 以下程序用于页面初始化时展示最初的数据记录
    // 创建用于和前端通过WebSocket交互的Socket
    $client = socketCreate('localhost', 8620);

    // 读取WebSocket端建立连接的报文，用于编写WebSocket回信的头部
    $request = socket_read($client, 81920);
    $headers = headersCreate($request);
    socket_write($client, $headers, strlen($headers));
    echo $request;
    echo $headers;

    // 设置client为非阻塞模式
    socket_set_nonblock($client);

    $flag = 0;

    $clientSocket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    if ($clientSocket === false) {
        echo "创建socket失败！";
        exit();
    }





    while(true){
        $buf = socket_read($client, 81920);
   

        //持续判断，如果前端没有发送index，则阻塞直至收到前端发来的index
        if ($buf) {

            $buff = websocketDecode($buf);

            echo $buff;
            echo "\n";

            if($buff == "back"){
                continue;
            }else if($buff == "start"){
                
                while (true) {
                    sleep(1);
                    //如果前端传来退出的消息，则直接跳出当前循环，阻塞至下一次index读取
                    if(websocketDecode(socket_read($client, 81920)) == "back"){
                        break;
                    }
                    $res = databaseSelect();

                    $result = websocketEncode(json_encode($res));
                    socket_write($client, $result, strlen($result));
                }
        
            }else if(isJson($buff)){

                // 若该信息是json格式， 则进行解析处理
                $buff_json = json_decode($buff, true, 512, JSON_UNESCAPED_UNICODE);

                if(in_array($buff_json["OrderType"], array("continue","abort","run_test", "global_abort", "continueToNextPage"))){

                    // 如果前端传来的是命令相关信息，则传输给后端
                    if($flag == 0){
                        // 连接服务器
                        $result = socket_connect($clientSocket, '127.0.0.1', 3666);
                        if ($result === false) {
                            echo "无法连接到服务器！";
                            exit();
                        }
                        $flag = 1;
                    }

                    socket_write($clientSocket, $buff, strlen($buff));
                    echo "相关命令已被发送\n";

                    // 更进一步，如果前端传来的是交互测试的命令信息，则传输后等待成员系统返回待显示的ScreenId
                    if($buff_json["OrderType"] == "continueToNextPage" && $buff_json["OrderPage"] == "InterferingTest"){
                        $response = socket_read($clientSocket, 1024);

                        preg_match('/\{([^}]*)\}/', $response, $matches);
                        $response = "{".$matches[1]."}";
                        echo "收到服务器响应：$response\n";


                        $result = websocketEncode($response);
                        socket_write($client, $result, strlen($result));

                    }else if(in_array($buff_json["OrderType"], array("continue"))){
        
                        socket_set_option($clientSocket, SOL_SOCKET, SO_RCVTIMEO, array('sec' => 3, 'usec' => 0));

                        while (true) {
                            //从套接字接收数据
                            $response = @socket_read($clientSocket, 1024);
                            
                            if ($response === false) {
                                echo "超时";
                                break;
                            }
                            
                            if ($response !== '') {
                                //处理接收到的数据

                                // preg_match('/\{([^}]*)\}/', $response, $matches);
                                // $response = "{".$matches[1]."}";
                                echo "收到服务器响应：$response\n";


                                $result = websocketEncode($response);
                                socket_write($client, $result, strlen($result));
                                
                                //停止等待
                                break;
                            }
                        }

                    }
                }
            }
        }
    }



    
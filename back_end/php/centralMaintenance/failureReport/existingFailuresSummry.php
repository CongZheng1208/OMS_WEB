<?php
	// 最终返回给前端的对象
	class ReturnJson{
		public $FDE=[];
		public $flight_leg=[];
		public $config_index="";
		public $failure_time="";
		public $flight_phase="";
		public $asso_RP_index="";
		public $failure_state="";
		public $root_fault_index=[];
		public $root_fault_state=[];
		public $failure_name_info="";
		public $FIMCode_info="";
		public $id_index;
	}

	class summaryShow{
		public $FIMCode_info="";
		public $failure_name_info="";
		public $firstTime="";
		public $config_index="";
		public $lastTime="";
		public $id ;
		public $count= 0;		
	}
	// 在306的Centos系统里的mysql密码为
	$con=mysqli_connect("127.0.0.1", "root", "", "omhms", "3306");
	//$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");		
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select * from Failure_Log";
	$result = mysqli_query($con, $query);
	$res = array();
	$inboundCount = 0;
	$summary = array();
	$summayCount = 0;

	// 查询结果的数量
	$num = mysqli_num_rows($result);
	if ($num > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			// 将表中failure_log_info字段的string类型转换为json对象
			$jsonObj = json_decode($row['failure_log_info'], false);
            $item = new ReturnJson(); 
			if(strcmp($jsonObj->{'flight_leg'},'0') == 0)
			{
				// 插入数据
			    $item->config_index = $jsonObj->{'config_index'};
			    $item->failure_time = $jsonObj->{'failure_time'};
			    $item->flight_phase = $jsonObj->{'flight_phase'};
			    $item->failure_state = $jsonObj->{'failure_state'};
			    $item->flight_leg = $jsonObj->{'flight_leg'};
				$item->id_index = $row['idx'];
			    $inboundCount = $inboundCount + 1;
			    array_push($res, $item);
			}	
		}
	}

	$summayCount = 0;
    for($i=0; $i<$inboundCount; $i++){
        if($i == 0){
            $sum = new summaryShow();
            $sum->config_index = $res[$i]->config_index;
			$sum->firstTime = $res[$i]->failure_time;
			$sum->lastTime = $res[$i]->failure_time;
			$sum->id = $res[$i]->id_index;
			$sum->count =1;
			$summayCount =1;
			array_push($summary, $sum);
        }
        else
        {
            $same_flag = 0;
			for($k=0; $k<$summayCount; $k++){
                if(strcmp($summary[$k]->config_index,$res[$i]->config_index) == 0){
                    $summary[$k]->count++;
                    $summary[$k]->lastTime = $res[$i]->failure_time;
					$same_flag = 1;
					break;
                }
            }

			if($same_flag == 0)
			{
				$sum = new summaryShow();
				$sum->config_index = $res[$i]->config_index;
				$sum->firstTime = $res[$i]->failure_time;
				$sum->lastTime = $res[$i]->failure_time;
				$sum->id = $res[$i]->id_index;
				$sum->count = 1;
				$summayCount ++;
				array_push($summary, $sum);
			}
        }                
    }
	
	for($i=0; $i<$summayCount; $i++){
		// 拿着config_index的值查表failure_name_cfg_info
		$index = $summary[$i]->config_index;
		$query = "select failure_name_info, FIMCode_info from failure_name_cfg_info where failure_name_idx = '$index'";
		$result = mysqli_query($con, $query);
		if (mysqli_num_rows($result)>0){
			while($row=mysqli_fetch_assoc($result)){
				// 插入数据
				$summary[$i]->failure_name_info = $row["failure_name_info"];
				$summary[$i]->FIMCode_info = $row["FIMCode_info"];
			}
		}
	}
	echo json_encode($summary);
	// 结束查询
	mysqli_close($con);
?>

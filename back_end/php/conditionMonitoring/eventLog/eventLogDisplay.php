<?php
    //echo phpinfo();
	class ReturnJson{
		public $Event ="";
		public $Time="";
		public $ATA=0;
		public $FlightLeg=0;
		public $FlightPhase="";
	}

	// 在306的Centos系统里的mysql密码为123456
	//$con=mysqli_connect("192.168.0.145", "root", "2185", "OMHMS");
	$con = mysqli_connect("localhost", "root", "root", "OMHMS");

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select * from event_log_info";
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item = new ReturnJson(); 
			$item->Event = $row['Event'];
			$item->Time = $row['Time']; 
            $item->ATA = $row['ATA'];
			$item->FlightLeg = $row['FlightLeg']; 
            $item->FlightPhase = $row['FlightPhase'];
			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
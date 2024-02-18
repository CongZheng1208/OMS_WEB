<?php
    //echo phpinfo();
	class ReturnJson{
		public $parameter ="";
		public $unit="";
		public $event="";
		public $data="";
	}

	// 在306的Centos系统里的mysql密码为123456
	//$con=mysqli_connect("192.168.0.145", "root", "2185", "OMHMS");
	$con = mysqli_connect("localhost", "root", "root", "OMHMS");
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select * from event_parameter_info";
	$result = mysqli_query($con, $query);
	$res = array();

	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item = new ReturnJson(); 
			$item->parameter = $row['parameter'];
			$item->unit = $row['unit'];
			$item->event = $row['event'];
			$item->data = $row['data'];

			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
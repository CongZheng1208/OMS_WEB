<?php
    require_once('connectConfig.php');
	class ReturnJson{
		public $parameter ="";
		public $unit="";
		public $event="";
		public $data="";
	}

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
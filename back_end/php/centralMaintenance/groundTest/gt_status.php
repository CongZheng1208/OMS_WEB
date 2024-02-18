<?php
    //echo phpinfo();
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

	$status = [
		"GROUND TEST PASS",
		"GROUND TEST INPUT REQUIRED",
		"GROUND TEST IN PROGRESS",
		"GROUND TEST NOT STARTED",
		"GROUND TEST FAIL",
		"GROUND TEST PAUSED",
		"GROUND TEST INHIBITED",
		"GROUND TEST ERROR",
		"GROUND TEST ABORTED",
		"GROUND TEST COMPLETE"
	];
	

	// 在306的Centos系统里的mysql密码为123456
	// $con=mysqli_connect("192.168.0.145", "root", "2185", "OMHMS");
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
			$item->status = $status[$row['status']];
			$item->progress = $row['progress'];
			$item->status_cfg_index = $row['status_cfg_index'];
			$item->ata_index = $row['ata_index'];
			$item->equi_index = $row['equi_index'];
			$item->instruct = $row['instruct'];	
			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
<?php

    require_once('connectConfig.php');
	class ReturnSaveList{
		public $listName="";
		public $time="";
		public $paras="";
		public $id = 0;
	}

	class paras{
		public $paraName="";
		public $index=0;
	}
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}

	$query="select * from paraList";
	$result = mysqli_query($con, $query);
	$res = array();
	// 查询结果的数量
	$num = mysqli_num_rows($result);
	if ($num > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			// 将表中failure_log_info字段的string类型转换为json对象
			$jsonObj = json_decode($row['paraList'], false);
			$item = new ReturnSaveList(); 
			// 插入数据
			$item->id = $row['id'];
			$item->listName = $jsonObj->{'listName'};
			$item->time = $jsonObj->{'time'};
			$item->paras = $jsonObj->{'paras'};
			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	mysqli_close($con);

?>
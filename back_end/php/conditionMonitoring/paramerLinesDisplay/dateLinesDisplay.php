<?php
    // 本程序用于根据指定selectedDate，返回该日期对应的所有时间戳
	$selectedDate = $_POST['selectedDate'];

	// 在306的Centos系统里的mysql密码为123456
	$con=mysqli_connect("192.168.0.145", "root", "2185", "OMHMS");	
	//$con=mysqli_connect("192.168.1.149", "root", "Cz19981208!", "OMHMS");
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	$query="select idx from Upper_MonitoringRP_log_".$selectedDate;

	$result = mysqli_query($con, $query);
	$res = array();

	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			array_push($res, substr($row['idx'], -8));
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
<?php
	// 本脚本用于读取所有表名，并从中解析返回有记录数据的日期array
	$con=mysqli_connect("localhost", "root", "root", "OMHMS");
	//$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}

	$query="show tables";
	$result = mysqli_query($con, $query);	
	$res = array();
		
	while($row = mysqli_fetch_array($result)) {	
		if(substr($row[0], 0, 22) == "Upper_MonitoringRP_log"){
			array_push($res, substr($row[0], 23));	
		}	
	}	

	echo json_encode($res);
	// 结束查询
	mysqli_close($con);
?>
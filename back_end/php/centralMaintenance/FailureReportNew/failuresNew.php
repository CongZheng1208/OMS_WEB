<?php
    //echo phpinfo();
	require_once('connectConfig.php');
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="SELECT t1.*
		FROM FailureReportData t1
		JOIN (
			SELECT MAX(id) AS max_id
			FROM FailureReportData
			GROUP BY failureTime, failureNameInfo
		) t2
		ON t1.id = t2.max_id;";
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item = json_decode($row['Log']);
			$item->id = $row['id'];
			$item->failureState = $row['failureState'];

			array_push($res, json_decode(json_encode($item)));
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
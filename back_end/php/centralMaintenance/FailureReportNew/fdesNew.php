<?php
    //echo phpinfo();
	require_once('connectConfig.php');
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="SELECT * FROM FDE;";
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item->FDECode  = $row['FDECode'];
			$item->FDEStatus  = $row['FDEStatus'];
			$item->FDEText  = $row['FDEText'];
			$item->FDEClass  = $row['FDEClass'];

			array_push($res, json_decode(json_encode($item)));
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
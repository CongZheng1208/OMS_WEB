<?php
    //echo phpinfo();
	require_once('connectConfig.php');
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}

	$failureNameInfo = $_POST['failureNameInfo'];

	// 查询数据库中符合ID条件的数据
	$query = "SELECT * FROM FailureNoteData WHERE failureNameInfo = '$failureNameInfo' LIMIT 1";
	
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item->failureNameInfo  = $row['failureNameInfo'];
			$item->failureNote  = $row['failureNote'];
			array_push($res, json_decode(json_encode($item)));
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
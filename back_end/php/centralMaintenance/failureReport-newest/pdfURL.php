<?php
    // 本程序用于返回选中FIM码所对应的文档资源的URL尾部
	// $selectedDate = $_POST['FIMCode'];

	require_once('connectConfig.php');

	$selectedDate = "34-46032";
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	$query="select FIM_url from failure_name_cfg_info where FIMCode_info = \"".$selectedDate."\"";

	$result = mysqli_query($con, $query);
	$res = array();

	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			array_push($res, $row['FIM_url']);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
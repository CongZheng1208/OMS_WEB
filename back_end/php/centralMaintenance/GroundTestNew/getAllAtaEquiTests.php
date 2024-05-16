<?php
	// $con = mysqli_connect("192.168.1.10", "root", "123456", "OMHMS");
	$con = mysqli_connect("localhost", "root", "root", "OMHMS");
	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}

	// 查询数据库获取数据
	$sql = "SELECT * FROM test_message";
	$result = $con->query($sql);

	// 创建一个数组来存储ATA、MemberSystem和Test的关系
	$data = array();

	// 遍历查询结果
	while($row = mysqli_fetch_assoc($result)) {
		$ATA = $row["ATA"];
		$MemberSystemID = $row["MemberSystemID"];
		$memberSystemName = $row["MemberSystemName"];

		$item = new stdClass();

		$item->InitiatedTest_Index = $row['InitiatedTest_Index'];
		$item->ATA = $row['ATA'];
		$item->MemberSystemID = $row['MemberSystemID'];
		$item->MemberSystemName = $row["MemberSystemName"];
		
		$item->InitiatedTestName = $row['InitiatedTestName'];
		$item->InitiatedTest_Status = $row['InitiatedTest_Status'];
		$item->TestDurationTime = $row['TestDurationTime'];
		$item->TestType = $row['TestType'];
		$item->InterferingTests_Index = $row['InterferingTests_Index'];
		$item->Preconditions = $row['Preconditions'];
		$item->TestAvailable = $row['TestAvailable'];
		

	    // 将数据添加到数组中
		$data[$ATA][$MemberSystemID]['MemberSystemName'] = $memberSystemName; // 添加MemberSystemName属性
		$data[$ATA][$MemberSystemID]['Tests'][] = $item; // 添加Tests数组用于存储测试
	}

	//echo json_encode(array_values($data));
	// 输出JSON数据
	echo json_encode($data);

	// 关闭数据库连接
	mysqli_close($con);
?>
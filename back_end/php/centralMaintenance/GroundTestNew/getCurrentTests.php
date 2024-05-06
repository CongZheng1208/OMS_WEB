<?php

	//$con = mysqli_connect("localhost", "root", "root", "OMHMS");
	$con = mysqli_connect("192.168.0.10", "root", "123456", "OMHMS");


	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}


	// 查询数据库中符合ID条件的数据
	$query = "SELECT 
	           InitiatedTest_Index,ATA,InitiatedTestName,
			   InitiatedTest_Status,StartTime,MemberSystemName,TestDurationTime,

			   InhibitConditions_RP_Index, InhibitCondition_Text,
			   InterferingTests_Index, 
			   FailingFault_Index, FailingFault_Trigger_Index,
			   ScreenId, InteractiveScreenText, Screen_Trigger_Index, ResponseMessage


			  FROM test_message 
			  WHERE InitiatedTest_Status != '1'";
	
	$result = mysqli_query($con, $query);

	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			

			$item->InitiatedTest_Index = $row['InitiatedTest_Index'];
			$item->ATA = $row['ATA'];
			$item->InitiatedTestName = $row['InitiatedTestName'];
			$item->InitiatedTest_Status = $row['InitiatedTest_Status'];
			$item->StartTime = $row['StartTime'];
			$item->MemberSystemName = $row['MemberSystemName'];
			$item->TestDurationTime = $row['TestDurationTime'];
			$item->InhibitConditions_RP_Index = $row['InhibitConditions_RP_Index'];
			$item->InhibitCondition_Text = $row['InhibitCondition_Text'];
			$item->InterferingTests_Index = $row['InterferingTests_Index'];
			$item->FailingFault_Index = $row['FailingFault_Index'];
			$item->FailingFault_Trigger_Index = $row['FailingFault_Trigger_Index'];
			$item->ScreenId = $row['ScreenId'];
			$item->InteractiveScreenText = $row['InteractiveScreenText'];
			$item->Screen_Trigger_Index = $row['Screen_Trigger_Index'];
			$item->ResponseMessage = json_decode($row['ResponseMessage']);
		

			array_push($res, json_decode(json_encode($item)));
		}
	}
	echo json_encode($res);

	// 关闭数据库连接
	mysqli_close($con);
?>
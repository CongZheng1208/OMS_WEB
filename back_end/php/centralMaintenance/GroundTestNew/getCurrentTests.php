<?php

require_once ('connectConfig.php');

if (!$con) {
	die("Connection failed: " . mysqli_connect_error());
}


// 查询数据库中符合ID条件的数据
$query = "SELECT 
	           InitiatedTest_Index,ATA,InitiatedTestName,
			   InitiatedTest_Status,StartTime,EndTime,MemberSystemName,
			   FlightLeg,

			   InhibitConditions_Trigger_TEXT,
			   FailingFault_Trigger_TEXT,
			   Screen_Trigger_Index,
			   Error_text

			  FROM test_log 
			  WHERE InitiatedTest_Status != '0'";

$result = mysqli_query($con, $query);

$res = array();

if ($result === FALSE) {
	die("SQL查询失败: " . mysqli_error($connection));
} else {
	//查询结果的数量
	if (mysqli_num_rows($result) > 0) {
		// 获取查询结果的一行

		while ($row = mysqli_fetch_assoc($result)) {
			$item = new stdClass();

			$item->InitiatedTest_Index = $row['InitiatedTest_Index'];
			$item->ATA = $row['ATA'];
			$item->InitiatedTestName = $row['InitiatedTestName'];
			$item->InitiatedTest_Status = $row['InitiatedTest_Status'];
			$item->StartTime = $row['StartTime'];
			$item->EndTime = $row['EndTime'];
			$item->MemberSystemName = $row['MemberSystemName'];
			$item->FlightLeg = $row['FlightLeg'];
			$item->FailingFault_Trigger_Index = $row['FailingFault_Trigger_TEXT'];
			$item->Screen_Trigger_Index = $row['Screen_Trigger_Index'];
			$item->Error_text = $row['Error_text'];
			$item->InhibitConditions_Trigger_Index = $row['InhibitConditions_Trigger_TEXT'];




			// 根据InitiatedTest_Index到test_message表中取得ScreenId和InteractiveScreenText字段
			$testMessageQuery = "
			 SELECT 
			 TestDurationTime, TestType,
			 ScreenId, InteractiveScreenText,
			 ResponseMessage, InterferingTests_Index
			 
			 FROM test_message 
			 WHERE InitiatedTest_Index = {$row['InitiatedTest_Index']}";
			$testMessageResult = mysqli_query($con, $testMessageQuery);

			if (mysqli_num_rows($testMessageResult) > 0) {
				while ($messageRow = mysqli_fetch_assoc($testMessageResult)) {

					$item->TestDurationTime = $messageRow['TestDurationTime'];
					$item->TestType = $messageRow['TestType'];
					$item->ScreenId = $messageRow['ScreenId'];
					$item->InteractiveScreenText = str_replace(array('–', '—', '•'), ' ', $messageRow['InteractiveScreenText']);
					$item->ResponseMessage = @json_decode($messageRow['ResponseMessage']);
					$item->InterferingTests_Index = $messageRow['InterferingTests_Index'];


					// $item->InhibitConditions_RP_Index = $row['InhibitConditions_RP_Index'];
					// $item->InhibitCondition_Text = $row['InhibitCondition_Text'];
					// $item->FailingFault_Index = $row['FailingFault_Index'];
				}
			} else {
				// 如果没找到对应的test_message记录，可以设置默认值或者留空
				$item->TestDurationTime = "";
				$item->TestType = "";
				$item->ScreenId = "";
				$item->InteractiveScreenText = "";
				$item->ResponseMessage = "";
				$item->InterferingTests_Index = "";
			}

			array_push($res, json_decode(json_encode($item)));
		}
	}
}

echo json_encode($res);

// 关闭数据库连接
mysqli_close($con);
?>


<?php
	require_once('connectConfig.php');

	$indexs = $_REQUEST['index']; 
	$indexsAsStrings = array_map('strval', $indexs);

	$timeIndex = $_REQUEST['timeIndex']; 
	// $timeIndex = "2024-06-19 16:08:15"; 

	if (!$con){
		die('Could not connect: ' . mysqli_connect_error());
	}

	$resArrays = array();

	foreach ($indexsAsStrings as $index) {
		$sql = "SELECT * FROM BusRecordData WHERE ParameterName = '$index' and RecordTime = '$timeIndex'";
		$result = mysqli_query($con, $sql);
		
		$tempArray = array();
		while($row = mysqli_fetch_assoc($result)) {
			$recordValues = json_decode($row['RecordValues'], true); 
			$RecordTime = $row['RecordTime'];
			
			foreach ($recordValues as $value) {
				$tempObj = new stdClass();
				$tempObj->data = $value;
				$tempObj->time = $RecordTime; // 每个对象包含 time 和 data 两个属性
				$tempArray[] = $tempObj; // 添加记录对象到tempArray
			}
		}

		array_push($resArrays, $tempArray);
		
		//$resArrays[$index] = $tempArray; // 使用$index作为键值添加到$resArrays中
	}

	echo json_encode($resArrays);
	mysqli_close($con);
?>
<?php
	require_once('connectConfig.php');

	$indexs = $_REQUEST['index']; 
	$indexsAsStrings = array_map('strval', $indexs);

	$timeIndex = $_REQUEST['timeIndex']; 
    //$timeIndex = "2024-06-12 16:08:09"; 

	if (!$con){
		die('Could not connect: ' . mysqli_connect_error());
	}

	$resArrays = array();

	foreach ($indexsAsStrings as $index) {
		$sql = "SELECT * FROM BusRecordData WHERE ParameterName = '$index' and RecordTime = '$timeIndex'";
		$result = mysqli_query($con, $sql);
		
		while($row = mysqli_fetch_assoc($result)) {
			$recordValues = json_decode($row['RecordValues'], true); 
			// $RecordTime = $row['RecordTime'];

			// $tempObj = new stdClass();
			// $tempObj->data = $recordValues[0];
			// $tempObj->time = $RecordTime; 

			array_push($resArrays, $recordValues[0]);
		}		
	}

	echo json_encode($resArrays);
	mysqli_close($con);
?>
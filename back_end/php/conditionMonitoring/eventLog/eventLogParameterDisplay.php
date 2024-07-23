<?php
	require_once('connectConfig.php');

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	$startTime = $_POST['StartTime'];
	$endTime = $_POST['EndTime'];
	$inCondition = $_POST['Params'];

	// 拆分inCondition中的参数为数组
	$paramArray = $inCondition;

	// 创建空数组存储查询结果
	$resultArray = array();

	// 遍历$paramArray数组中的每一个参数名
	foreach ($paramArray as $param) {
		// 查询BusRecordKeys表中key_value等于参数的行
		$query = "SELECT id, key_value, RecordRate, Unit FROM BusRecordKeys WHERE key_value = '$param'";
		$queryResult = $con->query($query);

		if ($queryResult->num_rows > 0) {
			while ($row = $queryResult->fetch_assoc()) {
				// 将查询结果存入对象
				$obj = new stdClass();
				$obj->id = $row['id'];
				$obj->key_value = $row['key_value'];
				$obj->RecordRate = $row['RecordRate'];
				$obj->Unit = $row['Unit'];
				// 将对象存入结果数组
				array_push($resultArray, $obj);
			}
		}
	}



	// 将查询结果数组存入$paramArray
	$paramArray = $resultArray;

	$recordsArray = [];

	foreach ($paramArray as $param) {

		$sql = "SELECT * FROM BusRecordData WHERE RecordTime BETWEEN '$startTime' AND '$endTime' AND ParameterName = '$param->id' LIMIT 100";
	
		$result = $con->query($sql);
		$records = [];

		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
	
				$item = new stdClass();
	
				$item->RecordTime = $row["RecordTime"];

				//$recordValues = array_pad(explode(', ', substr($row['RecordValues'], 1, -1)), $param->RecordRate, explode(', ', substr($row['RecordValues'], 1, -1))[0]);
			      $recordValues = array_pad(explode(', ', substr($row['RecordValues'], 1, -1)), 16, explode(', ', substr($row['RecordValues'], 1, -1))[0]);
				$item->RecordValues = array_slice($recordValues, 0, $param->RecordRate);
				
				$records[] = $item;
			}
		}
		$recordsArray[] = [
			'param' => $param->key_value,
			'records' => $records,
			'value' => $records[0],
			'rate' => $param->RecordRate,
			'units' => $param->Unit,
		];
	}
	
	echo json_encode($recordsArray);
	
	$con->close();
?>
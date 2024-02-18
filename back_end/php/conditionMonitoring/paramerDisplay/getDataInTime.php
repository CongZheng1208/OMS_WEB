<?php

    require_once('connectConfig.php');

	class ReturnItem{
		public $data=[];
		public $time=[];
	}

	$index = $_REQUEST['index']; 

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	

	$finalKeys = array();
	$finalValues = array();
	

	for($i=0;$i<count($index);$i++){
		$keys = array();
		$values = array();

		$query="SELECT Info FROM BusRecord_info WHERE RecordRP_index = $index[$i]";
		// $query="SELECT Info FROM BusRecord_info WHERE MonitoringRP_info = $index[$i]";
		$result = mysqli_query($con, $query);
		$res = array();
		// 查询结果的数量
		$num = mysqli_num_rows($result);
		if ($num > 0){
			// 获取查询结果的一行
			while($row = mysqli_fetch_assoc($result)){
				// 将表中failure_log_info字段的string类型转换为json对象
				$arrayData = json_decode($row['Info'], true);
	
				foreach ($arrayData as $key => $value) {
					$keys[] = $key;
					$values[] = $value;
				}

				$finalKeys[] = $keys;
				$finalValues[] = $values;
			}
		}

	}

	$resDatas = array();
	$resTimes = array();

	$resArrays = array();

	for($i=0;$i<count($finalValues);$i++){

		$datas = array();
		$times = array();

		$resArray = array();

	    for($j=0;$j<count($finalValues[$i]);$j++){
	
			$colId = $finalValues[$i][$j];
			$rowId = $finalKeys[$i][$j];

			$query="SELECT $colId, timestamp FROM ( SELECT * FROM BusRecord ORDER BY idx DESC LIMIT 128) AS subquery WHERE frame_id = $rowId";
			//$query="SELECT $colId, timestamp FROM ( SELECT * FROM MonitoringRP_New ORDER BY idx DESC LIMIT 128) AS subquery WHERE frame_id = $rowId";
			$result = mysqli_query($con, $query);

			$resItem = new ReturnItem();

			if ($result) {
				// 解析数据库查询结果中的 JSON 数据
				$row = mysqli_fetch_assoc($result);

				$resItem->data = json_decode($row["$colId"], true)[$index[$i]];
				$resItem->time = $row["timestamp"];

				array_push($resArray, $resItem);
			} else {
				print_r("!!! ");
				// 查询失败处理逻辑
			}	
		}
		array_push($resArrays, $resArray);
	}

	echo json_encode($resArrays);
	
	mysqli_close($con);

?>
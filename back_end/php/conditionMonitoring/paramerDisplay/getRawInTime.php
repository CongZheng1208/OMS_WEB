<?php
    require_once('connectConfig.php');
	class ReturnItem{
		public $idx=0;
		public $timestamp="";
		public $source_port="";
		public $destination_port="";
		public $ds_number="";
		public $raw_data=[];
	}

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	
	$res = array();

	$query="SELECT * FROM RawDataRecord ORDER BY idx DESC LIMIT 30";
	// $query="SELECT Info FROM BusRecord_info WHERE MonitoringRP_info = $index[$i]";
	$result = mysqli_query($con, $query);

	$num = mysqli_num_rows($result);
	if ($num > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){

			$item = new ReturnItem(); 
			// 插入数据
			$item->idx = $row['idx'];
			$item->timestamp = $row['timestamp'];
			$item->source_port = $row['source_port'];
			$item->destination_port = $row['destination_port'];
			$item->ds_number = $row['ds_number'];
			$item->raw_data = $row['raw_data'];
			array_push($res, $item);
		}

	}
	
	echo json_encode($res);
	
	mysqli_close($con);

?>
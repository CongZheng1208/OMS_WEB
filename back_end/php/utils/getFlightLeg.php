<?php
    $con=mysqli_connect("192.168.1.145", "root", "2185", "OMHMS");
	class ReturnItem{
		public $flightLeg=0;
		public $flightNumber="";
		public $startTime="";
		public $departure="";
		public $destination="";
	}

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	
	$res = array();

	$query="SELECT * FROM FlightLegData";
	$result = mysqli_query($con, $query);

	$num = mysqli_num_rows($result);
	if ($num > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){

			$item = new ReturnItem(); 
			// 插入数据
			$item->flightLeg = $row['flightLeg'];
			$item->flightNumber = $row['flightNumber'];
			$item->startTime = $row['startTime'];
			$item->departure = $row['Departure'];
			$item->destination = $row['Destination'];
			array_push($res, $item);
		}
	}
	
	echo json_encode($res);
	
	mysqli_close($con);

?>
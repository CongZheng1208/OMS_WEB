<?php
    require_once('connectConfig.php');
	class ReturnJson{
		public $Event ="";
		public $Time="";
		public $ATA="";
		public $FlightLeg="";
		public $FlightPhase="";

		public $eventType =  "";
		public	$relativeStop =  0;
		public	$relativeStart = 0;
		public $associatedParams = [];
	}

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select * from EventLogData";
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item = new ReturnJson(); 

			$resObj = json_decode($row['Log'], true);

			$item->Event = $resObj['eventName'];
			$item->Time =  $resObj['eventTime'];
            $item->ATA =  $resObj['ata'];
			$item->FlightLeg =  $resObj['flightLeg'];
            $item->FlightPhase =  $resObj['flightPhase'];

			$item->eventType =  $resObj['eventType'];
			$item->relativeStop =  $resObj['relativeStop'];
			$item->relativeStart =  $resObj['relativeStart'];
			$item->associatedParams =  $resObj['associatedParams'];
			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
<?php
    // 本程序用于根据指定selectedParam，返回其在selectedDate对应的所有数据记录
	$selectedParams = $_POST['selectedParams'];
	$selectedDate = $_POST['selectedDate'];

	$con=mysqli_connect("192.168.0.145", "root", "2185", "OMHMS");	
	//$con=mysqli_connect("192.168.1.149", "root", "Cz19981208!", "OMHMS");
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}

	$res = array();

	for($i = 0; $i<count($selectedParams); $i++){
		$subRes = array();

		$query="select `".$selectedParams[$i]."` from Upper_MonitoringRP_log_".$selectedDate;
		$result = mysqli_query($con, $query);

		if (mysqli_num_rows($result)){
			while($row = mysqli_fetch_assoc($result)){
				array_push($subRes, $row[$selectedParams[$i]]);
			}
		}else{
			//A表中无数据，则去B表查询
			$query="select `".$selectedParams[$i]."` from Lower_MonitoringRP_log_".$selectedDate;
		    $result = mysqli_query($con, $query);

			while($row = mysqli_fetch_assoc($result)){
				array_push($subRes, $row[$selectedParams[$i]]);
			}
		}
		array_push($res, $subRes);
	}

	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
<?php
	class ReturnJson{
		public $idx ="";
		public $name="";
	}
    //访问A、B表中4000多个参数的idx，并返回其idx和名称
	//$con=mysqli_connect("192.168.1.149", "root", "Cz19981208!", "OMHMS");
	$con=mysqli_connect("192.168.0.145", "root", "2185", "OMHMS");
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	$query0="select column_name from information_schema.columns where table_schema='OMHMS' and table_name='Upper_MonitoringRP_log_20230224';";
	$query1="select column_name from information_schema.columns where table_schema='OMHMS' and table_name='Lower_MonitoringRP_log_20230224';";
	
	$flag0 = false;
	$flag1 = false;
	$res = array();
	$paramerList = array();

	$result = mysqli_query($con, $query0);
	if (mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			if($flag0 == false){
				$flag0 = true;
			}else{
			   array_push($res, $row["column_name"]);
			}
		}
	}

	$result = mysqli_query($con, $query1);
	if (mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			if($flag1 == false){
				$flag1 = true;
			}else{
				array_push($res, $row["column_name"]);	
			}
		}
	}

	for ($i=0; $i<count($res); $i++){
		$query2="select RP_Name from RP_info where RP_index = $res[$i];";
		$xres = mysqli_query($con, $query2);
		$row = mysqli_fetch_assoc($xres);

		$item = new ReturnJson(); 
		$item->idx = $res[$i];
		$item->name = $row['RP_Name'];
		array_push($paramerList, $item);
	}
	
	echo json_encode($paramerList);
	
	// 结束查询
	mysqli_close($con);
?>
<?php
    require_once('connectConfig.php');
	class ReturnItem{
		public $unit=0;
	}

	$index = $_REQUEST['index']; 

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	
	$res = array();

	for($i=0;$i<count($index);$i++){

		$query="SELECT RP_Unit_Name FROM RP_info WHERE RP_index = $index[$i]";
		$result = mysqli_query($con, $query);

		// $num = mysqli_num_rows($result);
		$row = mysqli_fetch_assoc($result);

		$item = new ReturnItem(); 
		// 插入数据
		$item->unit = $row['RP_Unit_Name'];
		array_push($res, $item);


		// if ($num > 0){
		// 	// 获取查询结果的一行
		// 	while($row = mysqli_fetch_assoc($result)){

		// 		$item = new ReturnItem(); 
		// 		// 插入数据
		// 		$item->unit = $row['RP_Unit_Name'];
		// 		array_push($res, $item);
		// 	}

		// }


	}

	
	echo json_encode($res);
	
	mysqli_close($con);

?>
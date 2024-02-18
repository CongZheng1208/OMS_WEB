<?php

    require_once('connectConfig.php');
	class ReturnSaveList{
		public $listName="";
		public $time="";
		public $paras="";
	}

	class paras{
		public $paraName="";
		public $index=0;
	}
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}

	$postList =  $_REQUEST['index'];

	$data = new ReturnSaveList();	
	$data->listName = $_REQUEST['ListName'];
	date_default_timezone_set("PRC");
	$data->time=date("Y-m-d H:i:s");
	
	$para=$_REQUEST['paras'];
	
	$data->paras = array();

	for($i=0;$i<count($para);$i++){
		// $data->paras[$i]->index=$para[$i];
		$query_RP = "select RP_Name from RP_info where RP_index = $para[$i]";
		$result_RP = mysqli_query($con, $query_RP);
		if (mysqli_num_rows($result_RP)>0){
			while($row_RP=mysqli_fetch_assoc($result_RP)){
			    $data->paras[$i] = new paras();
				$data->paras[$i]->index = $para[$i];
				$data->paras[$i]->paraName=$row_RP["RP_Name"];
			}
		}
	}
	$json_string = json_encode($data);

	echo $json_string;



	//$index = intval($postList );
	$query_del ="UPDATE paraList SET paraList = '$json_string' WHERE id = $postList";

	$result = mysqli_query($con, $query_del);


	// if (!$result) {
	// 	die('Error: ' . mysqli_error($con));
	// }
	
	mysqli_close($con);

?>
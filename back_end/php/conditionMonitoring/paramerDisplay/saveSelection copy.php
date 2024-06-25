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

	$data = new ReturnSaveList();	
	$data->listName = $_REQUEST['ListName'];
	date_default_timezone_set("PRC");
	$data->time=date("Y-m-d H:i:s");
	
	$para=$_REQUEST['paras'];
	//$para = json_decode($para);
	
	$data->paras = array();
	for($i=0;$i<count($para);$i++){
		$data->paras[$i] = new paras();
		$data->paras[$i]->index = $para[$i]['id'];
		$data->paras[$i]->paraName = $para[$i]['para'];
	}
	$json_string=json_encode($data);

	$sql="insert into paraList (id, paraList) values (null,'$json_string')";

	if(!mysqli_query($con,$sql)){
		echo "Error:".$sql."<br>".mysqli_error($con);
	}

	mysqli_close($con);
?>
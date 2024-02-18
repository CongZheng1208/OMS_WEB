<?php
    require_once('connectConfig.php');
	class ReturnRP{
		public $RPTime="";
		public $RP_list=[];
	}

	class ReturnRPList{
		public $RP_index="";
		public $RPName="";
		public $RPUnitName="";
		public $RPValue=[];
	}
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	$index = $_REQUEST['index'];   //TBD 
	//$index = [51,82];

    $res = array();
	$query="select * from MonitoringRP_log order by idx DESC LIMIT 30";
	$result= mysqli_query($con, $query);
	if (mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			//echo json_encode($row);
			$item = new ReturnRP();
			$item->RPTime = $row["idx"];
			$item->RP_list = array();
			$jsonObj = json_decode($row['data'], false);
			    
			for($i=0;$i<count($index);$i++){
				$itemRP = new ReturnRPList();
				$itemRP->RP_index = $index[$i];
				$id = intval($itemRP->RP_index);
				$itemRP->RPValue = $jsonObj->{$id};
				$query_RP = "select RP_NAME,RP_Unit_Name from RP_info where RP_index = $itemRP->RP_index";
				$result_RP = mysqli_query($con, $query_RP);
				if (mysqli_num_rows($result_RP)>0){
					while($row=mysqli_fetch_assoc($result_RP)){
						$itemRP->RPUnitName = $row["RP_Unit_Name"];
						$itemRP->RPName = $row["RP_NAME"];
						array_push($item->RP_list, $itemRP);
					}
				}
			}
			array_push($res, $item);
		}
						
	}
		
    echo json_encode($res);
    // 结束查询
    mysqli_close($con);

?>
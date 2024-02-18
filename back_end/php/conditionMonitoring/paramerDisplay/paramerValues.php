<?php
    require_once('connectConfig.php');
	class ReturnRP{
		public $RPTime="";
		public $RP_index="";
		public $RPName="";
		public $RPUnitName="";
		public $RPValue=[];
	}
	$index = $_REQUEST['index'];   

	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}

    $res = array();
	$query_RP="select * from MonitoringRP_log order by idx DESC LIMIT 1";
	$result_RP = mysqli_query($con, $query_RP);
	if (mysqli_num_rows($result_RP) > 0){
		while($row_RP = mysqli_fetch_assoc($result_RP)){
			$jsonObj = json_decode($row_RP['data'], false);
			
				for($i=0;$i<count($index);$i++){
					$item = new ReturnRP();
					$item->RPTime = $row_RP["idx"];
					$item->RP_index = $index[$i];
					$id = intval($item->RP_index);
					$item->RPValue = $jsonObj->{$id};
					$query_RP = "select RP_NAME,RP_Unit_Name from RP_info where RP_index = $item->RP_index";
					$result_RP = mysqli_query($con, $query_RP);
					
					if (mysqli_num_rows($result_RP)>0){
						while($row=mysqli_fetch_assoc($result_RP)){
							$item->RPUnitName = $row["RP_Unit_Name"];
							$item->RPName = $row["RP_NAME"];
							array_push($res, $item);
						}
					}
				}
				
		}
					
	}
		
    echo json_encode($res);
    // 结束查询
    mysqli_close($con);

?>
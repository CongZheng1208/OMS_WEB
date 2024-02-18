<?php

    require_once('connectConfig.php');

	class ReturnRP{
		public $RP_index="";
		public $RPName="";
		public $RPUnitName="";
		public $ATA="";
	}

	class ReturnRPList{
		public $RP_index="";
		public $RPName="";
		public $ATA="";
	}
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	
    $res = array();
	$query_RP="select RP_index,RP_Name,RP_Unit_Name,ATA from RP_info where RP_index in (select RecordRP_index from BusRecord_info)";
	$result_RP = mysqli_query($con, $query_RP);
	if (mysqli_num_rows($result_RP) > 0){
		while($row_RP = mysqli_fetch_assoc($result_RP)){
			$item = new ReturnRP();
			$item->RP_index = $row_RP["RP_index"];
			$item->RPName = $row_RP["RP_Name"];
			$item->RPUnitName = $row_RP["RP_Unit_Name"];
			$item->ATA = $row_RP["ATA"];
			array_push($res, $item);
		}			
	}

	$resList = array();
	for($i=0;$i<count($res);$i++){
		if($i==0){
			$itemList = new ReturnRPList();
			$itemList->ATA = $res[$i]->ATA;
			$itemList->RPName = array();
			array_push($itemList->RPName,$res[$i]->RPName);
			$itemList->RP_index = array();
			array_push($itemList->RP_index,$res[$i]->RP_index);
			array_push($resList,$itemList);
		}else{
			$same_flag = 0;
			for($j=0;$j<count($resList);$j++){
				if($res[$i]->ATA == $resList[$j]->ATA){
					array_push($resList[$j]->RPName,$res[$i]->RPName);
					array_push($resList[$j]->RP_index,$res[$i]->RP_index);
					$same_flag = 0;
					break;
				}else{
					$same_flag = 1;
				}
			}
			if($same_flag == 1)
			{
				$itemList = new ReturnRPList();
				$itemList->ATA = $res[$i]->ATA;
				$itemList->RPName = array();
				array_push($itemList->RPName,$res[$i]->RPName);
				$itemList->RP_index = array();
				array_push($itemList->RP_index,$res[$i]->RP_index);
				array_push($resList,$itemList);
			}
		}
	}	
		
    echo json_encode($resList);
    // 结束查询
    mysqli_close($con);

?>
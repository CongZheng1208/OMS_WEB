<?php
   //echo phpinfo();
    require_once('connectConfig.php');
	// 最终返回给前端的对象
	class ReturnJson{
		public $FDE=[];
		public $flight_leg=[];
		public $config_index="";
		public $failure_time="";
		public $flight_phase="";
		public $asso_RP_index="";
		public $failure_state="";
		public $root_fault_index=[];
		public $root_fault_state=[];
		public $failure_name_info="";
		public $FIMCode_info="";
		public $FDEText ="";
		public $fault_name="";
		public $RP_name="";
		public $RP_value="";
		public $RP_Unit = "";
		public $maintence_time=[];
		public $maitence_text="";
		public $FDETime="";
		public $FDEState=[];
		public $FDEClass=[];
		public $id=[];
	}
	
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select idx,failure_log_info from Failure_Log";
	$result = mysqli_query($con, $query);
	$res = array();
	// 查询结果的数量
	$num = mysqli_num_rows($result);
	if ($num > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			// 将表中failure_log_info字段的string类型转换为json对象
			$jsonObj = json_decode($row['failure_log_info'], false);
			$item = new ReturnJson(); 
			// 插入数据
			$item->id = $row['idx'];
			$item->config_index = $jsonObj->{'config_index'};
			$item->failure_time = $jsonObj->{'failure_time'};
			$item->flight_phase = $jsonObj->{'flight_phase'};
			$item->failure_state = $jsonObj->{'failure_state'};
			$item->flight_leg = $jsonObj->{'flight_leg'};
            $item->FDE = $jsonObj->{'FDE'};
			$item->root_fault_index=$jsonObj->root_fault_index;
			$item->root_fault_state=$jsonObj->root_fault_state;
			$item->asso_RP_index=$jsonObj->asso_RP_index;
			$item->RP_value=$jsonObj->asso_RP_value;
			array_push($res, $item);
		}
		for($i=0; $i<count($res); $i++){
			// 拿着config_index的值查表failure_name_cfg_info
			$index = $res[$i]->config_index;
			$query = "select failure_name_info, FIMCode_info,MaintenanceTime,MaintenanceText from failure_name_cfg_info where failure_name_idx = '$index'";
			$result = mysqli_query($con, $query);
			if (mysqli_num_rows($result)>0){
				while($row=mysqli_fetch_assoc($result)){
					// 插入数据
					$res[$i]->failure_name_info = $row["failure_name_info"];
					$res[$i]->FIMCode_info = $row["FIMCode_info"];
					$res[$i]->maintence_time = $row["MaintenanceTime"];
					$res[$i]->maitence_text = $row["MaintenanceText"];
				}
			}

			$res[$i]->FDEText  = array();
			$res[$i]->FDETime  = array();
			$res[$i]->FDEState  = array();
			$res[$i]->FDEClass  = array();
			for($j=0; $j<count($res[$i]->FDE); $j++){
				$FDEIndex = intval($res[$i]->FDE[$j]);
				$query_fde = "select fde_text,fde_state,fde_level from fde_info where idx = $FDEIndex";
				$result_fde = mysqli_query($con, $query_fde);
				if (mysqli_num_rows($result_fde)>0){
					while($row_fde=mysqli_fetch_assoc($result_fde)){
						// 插入数据
						array_push($res[$i]->FDEText,  $row_fde["fde_text"]);
						array_push($res[$i]->FDETime,$res[$i]->failure_time);
						array_push($res[$i]->FDEState,$row_fde["fde_state"]);
						array_push($res[$i]->FDEClass,$row_fde["fde_level"]);
					}
				}
			}
            
			$res[$i]->fault_name = array();
			for($j=0; $j<count($res[$i]->root_fault_index); $j++){
				$fault_index = intval($res[$i]->root_fault_index[$j]);  
				$query_fault = "select fault_name_info from fault_name_cfg_info where falut_name_idx = $fault_index";
				$result_fault = mysqli_query($con, $query_fault);
				if (mysqli_num_rows($result_fault)>0){
					while($row_fault=mysqli_fetch_assoc($result_fault)){
						array_push($res[$i]->fault_name,  $row_fault["fault_name_info"]);
					}
				}
			}

			$res[$i]->RP_name = array();
			$res[$i]->RP_Unit = array();
			for($j=0; $j<count($res[$i]->asso_RP_index); $j++){
				$RP_index = intval($res[$i]->asso_RP_index[$j]);  
				$query_RP = "select RP_NAME,RP_Unit_Name from RP_INFO where RP_index = $RP_index";
				$result_RP = mysqli_query($con, $query_RP);
				if (mysqli_num_rows($result_RP)>0){
					while($row_RP=mysqli_fetch_assoc($result_RP)){
						array_push($res[$i]->RP_name,  $row_fault["RP_NAME"]);
						array_push($res[$i]->RP_Unit,  $row_fault["RP_Unit_Name"]);
					}
				}
			}

		}

	   //echo json_encode($res);
	}


	$index = $_POST['index'];
	for($i=0;$i<count($res);$i++)
	{
		if($index == $res[$i]->id)
		{
			echo json_encode($res[$i]);
		}
	}

	// 结束查询
	mysqli_close($con);
?>

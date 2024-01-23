<?php
   //echo phpinfo();
	// 最终返回给前端的对象
	class ReturnJson{
		public $fde=[];
		public $flight_leg=[];
		public $config_index="";
		public $failure_time="";
		public $flight_phase="";
		public $asso_RP_index="";
		public $failure_state="";
		public $root_fault_index=[];
		public $root_fault_state=[];
		public $failure_name_info="";
		public $fimcode_info="";
		public $fde_text ="";
		public $fault_name="";
		public $rp_name="";
		public $rp_value="";
		public $rp_unit = "";
		public $maintence_time=[];
		public $maitence_text="";
		public $fde_time="";
		public $fde_state=[];
		public $fde_class=[];
		public $id=[];
		public $ata=[];
	}
	// 在306的Centos系统里的mysql密码为
	$con=mysqli_connect("127.0.0.1", "root", "", "omhms", "3306");	
	//$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");		
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
			$item->config_index = $jsonObj->{'config_index'};
			$item->failure_time = $jsonObj->{'failure_time'};
			$item->flight_phase = $jsonObj->{'flight_phase'};
			$item->failure_state = $jsonObj->{'failure_state'};
			$item->flight_leg = $jsonObj->{'flight_leg'};
            $item->fde = $jsonObj->{'FDE'};
			$item->root_fault_index=$jsonObj->root_fault_index;
			$item->root_fault_state=$jsonObj->root_fault_state;
			$item->asso_RP_index=$jsonObj->asso_RP_index;
			$item->rp_value=$jsonObj->asso_RP_value;
			$item->id = $row['idx'];
			array_push($res, $item);
		}
		for($i=0; $i<count($res); $i++){
			// 拿着config_index的值查表failure_name_cfg_info
			$index = $res[$i]->config_index;
			$query = "select ATA,failure_name_info, FIMCode_info,MaintenanceTime,MaintenanceText from failure_name_cfg_info where failure_name_idx = '$index'";
			$result = mysqli_query($con, $query);
			if (mysqli_num_rows($result)>0){
				while($row=mysqli_fetch_assoc($result)){
					// 插入数据
					$res[$i]->failure_name_info = $row["failure_name_info"];
					$res[$i]->fimcode_info = $row["FIMCode_info"];
					$res[$i]->maintence_time = $row["MaintenanceTime"];
					$res[$i]->maitence_text = $row["MaintenanceText"];
					$res[$i]->ata = $row["ATA"];
				}
			}

			$res[$i]->fde_text  = array();
			$res[$i]->fde_time  = array();
			$res[$i]->fde_state  = array();
			$res[$i]->fde_class  = array();
			for($j=0; $j<count($res[$i]->fde); $j++){
				$FDEIndex = intval($res[$i]->fde[$j]) ;
				$query_fde = "select fde_text,fde_state,fde_level from fde_info where idx = $FDEIndex";
				$result_fde = mysqli_query($con, $query_fde);
				if (mysqli_num_rows($result_fde)>0){
					while($row_fde=mysqli_fetch_assoc($result_fde)){
						// 插入数据
						array_push($res[$i]->fde_text,  $row_fde["fde_text"]);
						array_push($res[$i]->fde_time,$res[$i]->failure_time);
						array_push($res[$i]->fde_state,$row_fde["fde_state"]);
						array_push($res[$i]->fde_class,$row_fde["fde_level"]);
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

			$res[$i]->rp_name = array();
			$res[$i]->rp_unit = array();
			for($j=0; $j<count($res[$i]->asso_RP_index); $j++){
				$RP_index = intval($res[$i]->asso_RP_index[$j]);  
				$query_RP = "select RP_NAME,RP_Unit_Name from RP_INFO where RP_index = $RP_index";
				$result_RP = mysqli_query($con, $query_RP);
				if (mysqli_num_rows($result_RP)>0){
					while($row_RP=mysqli_fetch_assoc($result_RP)){
						array_push($res[$i]->rp_name,  $row_RP["RP_NAME"]);
						array_push($res[$i]->rp_unit,  $row_RP["RP_Unit_Name"]);
					}
				}
			}

		}

	echo json_encode($res);
	}	
	// 结束查询
	mysqli_close($con);
?>

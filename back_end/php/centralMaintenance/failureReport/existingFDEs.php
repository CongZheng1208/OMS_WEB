<?php
//echo phpinfo();
class ReturnJson
{
	public $FDE = [];
	public $flight_leg = [];
	public $config_index = "";
	public $failure_time = "";
	public $flight_phase = "";
	public $asso_RP_index = "";
	public $failure_state = "";
	public $root_fault_index = [];
	public $root_fault_state = [];
	public $failure_name_info = "";
	public $FIMCode_info = "";
	public $FDEText = "";
	public $fault_name = "";
	public $RP_name = "";
	public $id;
}

// 最终返回给前端的对象
class ReturnFDEJson
{
	public $FDECode = [];
	public $FDEText = "";
	public $FDEStatus = "";
	public $FDEClass = "";
	public $flight_leg = [];
	public $fde_time = "";
	public $flight_phase = "";
	public $FAH = "";
	public $failure_name_info = "";
	public $FIMCode_info = "";
	public $failure_state = [];
	public $id = [];
}

// 在306的Centos系统里的mysql密码为
$con = mysqli_connect("127.0.0.1", "root", "", "omhms", "3306");
//$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");		
if (!$con) {
	die('Could not connect:' . mysqli_connect_error());
}
// 查表failure_log
$query = "select * from Failure_Log";
$result = mysqli_query($con, $query);
$res = array();
//查询结果的数量
$num = mysqli_num_rows($result);
if ($num > 0) {
	// 获取查询结果的一行
	while ($row = mysqli_fetch_assoc($result)) {
		// 将表中failure_log_info字段的string类型转换为json对象
		$jsonObj = json_decode($row['failure_log_info'], false);
		$item = new ReturnJson();
		// 插入数据
		$item->config_index = $jsonObj->{'config_index'};
		$item->failure_time = $jsonObj->{'failure_time'};
		$item->flight_phase = $jsonObj->{'flight_phase'};
		$item->failure_state = $jsonObj->{'failure_state'};
		$item->flight_leg = $jsonObj->{'flight_leg'};
		$item->FDE = $jsonObj->{'FDE'};
		$item->root_fault_index = $jsonObj->root_fault_index;
		$item->root_fault_state = $jsonObj->root_fault_state;
		$item->asso_RP_index = $jsonObj->asso_RP_index;
		$item->id = $row['idx'];
		array_push($res, $item);
	}
	for ($i = 0; $i < count($res); $i++) {
		// 拿着config_index的值查表failure_name_cfg_info
		$index = $res[$i]->config_index;
		$query = "select failure_name_info, FIMCode_info from failure_name_cfg_info where failure_name_idx = '$index'";
		$result = mysqli_query($con, $query);
		if (mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				// 插入数据
				$res[$i]->failure_name_info = $row["failure_name_info"];
				$res[$i]->FIMCode_info = $row["FIMCode_info"];
			}
		}

		$res[$i]->FDEText = array();
		for ($j = 0; $j < count($res[$i]->FDE); $j++) {

			$FDEIndex = intval($res[$i]->FDE[$j]);
			echo "+++++++++++++++++++++++++";
			echo "FDEIndex:" . $FDEIndex;
			$query_fde = "select fde_text from fde_info where idx = $FDEIndex";
			$result_fde = mysqli_query($con, $query_fde);
			if (mysqli_num_rows($result_fde) > 0) {
				while ($row_fde = mysqli_fetch_assoc($result_fde)) {
					// 插入数据
					array_push($res[$i]->FDEText, $row_fde["fde_text"]);
					echo "---------------------";
					echo "iii:" . $i . "    ";
					echo "fde_text:" . $row_fde["fde_text"] . "\n";
				}
			}
		}

		$res[$i]->fault_name = array();
		for ($j = 0; $j < count($res[$i]->root_fault_index); $j++) {
			$fault_index = intval($res[$i]->root_fault_index[$j]);
			$query_fault = "select fault_name_info from fault_name_cfg_info where falut_name_idx = $fault_index";
			$result_fault = mysqli_query($con, $query_fault);
			if (mysqli_num_rows($result_fault) > 0) {
				while ($row_fault = mysqli_fetch_assoc($result_fault)) {
					array_push($res[$i]->fault_name, $row_fault["fault_name_info"]);
				}
			}
		}

		$res[$i]->RP_name = array();
		for ($j = 0; $j < count($res[$i]->asso_RP_index); $j++) {
			$RP_index = intval($res[$i]->asso_RP_index[$j]);
			$query_RP = "select RP_NAME from RP_INFO where RP_index = $RP_index";
			$result_RP = mysqli_query($con, $query_RP);
			if (mysqli_num_rows($result_RP) > 0) {
				while ($row_RP = mysqli_fetch_assoc($result_RP)) {
					array_push($res[$i]->RP_name, $row_fault["RP_NAME"]);
				}
			}
		}
	}
}
echo " sizeof res:" . sizeof($res) . "\n";
for ($i = 0; $i < count($res); $i++) {
	echo " i:" . $i;
	$haha = $res[$i]->failure_name_info;
	echo " failure_name_info:" . $haha;
	for ($j = 0; $j < count($res[$i]->FDE); $j++) {
		echo "    j:" . $j;
		$FDEIndex = intval($res[$i]->FDE[$j]);
		echo " FDEIndex:" . $FDEIndex . "\n";

	}
}

$resFDE = array();
for ($i = 0; $i < count($res); $i++) {
	$res[$i]->FDEText = array();
	for ($j = 0; $j < count($res[$i]->FDE); $j++) {
		$FDEIndex = intval($res[$i]->FDE[$j]);
		if ($FDEIndex > 0) {
			$FDEFlag = 0;
			for ($k = 0; $k < count($resFDE); $k++) {
				if (($resFDE[$k]->FDECode == $FDEIndex) && (strcmp($resFDE[$k]->fde_time, $res[$i]->failure_time) == 0)) {
					array_push($resFDE[$k]->failure_name_info, $res[$i]->failure_name_info);
					array_push($resFDE[$k]->FIMCode_info, $res[$i]->FIMCode_info);
					array_push($resFDE[$k]->failure_state, $res[$i]->failure_state);
					array_push($resFDE[$k]->flight_phase, $res[$i]->flight_phase);
					array_push($resFDE[$k]->id, $res[$i]->id);
					$FDEFlag = 1;
					break;
				}
			}
			if ($FDEFlag == 0) {
				$itemFDE = new ReturnFDEJson();
				$itemFDE->failure_name_info = array();
				$itemFDE->FIMCode_info = array();
				$itemFDE->failure_state = array();
				$itemFDE->id = array();
				$itemFDE->flight_phase = array();
				// 插入数据
				$itemFDE->FDECode = $FDEIndex;
				$itemFDE->flight_leg = $res[$i]->flight_leg;
				$itemFDE->fde_time = $res[$i]->failure_time;

				$itemFDE->failure_name_info[0] = $res[$i]->failure_name_info;
				$itemFDE->FIMCode_info[0] = $res[$i]->FIMCode_info;
				$itemFDE->failure_state[0] = $res[$i]->failure_state;
				$itemFDE->id[0] = $res[$i]->id;
				$itemFDE->flight_phase[0] = $res[$i]->flight_phase;
				array_push($resFDE, $itemFDE);
			}
		}
	}
}

for ($i = 0; $i < count($resFDE); $i++) {
	// 拿着fde_idx的值查表fde_info
	$index = intval($resFDE[$i]->FDECode) + 1;
	$query = "select fde_state,fde_text,fde_level from fde_info where idx = $index";
	$result = mysqli_query($con, $query);
	if (mysqli_num_rows($result) > 0) {
		while ($row = mysqli_fetch_assoc($result)) {
			// 插入数据
			$resFDE[$i]->FDEStatus = $row["fde_state"];
			$resFDE[$i]->FDEText = $row["fde_text"];
			$resFDE[$i]->FDEClass = $row["fde_level"];
		}
	}
}

echo json_encode($resFDE);

// 结束查询
mysqli_close($con);
?>
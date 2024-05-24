<?php
//echo phpinfo();
class ReturnJson
{
	public $ata = "";
	public $memberSystemName = "";
	public $memberSystemId = "";
	public $startTime = "";
	public $status = "";
	public $elapsedTime = "";
	public $processPercent = "";
	public $details = "";
}

require_once('connectConfig.php');
if (!$con) {
	die('Could not connect:' . mysqli_connect_error());
}
// 查表failure_log
$query = "select * from nvm_retrieval_status";
$result = mysqli_query($con, $query);
$res = array();
//查询结果的数量
if (mysqli_num_rows($result) > 0) {
	// 获取查询结果的一行
	while ($row = mysqli_fetch_assoc($result)) {
		$item = new ReturnJson();

		$item->ata = $row['ATA'];
		$item->memberSystemName = $row['memberSystemName'];
		$item->memberSystemId = $row['memberSystemId'];
		$item->startTime = $row['startTime'];
		$item->status = $row['status'];
		$item->elapsedTime = $row['elapsedTime'];
		$item->processPercent = $row['processPercent'];
		$item->details = $row['details'];

		array_push($res, $item);
	}
}
echo json_encode($res);

// 结束查询
mysqli_close($con);
?>
<?php
//echo phpinfo();
class ReturnJson
{
	public $equipmentId = 0;
	public $ata = 0;
	public $hours = "";
	public $status = "";
	public $cycles = "";
	public $isAvailable = 0;
}

// 在306的Centos系统里的mysql密码为123456
$con = mysqli_connect("localhost", "root", "root", "OMHMS");

if (!$con) {
	die('Could not connect:' . mysqli_connect_error());
}
// 查表failure_log
$query = "select * from time_cycles_status";
$result = mysqli_query($con, $query);
$res = array();
//查询结果的数量
if (mysqli_num_rows($result) > 0) {
	// 获取查询结果的一行
	while ($row = mysqli_fetch_assoc($result)) {
		$item = new ReturnJson();

		$item->equipmentId = $row['equipmentId'];
		$item->ata = $row['ata'];
		$item->hours = $row['hours'];
		$item->status = $row['status'];
		$item->cycles = $row['cycles'];
		$item->isAvailable = $row['isAvailable'];
		array_push($res, $item);
	}
}
echo json_encode($res);

// 结束查询
mysqli_close($con);
?>
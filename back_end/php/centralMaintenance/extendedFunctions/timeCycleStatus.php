<?php
//echo phpinfo();
class ReturnJson
{
	public $id = 0;
	public $ata = "";
	public $equipmentName = 0;
	public $status = "";
	public $hours = "";
	public $cycles = "";
}

// 在306的Centos系统里的mysql密码为123456
$con = mysqli_connect("127.0.0.1", "root", "root", "OMHMS","8889");
if (!$con) {
	die('Could not connect:' . mysqli_connect_error());
}
// 查表failure_log
$query = "select * from Time_cycles_status";
$result = mysqli_query($con, $query);
$res = array();
//查询结果的数量
if (mysqli_num_rows($result) > 0) {
	// 获取查询结果的一行
	while ($row = mysqli_fetch_assoc($result)) {
		$item = new ReturnJson();
		$item->id = $row['id'];
		$item->ata = $row['ata'];
		$item->equipmentName = $row['equipmentName'];
		$item->status = $row['status'];
		$item->hours = $row['hours'];
		$item->cycles = $row['cycles'];
		array_push($res, $item);
	}
}
echo json_encode($res);

// 结束查询
mysqli_close($con);
?>
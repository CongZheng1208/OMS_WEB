<?php
//echo phpinfo();
class ReturnJson
{
	public $memberSystemId = "";
	public $ATA = "";
	public $MemberSystemName = "";
	public $support = "";
	public $status = "";
	public $avail = "";
	public $hours = "";
	public $cycles = "";

}

// 在306的Centos系统里的mysql密码为123456
$con = mysqli_connect("localhost", "root", "root", "OMHMS");
//$con = mysqli_connect("192.168.1.10", "root", "123456", "OMHMS");

if (!$con) {
	die('Could not connect:' . mysqli_connect_error());
}
// 查表failure_log
$query = "select * from timeCycle";
$result = mysqli_query($con, $query);
$res = array();
//查询结果的数量
if (mysqli_num_rows($result) > 0) {
	// 获取查询结果的一行
	while ($row = mysqli_fetch_assoc($result)) {
		$item = new ReturnJson();

		$item->memberSystemId = $row['memberSystemId'];
		$item->ATA = $row['ATA'];
		$item->MemberSystemName = $row['MemberSystemName'];
		$item->support = $row['support'];
		$item->status = $row['status'];
		$item->avail = $row['avail'];
		$item->hours = $row['hours'];
		$item->cycles = $row['cycles'];
	
		array_push($res, $item);
	}
}
echo json_encode($res);

// 结束查询
mysqli_close($con);
?>
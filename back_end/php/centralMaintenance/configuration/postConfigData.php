<?php
//echo phpinfo();
class ReturnJson
{
	public $ata = "";
	public $equipmentName = "";
	public $hardwareInformation = "";
	public $softwareInformation = "";
	public $additionalInformation = "";

}

// 在306的Centos系统里的mysql密码为123456
$con = mysqli_connect("localhost", "root", "Comac.000", "OMHMS");
//$con = mysqli_connect("192.168.1.10", "root", "123456", "OMHMS");

$ATA = $_POST['ATA'];
$equipmentName = $_POST['equipmentName'];

if (!$con) {
	die('Could not connect:' . mysqli_connect_error());
}
// 查表failure_log
$query = "select * from ConfigurationData WHERE equipmentName = '$equipmentName'";
$result = mysqli_query($con, $query);



$row = mysqli_fetch_assoc($result);

$item = new ReturnJson();

$item->ata = $row['ata'];
$item->equipmentName = $row['equipmentName'];
$item->hardwareInformation = $row['hardwareInformation'];
$item->softwareInformation = $row['softwareInformation'];
$item->additionalInformation = $row['additionalInformation'];

echo json_encode($item);



// $res = array();
// //查询结果的数量
// if (mysqli_num_rows($result) > 0) {
// 	// 获取查询结果的一行
// 	while ($row = mysqli_fetch_assoc($result)) {
// 		$item = new ReturnJson();

// 		$item->ata = $row['ata'];
// 		$item->equipmentName = $row['equipmentName'];
// 		$item->hardwareInformation = $row['hardwareInformation'];
// 		$item->softwareInformation = $row['softwareInformation'];
// 		$item->additionalInformation = $row['additionalInformation'];
	
// 		array_push($res, $item);
// 	}
// }
// echo json_encode($res);

// 结束查询
mysqli_close($con);
?>

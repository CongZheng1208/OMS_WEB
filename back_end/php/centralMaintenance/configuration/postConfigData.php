<?php
   require_once('connectConfig.php');
class ReturnJson
{
	public $ata = "";
	public $equipmentName = "";
	public $hardwareInformation = "";
	public $softwareInformation = "";
	public $additionalInformation = "";
	public $isStarShowed = "";

}

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

$item->ata = $row['ATA'];
$item->equipmentName = $row['equipmentName'];
$item->hardwareInformation = $row['hardwareInformation'];
$item->softwareInformation = $row['softwareInformation'];
$item->additionalInformation = $row['additionalInformation'];
$item->isStarShowed = $row['isStarShowed'];

echo json_encode($item);

// 结束查询
mysqli_close($con);
?>
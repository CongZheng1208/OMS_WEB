<?php

require_once ('connectConfig.php');
//$con = mysqli_connect("localhost", "root", "Comac.000", "OMHMS");
//$connection = mysqli_connect("localhost", "root", "root", "OMHMS");

if (!$con) {
	die("Connection failed: " . mysqli_connect_error());
}

// 获取POST请求中的ID
$fimCode = $_POST['fimCode'];

// 查询数据库中符合ID条件的数据
$query = "SELECT * FROM fimCode_OMD WHERE code = '$fimCode'";

$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
	// 将查询结果转换为关联数组
	$row = mysqli_fetch_assoc($result);

	// 打包为JSON格式
	$json_response = json_encode($row);

	// 输出JSON格式数据
	header('Content-Type: application/json');
	echo $json_response;
} else {
	// 数据未找到，返回错误信息
	echo json_encode(array("error" => "ID not found"));
}

// 关闭数据库连接
mysqli_close($con);
?>


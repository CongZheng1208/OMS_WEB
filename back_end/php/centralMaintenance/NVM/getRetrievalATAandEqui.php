<?php
	require_once('connectConfig.php');

	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}

	// 查询数据库获取数据
	$sql = "SELECT * FROM nvm_retrieval_status";
	$result = $con->query($sql);

	// 创建一个数组来存储ATA、MemberSystem和Test的关系
	$data = array();

	// 遍历查询结果
    while($row = mysqli_fetch_assoc($result)) {
        $ATA = $row["ATA"];

        $item = new stdClass();

        $item->memberSystemId = $row['memberSystemId'];
        $item->memberSystemName = $row['memberSystemName'];
        $item->avai = $row['avai'];
 
        // 检查是否已有这个ATA的数组
        if (!isset($data[$ATA])) {
        $data[$ATA] = array();
        }
        // 将数据添加到数组中
        array_push($data[$ATA], $item);
    }
    // 输出JSON数据
    echo json_encode($data);
	mysqli_close($con);
?>
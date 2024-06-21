<?php

    require_once('connectConfig.php');

	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}

	// 查询数据库获取数据
    $sql = "select * from BusRecordKeys";
	$result = $con->query($sql);

	// 创建一个数组来存储ATA、MemberSystem和Test的关系
	$data = array();

	// 遍历查询结果
    while($row = mysqli_fetch_assoc($result)) {
        $ata = $row["ATA"];

        $item = new stdClass();

		$item->id = $row["id"];
        $item->ata = $row["ATA"];
        $item->unit = $row['Unit'];
		$item->recordRate = $row['RecordRate'];
		$item->key = $row['key_value'];
    
        // 检查是否已有这个ATA的数组
        if (!isset($data[$ata])) {
            $data[$ata] = array();
        }
        // 将数据添加到数组中
        array_push($data[$ata], $item);
	
    }
    // 输出JSON数据
    echo json_encode($data);

	mysqli_close($con);
?>
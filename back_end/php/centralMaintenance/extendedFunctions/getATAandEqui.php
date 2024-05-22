<?php
	// $con = mysqli_connect("192.168.1.10", "root", "123456", "OMHMS");
	//$con = mysqli_connect("localhost", "root", "root", "OMHMS");
    $con = mysqli_connect("192.168.1.10", "root", "123456", "OMHMS");
	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}

	// 查询数据库获取数据
	$sql = "SELECT * FROM timeCycle";
	$result = $con->query($sql);

	// 创建一个数组来存储ATA、MemberSystem和Test的关系
	$data = array();

	// 遍历查询结果
    while($row = mysqli_fetch_assoc($result)) {
        $ATA = $row["ATA"];

        $item = new stdClass();
        $item->memberSystemId = $row['memberSystemId'];
        $item->ATA = $row['ATA'];
        $item->MemberSystemName = $row['MemberSystemName'];
        $item->support = $row['support'];
        $item->status = $row['status'];
        $item->avail = $row['avail'];
        $item->hours = $row['hours'];
        $item->cycles = $row['cycles'];
    
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
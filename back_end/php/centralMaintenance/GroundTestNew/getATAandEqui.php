<?php
    //echo phpinfo();
	class ReturnJson{
		public $id =0;
		public $ata=0;
		// public $e_id="";
		// public $e_na="";
		// public $TEST_IN="";
		public $equipments="";
		public $avai="";
	}

	// 在306的Centos系统里的mysql密码为123456
	// $con=mysqli_connect("192.168.1.145", "root", "123456", "OMHMS");	

	$con = mysqli_connect("localhost", "root", "root", "OMHMS");
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select * from gt_ata_equi_table";
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item = new ReturnJson(); 
			$item->id = $row['id'];
			$item->ata = $row['ATA']; 

			$item->equipments = json_decode($row['equipment']);

			$jsonObjA = json_decode($row['equipment_avai'], false);
			$item->avai = $jsonObjA->{'avai'};

			
			// $jsonObj = json_decode($row['equipment'], false);

			// $item->e_id  = $jsonObj->{'e_id'};
			// $item->e_na  = $jsonObj->{'e_na'};
			// $item->TEST_IN  = $jsonObj->{'TEST_IN'};
			
			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
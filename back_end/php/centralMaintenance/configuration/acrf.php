<?php
    //echo phpinfo();
	class ReturnJson{
		public $ata=0;
		public $equ_name="";
		public $hard_ware="";
		public $specific="";
		public $software="";
	}

	class ReHardware{
		public $PN;
		public $PD;
		public $SN;
		public $MS;
	}

	// 在306的Centos系统里的mysql密码为
	$con=mysqli_connect("localhost", "root", "root", "OMHMS");
	//$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");		
	if (!$con){
		die('Could not connect:' . mysqli_connect_error());
	}
	// 查表failure_log
	$query="select * from acrf";
	$result = mysqli_query($con, $query);
	$res = array();
	//查询结果的数量
	if (mysqli_num_rows($result) > 0){
		// 获取查询结果的一行
		while($row = mysqli_fetch_assoc($result)){
			$item = new ReturnJson(); 
			$item->ata = $row['ATA']; 
			$item->equ_name = $row['eq_name_idx'];
			$jsonObj = json_decode($row['acrfInfo'], false);
			
			/*$item->hard_ware = array();
			foreach($jsonObj->hardware as $hardware){
				$a_h = new ReHardware();
				$a_h->PN = $hardware->PN;
				$a_h->PD = $hardware->PD;
				$a_h->SN = $hardware->SN;
				$a_h->MS = $hardware->MS;
				array_push($item->hard_ware, $a_h);
			}*/
            $item->hard_ware = $jsonObj->{'hardware'};
			$item->specific = $jsonObj->{'special'};
			$item->software = $jsonObj->{'software'};
			array_push($res, $item);
		}
	}
	echo json_encode($res);
	
	// 结束查询
	mysqli_close($con);
?>
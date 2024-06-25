<?php
    require_once('connectConfig.php');
    class ReturnSaveList{
        public $listName="";
        public $time="";
        public $paras="";
    }

    class paras{
        public $paraName="";
        public $index=0;
    }

    if (!$con){
        die('Could not connect:' . mysqli_connect_error());
    }

    $id = $_REQUEST['id'];
    if (empty($id)) {
        // 执行新建逻辑
        $data = new ReturnSaveList(); 
        $data->listName = $_REQUEST['ListName'];
        date_default_timezone_set("PRC");
        $data->time=date("Y-m-d H:i:s");
        
        $para=$_REQUEST['paras'];
        $data->paras = array();
        for($i=0; $i<count($para); $i++) {
            $data->paras[$i] = new paras();
            $data->paras[$i]->index = $para[$i]['id'];
            $data->paras[$i]->paraName = $para[$i]['para'];
        }
        $json_string = json_encode($data);
        
        $sql="INSERT INTO paraList (id, paraList) VALUES (null,'$json_string')";
        
        if (!mysqli_query($con, $sql)){
            echo "Error:" . $sql . "<br>" . mysqli_error($con);
        }
    } else {
		// 执行覆盖逻辑
		$sql = "SELECT * FROM paraList WHERE id = $id";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) > 0) {
			$data = new ReturnSaveList(); 
			$data->listName = $_REQUEST['ListName'];
			date_default_timezone_set("PRC");
			$data->time=date("Y-m-d H:i:s");
			
			$para=$_REQUEST['paras'];
			$data->paras = array();
			for($i=0; $i<count($para); $i++) {
				$data->paras[$i] = new paras();
				$data->paras[$i]->index = $para[$i]['id'];
				$data->paras[$i]->paraName = $para[$i]['para'];
			}
			$json_string = json_encode($data);
			
			$sql="UPDATE paraList SET paraList='$json_string' WHERE id=$id";
			
			if (!mysqli_query($con, $sql)){
				echo "Error:" . $sql . "<br>" . mysqli_error($con);
			}
		} else {
			echo "Record with id=$id not found";
		}
    }

    mysqli_close($con);
?>
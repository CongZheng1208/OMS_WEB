<?php
    global $con;

    // 本地调试
    $con = mysqli_connect("localhost", "root", "root", "OMHMS");

    // 服务器的数据库地址
    //$con = mysqli_connect("localhost", "root", "Comac.000", "omhms");

    // 触屏电脑的数据库地址
    //$con = mysqli_connect("localhost", "root", "2185", "OMHMS");

    // 远程连接服务器数据库的地址
    //$con=mysqli_connect("192.168.1.145", "user", "Comac.123", "OMHMS");
	//$con=mysqli_connect("192.168.1.147", "root", "2185", "OMHMS");
?>
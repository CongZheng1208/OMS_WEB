<?php
// $message = json_encode($_POST);
// // 创建TCP Socket
// $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

// // 设定要连接的目标服务器和端口
// $target_address = '192.168.1.10';
// $target_port = 5001;

// // 连接到目标服务器
// if (!socket_connect($socket, $target_address, $target_port)) {
//     // 获取连接错误信息
//     $error_message = socket_strerror(socket_last_error());
//     // 返回失败信息报文
//     $response = json_encode(['status' => 'fail', 'message' => $error_message]);
//     echo $response;
//     exit;
// }else{
//     // 返回成功信息报文
//     $response = json_encode(['status' => 'success', 'message' => 'Successfully connected']);
//     echo $response;

//     socket_write($socket, $message, strlen($message));
// }
?>

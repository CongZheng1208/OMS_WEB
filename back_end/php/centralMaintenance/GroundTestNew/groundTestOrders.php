<?php

    include 'connect.php';

    // 从POST请求中获取消息
    $message = json_encode($_POST);

    // 发送消息到目标服务器
    socket_write($socket, $message, strlen($message));

    // 关闭连接
    socket_close($socket);

?>
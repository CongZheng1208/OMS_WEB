<?php
    function websocketDecode($received){
        //该函数用于实现从socket端中读取到的来自websocket端的数据的解码
        if(!is_string($received)){
            // echo "Data type is wrong! Data type now is: ";
            // echo gettype($received);
            // echo "\n";
            return;
        }

        if(strlen($received)<= 0 ){
            echo "Data is too short!\n";
            return;
        }
        $len = $masks = $data = $decoded_data = null;
        $buffer = $received;
        $len = ord($buffer[1]) & 127;
        if ($len === 126) {
            $masks = substr($buffer, 4, 4);
            $data  = substr($buffer, 8);
        } else {
            if ($len === 127) {
                $masks = substr($buffer, 10, 4);
                $data  = substr($buffer, 14);
            } else {
                $masks = substr($buffer, 2, 4);
                $data  = substr($buffer, 6);
            }
        }
        for ($index = 0; $index < strlen($data); $index++) {
            $decoded_data .= $data[$index] ^ $masks[$index % 4];
        }
        return $decoded_data;
    }

    function websocketEncode($msg){
        //该函数用于实现从socket端中, 对即将发向websocket端的数据的编码。 排序规则为：大端字节序（网络字节序）
        if (!is_scalar($msg)) {
            print_r("只允许发送标量数据");
        }
        $len = strlen($msg);
        $first_byte = chr(129);
        
        if ($len <= 125) {
            $second_byte = chr($len);
        } else if ($len <= 65535) {
            $second_byte = chr(126) . pack('n' , $len);
        } else {
            $second_byte = chr(127) . pack('J' , $len);
        }
        $encoded_data = $first_byte . $second_byte . $msg;  
        return $encoded_data;
    }

    function socketCreate($address, $port){
        //该函数用于实现对指定地址和端口的监听socket的创建
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_bind($socket, $address, $port);
        socket_listen($socket,4);
        $socket_acc = socket_accept($socket);

        return $socket_acc;
    }

    function headersCreate($request){
        //该函数用于生成websocket报文的头部
        preg_match('#Sec-WebSocket-Key: (.*)\r\n#', $request, $matches);
        $key = base64_encode(pack(
            'H*',
            sha1($matches[1] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
        ));
        $headers = "HTTP/1.1 101 Switching Protocols\r\n";
        $headers .= "Upgrade: websocket\r\n";
        $headers .= "Connection: Upgrade\r\n";
        $headers .= "Sec-WebSocket-Version: 13\r\n";
        $headers .= "Sec-WebSocket-Accept: $key\r\n\r\n";

        return $headers;
    }
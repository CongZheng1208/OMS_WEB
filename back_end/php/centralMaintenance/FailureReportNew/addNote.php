<?php
require_once('connectConfig.php');

if (!$con){
    die('Could not connect:' . mysqli_connect_error());
}

$failureNameInfo = $_POST['failureNameInfo'];
$failureNoteDate = $_POST['failureNote']['noteDate'];
$failureNoteText = $_POST['failureNote']['noteText'];

// 查询数据库中符合条件的数据
$query = "SELECT * FROM FailureNoteData WHERE failureNameInfo = '$failureNameInfo' LIMIT 1";
$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $failureNoteArray = json_decode($row['failureNote'], true);

    $newNote = array(
        "noteDate" => $failureNoteDate,
        "noteText" => $failureNoteText
    );

    $failureNoteArray[] = $newNote;
    $failureNoteJson = json_encode($failureNoteArray);

    $updateQuery = "UPDATE FailureNoteData SET failureNote = '$failureNoteJson' WHERE failureNameInfo = '$failureNameInfo'";
    
    if (mysqli_query($con, $updateQuery)) {
        $response['status'] = 'success';
        $response['message'] = 'Record updated successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error updating record: ' . mysqli_error($con);
    }
} else {
    $newNote = array(
        array(
            "noteDate" => $failureNoteDate,
            "noteText" => $failureNoteText
        )
    );
    $failureNoteJson = json_encode($newNote);
    
    $insertQuery = "INSERT INTO FailureNoteData (failureNameInfo, failureNote) VALUES ('$failureNameInfo', '$failureNoteJson')";
    if (mysqli_query($con, $insertQuery)) {
        $response['status'] = 'success';
        $response['message'] = 'New record inserted successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error inserting new record: ' . mysqli_error($con);
    }
}

echo json_encode($response); //将响应数组转换成JSON格式并输出

mysqli_close($con);
?>

<?php

// @TODO parse int values
$samplerate = isset($_POST['samplerate']) ? intval($_POST['samplerate']) : 44100;
$bitrate = isset($_POST['bitrate']) ? intval($_POST['bitrate']) : 256;
$container =  isset($_POST['container']) ? $_POST['container'] : 'ogg';

var_dump($_POST);
var_dump($_FILES);

if (isset($_FILES) && count($_FILES) > 0) {
    echo 'yope';
    for($i = 0; $i < count($_FILES); $i++) {
        $fileName = $_FILES[$i]['name'];
        echo 'yayay ' .$fileName;
        move_uploaded_file($_FILES[$i]['tmp_name'], "uploaded/" . $fileName);

        $path_parts = pathinfo($fileName);
        // audio file name = video file name without extension
        $audioFileName =  $path_parts['filename'];

        echo 'yayay audio ' .$audioFileName;

        $cmd = 'ffmpeg -i "uploaded/' .$fileName. '" "encoded/' . $audioFileName . '.' . $container.'"';
        echo 'cmd ' .$cmd;

        exec($cmd);
    }
    exit;
}

/*
if (isset($_FILES['myFile'])) {
    // Example:
    move_uploaded_file($_FILES['myFile']['tmp_name'], "" . $_FILES['myFile']['name']);
    exit;
}
*/
die;



?>

<?php

$samplerate = isset($_POST['samplerate']) ? intval($_POST['samplerate']) : 44100;
$bitrate = isset($_POST['bitrate']) ? intval($_POST['bitrate']) : 256;
$container =  isset($_POST['container']) ? $_POST['container'] : 'ogg';

// var_dump($_POST);
// var_dump($_FILES);

if (isset($_FILES) && count($_FILES) > 0) {

    for($i = 0; $i < count($_FILES); $i++) {
        move_uploaded_file($_FILES[$i]['tmp_name'], "uploaded/" . $_FILES[$i]['name']);
    }
    // exit;

    // read all files in uploaded dir (do not keep hodden files (.gitkeep for example))
    $files = preg_grep('/^([^.])/', scandir('uploaded'));

    //print_r($files);

    foreach($files as $file){
        $path_parts = pathinfo($file);
        // audio file name = video file name without original extension but with given container ext
        $encodedFileName =  $path_parts['filename'] . '.' . $container;
        $cmd = 'ffmpeg -i "uploaded/' .$file. '" -ar ' . $samplerate . ' -ab '.$bitrate.'k "encoded/' . $encodedFileName . '"';
        exec($cmd);
    }

    // remove all uploaded files


    // zip encoded folder


    // read zip content as a response

    
}


die;



?>

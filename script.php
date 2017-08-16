<?php

$samplerate = isset($_POST['samplerate']) ? intval($_POST['samplerate']) : 44100;
$bitrate = isset($_POST['bitrate']) ? intval($_POST['bitrate']) : 256;
$container =  isset($_POST['container']) ? $_POST['container'] : 'ogg';

if (isset($_FILES) && count($_FILES) > 0) {

    for($i = 0; $i < count($_FILES); $i++) {
        move_uploaded_file($_FILES[$i]['tmp_name'], "uploaded/" . $_FILES[$i]['name']);
    }
    // exit;

    // read all files in uploaded dir (do not keep hodden files (.gitkeep for example))
    $files = preg_grep('/^([^.])/', scandir('uploaded'));

    foreach($files as $file){
        $path_parts = pathinfo($file);
        // audio file name = video file name without original extension but with given container ext
        $encodedFileName =  $path_parts['filename'] . '.' . $container;

        $cmd = 'ffmpeg -i "uploaded/' .$file. '" -ar ' . $samplerate ;
        // set bitrate only if ogg / mp3 encoding target
        if($container === 'mp3' || $container === 'ogg') {
            $cmd .= ' -ab '.$bitrate.'k' ;
        }

        // if wav container
        if($container === 'wav') {
            // use specific 16 bits codec
            $cmd .= ' -acodec pcm_s16le';
        }

        $cmd .= ' "encoded/' . $encodedFileName . '"';
        exec($cmd);

        // remove original file
        unlink('uploaded/' . $file);
    }

    // zip encoded folder
    $zipFile = './encoded_audio.zip';
    $zip = new ZipArchive();
    if($zip->open($zipFile, ZipArchive::CREATE) !== TRUE) {
        exit('impossible d\'ouvrir l\'archive');
    }

    $encodedFiles = preg_grep('/^([^.])/', scandir('encoded'));
    foreach($encodedFiles as $file){
        $zip->addFile('encoded/' . $file);
    }

    $zipSuccessFull = $zip->close();

    // remove encoded files
    foreach($encodedFiles as $file){
        unlink('encoded/' . $file);
    }

    // read zip content as a response    
    if (file_exists($zipFile)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($zipFile).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($zipFile));
        readfile($zipFile);
    } else {
        die("Error: Zip file not found.");
    }

    unlink($zipFile);

    
}


die;



?>

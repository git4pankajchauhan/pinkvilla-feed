<?php
$page =  $_GET['page'] ?? 1;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$str = file_get_contents("http://www.pinkvilla.com/photo-gallery-feed-page/page/$page");
$json = json_decode($str, true);
echo json_encode($json, JSON_PRETTY_PRINT);

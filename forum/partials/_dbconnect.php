<?php

$server = "localhost";
$username = "root";
$password = "";
$database = "idiscuss";

$conn = mysqli_connect($server, $username, $password, $database);

if(!$conn){
    die("Unable to connect: ". mysqli_connect_error());
}

?>
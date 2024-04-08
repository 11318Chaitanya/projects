<?php

session_start();

session_unset();
session_destroy();

header("location: /project/forum/index.php");

?>
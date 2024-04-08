<?php

$subSucess=false;

if($_SERVER['REQUEST_METHOD'] == "POST"){

    include "_dbconnect.php";

    $useremail = $_POST['useremail'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];

    $sql = "SELECT * FROM `users` WHERE `user_email`='$useremail'";
    $result = mysqli_query($conn, $sql);

    $num = mysqli_num_rows($result);
    if($num>0){
        $userError = "Email already exists";
    }
    else{
        if($password == $cpassword){
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sqlm = "INSERT INTO `users` (`user_email`, `user_password`, `tstamp`) VALUES ('$useremail', '$hash', current_timestamp())";
            $resultm = mysqli_query($conn, $sqlm);

            if($resultm){
                $subSucess = true; 
                header('location: /project/forum/index.php?subSuccess=true');
                exit();
            }
        }
        else{
            $userError = "Password do not match";
        }
    }
    header("location: /project/forum/index.php?subSuccess=false&error=$userError");
}



?>
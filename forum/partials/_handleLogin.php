<?php


if($_SERVER['REQUEST_METHOD']=='POST'){

    include '_dbconnect.php';

    $email = $_POST['loginemail'];
    $password =$_POST['loginpassword'];

    $sql = "SELECT * FROM `users` WHERE `user_email`='$email'";
    $result = mysqli_query($conn, $sql);

    $num = mysqli_num_rows($result);

    if($num == 1){
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password, $row['user_password'])){
            session_start();
            $_SESSION['loggedin'] = true;
            $_SESSION['userEmail'] = $email;
            $_SESSION["sno"] = $row['sno'];

            header('location: /project/forum/index.php');
            exit();
        }
        else{
            $userError = "Incorrect password";
        }
    }
    else{
        $userError = "USer do not exist";
    }
    header("location: /project/forum/index.php?logSuccess=false&error=$userError");
}

?>
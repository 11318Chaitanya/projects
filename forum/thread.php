<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>iDiscuss - Coding Forum</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body>
    <?php include 'partials/_dbconnect.php'?>
    <?php include 'partials/_header.php'?>
    <?php include 'partials/_login.php'?>
    <?php include 'partials/_signup.php'?>
    <?php 
    
    $id = $_GET['threadid'];

    $sql = "SELECT * FROM `threads` WHERE `thread_id`='$id'";
    $result = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($result)){
        $threadtitle = $row['thread_title'];
        $threaddesc = $row['thread_description'];
        $userid = $row['user_id'];

        $sql2 = "SELECT user_email FROM `users` WHERE `sno`='$userid'";
        $result2 = mysqli_query($conn, $sql2);
        $row2 = mysqli_fetch_assoc($result2);
        $user_email = $row2['user_email'];

    }
    
    ?>

    <?php
    $showAlert = false;
    if($_SERVER['REQUEST_METHOD']=='POST'){

        $content= $_POST['comment'];
        $usid = (int)$_SESSION['sno'];

        $content = str_replace("<", "&lt", $content);
        $content = str_replace(">", "&gt", $content);

        $sqlp = "INSERT INTO `comments` (`comment_content`, `thread_id`, `user_id`, `tstamp`) VALUES ('$content', '$id', '$usid', current_timestamp())";
        
        $resultp = mysqli_query($conn, $sqlp);

        $showAlert = true;
        if($showAlert){
            echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Your thread has been added successfully, wait for the community response.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>';
        }
    }
    
    ?>

    <div class="container">
        <div class="my-4">
            <div class="card bg-dark text-white">
                <div class="card-body">
                    <h1 class="card-title"><?php echo $threadtitle;?> forums</h1>
                    <p class="card-text lead"><?php echo $threaddesc;?></p>
                    <hr>
                    <p><b>Posted by: <?php echo $user_email;?></b></p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h2>Post comment</h2>
        <?php
        
        if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
            echo '<form action="'.$_SERVER['REQUEST_URI'].'" method="post">
            <div class="mb-3">
                <label for="comment" class="form-label">Post a comment</label>
                <textarea name="comment" id="comment" cols="30" rows="5" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
            </form>';
        }
        else{
            echo '<p class="lead">You are not logged in. Please login to post a comment.</p>';
        }
        
        ?>


    </div>

    <div class="container">
        <h1 class="py-2">Discussions</h1>
        <?php
            $sql = "SELECT * FROM `comments` WHERE `thread_id`='$id'";
            $result = mysqli_query($conn, $sql);
            $noresult = true;
            while($row = mysqli_fetch_assoc($result)){
                $noresult = false;
                $id = $row['comment_id'];
                $comcontent = $row['comment_content'];
                $user_id = $row['user_id'];

                
                $sql2 = "SELECT user_email FROM `users` WHERE `sno`='$user_id'";
                $result2 = mysqli_query($conn, $sql2);
                $row2 = mysqli_fetch_assoc($result2);
                $user_email = $row2['user_email'];

                echo '<div class="media d-flex mt-3">
                <img src="img/user_default_img.avif" alt="..." class="" height="100px">
                <div class="media-body">
                    <p class="my-0"><b>'.$user_email.'</b></p>
                    <p>'.$comcontent.'</p>
                </div>
            </div>';
            }
        ?>
    </div>

    <div class="container">
        <?php
            if($noresult){
                echo '<div class="my-4">
                <div class="card bg-dark text-white">
                    <div class="card-body">
                        <p class="display-4">No Threads Found</p>
                        <p class="lead">Be the first person comment</p>
                    </div>
                </div>
            </div>';
            }
        ?>
    </div>


    <?php include 'partials/_footer.php'?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
        integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous">
    </script>
</body>

</html>
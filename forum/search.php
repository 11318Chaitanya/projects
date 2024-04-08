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

    

    <div class="container my-3">
        <h1>Search result for "<?php echo $_GET['search'];?>"</h1>
        <?php
        $query = $_GET['search'];
        $noresult = true;

        // run this on sql before anything ALTER TABLE threads ADD FULLTEXT (thread_title, thread_description);

        $sql = "SELECT * FROM `threads` WHERE MATCH (`thread_title`, `thread_description`) against ('$query')";
        $result = mysqli_query($conn, $sql);

        while($row = mysqli_fetch_assoc($result)){
            $noresult = false;
            $threadtitle = $row['thread_title'];
            $threaddesc = $row['thread_description'];
            $url = "thread.php?threadid=".$row['thread_id'];

            echo '
            <div class="result">
                <h3><a href="'.$url.'" class="text-dark">'.$threadtitle.'</a></h3>
                <p>'.$threaddesc.'</p>
            </div>';
        }
        ?>
    </div>

    <?php
    
    if($noresult){
        echo '<div class="container">
        <div class="my-4">
            <div class="card bg-dark text-white">
                <div class="card-body">
                    <h1 class="card-title">No results found</h1>
                    <p class="card-text lead">Suggestions</p>
                    <li>Make sure that all words are spelled correctly.</li>
                    <li>Try different keywords.</li>
                    <li>Try more general keywords.</li>
                    <li>Try fewer keywords.</li>
                </div>
            </div>
        </div>
    </div>';
    }

    ?>
    
    


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
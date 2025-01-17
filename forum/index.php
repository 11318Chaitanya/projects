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
    
    if(isset($_GET['subSuccess']) && $_GET['subSuccess']=="true"){
        echo '<div class="alert alert-success alert-dismissible fade show my-0" role="alert">
      <strong>Successful!</strong> Your account created sucessfully you can login now.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
    }
    else if(isset($_GET['subSuccess']) && $_GET['subSuccess']=="false"){
        echo '<div class="alert alert-danger alert-dismissible fade show my-0" role="alert">
      <strong>Error! </strong>' .$_GET['error']. '
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
    }
    // if(isset($_GET['logSuccess']) && $_GET['subSuccess']=="true"){
    //     echo '<div class="alert alert-success alert-dismissible fade show my-0" role="alert">
    //   <strong>Successful!</strong> Your account created sucessfully you can login now.
    //   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    //   </div>';
    // }
    if(isset($_GET['logSuccess']) && $_GET['logSuccess']=="false"){
        echo '<div class="alert alert-danger alert-dismissible fade show my-0" role="alert">
      <strong>Error! </strong>' .$_GET['error']. '
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
    }
    ?>

    <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="https://source.unsplash.com/2400x700/?code,computer" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="https://source.unsplash.com/2400x700/?programming,google" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="https://source.unsplash.com/2400x700/?software,microsoft" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>


    <div class="container my-2">
        <h1 class="text-center my-3">iDiscuss - Browse Categories</h1>
        <div class="row">
            <?php 
          
            $sql = "SELECT * FROM `categories`";
            $result = mysqli_query($conn, $sql);

            while($row = mysqli_fetch_assoc($result)){
                $id = $row['category_id'];
              $cat = $row['category_name'];
              $desc = $row['category_description'];
              
              echo '<div class="col-md-4 my-2">
              <div class="card" style="width: 18rem;">
                  <img src="https://source.unsplash.com/500x400/?'.$cat.',coding" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title"><a href="threadsList.php?catid='.$id.'">'.$cat.'</a></h5>
                      <p class="card-text">' . substr($desc, 0, 100) .'...</p>
                      <a href="threadsList.php?catid='.$id.'" class="btn btn-primary">View Threads</a>
                  </div>
              </div>
          </div>';
            }
          
          ?>
        </div>
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
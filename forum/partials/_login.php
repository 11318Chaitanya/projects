
<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="loginModalLabel">Login</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="/project/forum/partials/_handleLogin.php" method="post">
                    <div class="mb-3">
                        <label for="loginemail" class="form-label">Username</label>
                        <input type="email" class="form-control" id="loginemail" name="loginemail"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="loginpassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="loginpassword" name="loginpassword">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <!-- <p>Don't have a account? <a href="" onclick="event.preventDefault()" data-bs-dismiss="modal" >Signup</a></p> -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
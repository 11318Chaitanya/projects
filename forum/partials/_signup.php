
<!-- Modal -->
<div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="signupModalLabel">Signup</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="/project/forum/partials/_handleSignup.php" method="post">
                    <div class="mb-3">
                        <label for="useremail" class="form-label">User Email</label>
                        <input type="email" class="form-control" id="useremail" name="useremail"
                            aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" maxlength="23" class="form-control" id="password" name="password">
                    </div>
                    <div class="mb-3">
                        <label for="cpassword" class="form-label">Confirm Password</label>
                        <input type="password" maxlength="23" class="form-control" id="cpassword" name="cpassword">
                        <div id="emailHelp" class="form-text">Make sure to enter the same password</div>
                    </div>
                    <button type="submit" class="btn btn-primary">SignUP</button>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
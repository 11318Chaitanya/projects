const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();

const JWT_SECRET = 'jwssecret$keythisis';

// create a user using : POST "/api/auth". Dosen't require auth. NO LOGN REQUIRED
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if theres are errors, return bad request and the error
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({success,errors: error.array() });
    }

    try {
        // find if the user alreadys exists
      let user = await User.findOne({success, email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      
      const data = {
        user:{
            id:user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    //.then(user => res.json(user))
    //     .catch(err => {console.log(err);
    //     res.json({error:"Please enter a unique email address", message: err.message})});
  }
);

// Authenticating a user using : POST "/api/auth/login". NO LOGN REQUIRED
router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be blank").exists()
    ],
    async (req, res) => {
      let success = false;
      //if theres are errors, return bad request and the error
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ success, errors: error.array() });
      }
  
      const {email, password} = req.body;
      try {
          // find if the user alreadys exists
        let user = await User.findOne({email});
        if (!user) {
          return res.status(404).json({success, error: "Please login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(404).json({success, error: "Please login with correct credentials"});
        }
        
        const data = {
          user:{
              id:user.id
          }
        }
  
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});
  
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );


  // Get loggedin user details using : POST "/api/auth/getuser". LOGN REQUIRED
router.post("/getuser", fetchuser, async (req, res) => {
      try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    }
  );



module.exports = router;

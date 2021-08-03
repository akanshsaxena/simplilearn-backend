const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//Register new user
const PAYLOAD_STRING = "thisisapayloadstring"
router.post("/signup", async (req, res) => {
  //If email already exists
  const {
    name,
    email,
    password
  } = req.body;
  const ifEmailExist = await User.findOne({
    email
  });
  if (ifEmailExist) {
    return res.json({
      status: "failure",
      message: "Email already registered",
    });
  }

  //Saving the details to DB
  const user = new User({
    name,
    email,
    password
  });
  try {
    const savedUser = await user.save();
    console.log("Saved user details");
    if (savedUser) {
      res.json({
        status: "success",
        message: "Registered successfully",
        id: savedUser._id
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: "failure",
      message: "Something went wrong",
    });
  }
});

//Login
router.post("/login", async (req, res) => {
  //If email exists then get the user details
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    email: email,
  });
  if (!user)
    return res.send({
      status: "failure",
      message: "Invalid EmailID/Password"
    });
  //Check the password if email is present
  else {
    if (user.password === password) {
      const token = jwt.sign({
          _id: user._id,
          email: user.email,
          name: user.name,
        },
        PAYLOAD_STRING, {
          expiresIn: 60 * 15,
        }
      );
      return res.json({
        status: "success",
        message: token
      });
    } else {
      return res.send({
        status: "failure",
        message: "Invalid EmailID/Password",
      });
    }
  }
});

module.exports = router;
const bcrypt = require("bcryptjs");
const path = require('path');

const mongoose = require("mongoose");
const Users = require("../models/Users").Users;
// const moment = require("moment");

require("dotenv").config();

exports.register = async (req, res) => {

  try {
    let { username, address, email, password } = req.body;
    if (!email || !password || !username || !address )
      return res.status(200).json({ message: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(200)
        .json({ success:false, message: "The password needs to be at least 5 characters long." });

    const existingUser = await Users.findOne({ email: email });
    
    if (existingUser)
      return res
        .status(200)
        .json({ success:false, message: "An user with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      address,
      email,
      password: passwordHash,
      allow: true,
      role : "member"
    });

     await newUser.save();
     const user = await Users.findOne({ email: email });
    return res.status(200).json({
      success: true,
      message:"Registered successfully!",
      token:user._id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {

  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(200).json({ 
        success : false,
        message: "Please check your email and password." });

    const user = await Users.findOne({ email: email });
    if (!user)
      return res.status(200).json({
        success : false,
        message: "No account with this email has been registered.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(200).json({
        success : false,
        message: "Invalid password.",
      });

      if(!user.allow)
      return res.status(200).json({
        success : false,
        message: "You aren't allowed yet.",
      });

      // const accessToken = jwt.sign(
      //   { id: users._id },
      //   process.env.JWT_SECRET,
      //   { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
      // );

      return res.status(200).json({
        success:true,
        token:user._id,
        username: user.username,
        email : user.email

       });
  } catch (err) {
     res.status(500).json({message: err.message });
  }
};

exports.role = async (req, res) => {

  try {
    const { me } = req.body;

    const user = await Users.findOne({ _id: me });
    if (!user)
      return res.status(200).json({
        success : false,
        message: "You are not user in this site.",
      });

      if(user.role == "admin")
      return res.status(200).json({
        success : true,
        role : "admin"
      });

      return res.status(200).json({
        success : true,
        role : "member"
       });
  } catch (err) {
     res.status(500).json({message: err.message });
  }
};



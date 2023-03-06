
const path = require('path');

const mongoose = require("mongoose");
const { monitorEventLoopDelay } = require('perf_hooks');
const Users = require("../models/Users").Users;
const Rooms = require("../models/Rooms").Rooms;
// const moment = require("moment");

require("dotenv").config();

exports.newUserList = async (req, res) => {

  try {
    const users = await Users.find({ allow: false });
    const me = await Users.findOne({ _id: req.body.me });
    const AllUsers = await Users.find();
    const AllRooms = await Rooms.find();

    return res.status(200).json({
      newUsers: users,
      me: me,
      AllUsers: AllUsers.length,
      AllRooms: AllRooms.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.allowOne = async (req, res) => {

  try {

    await Users.findOneAndUpdate(
      { email: req.body.email },
      {
        allow: true
      },
      {
        new: true
      }
    );

    return res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOne = async (req, res) => {

  try {
    var roomCreator = await Users.findOne({ email: req.body.email });
    await Users.findOneAndDelete({ email: req.body.email });

    await Rooms.deleteMany({ creator: roomCreator._id });

    const users = await Users.find();

    return res.status(200).json({
      users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.userlist = async (req, res) => {

  try {
    const users = await Users.find();

    return res.status(200).json({
      users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.roomlist = async (req, res) => {

  try {
    const rooms = await Rooms.find().populate({ path: "creator", select: ["username", "email"] });

    return res.status(200).json({
      rooms
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteOneRoom = async (req, res) => {

  try {

    await Rooms.findOneAndDelete({ _id: req.body._id });
    const rooms = await Rooms.find().populate({ path: "creator", select: ["username", "email"] });

    return res.status(200).json({
      rooms
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.user_room = async (req, res) => {

  try {

    const AllUsers = await Users.find();
    const AllRooms = await Rooms.find({ "creator": req.body.me });

    return res.status(200).json({
      AllUsers: AllUsers.length,
      AllRooms: AllRooms.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.roomlist_user = async (req, res) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  try {
    const rooms = await Rooms.find({ creator: req.body.me });
    var temp = new Array;
    var temptime = new Array;
    rooms.map((room,index) => {
      temp[index] = months[room.createdAt.getMonth()-1] + " " +  days[room.createdAt.getDay()] + " " + room.createdAt.getHours() + ":" + room.createdAt.getMinutes();
      temptime[index] = room.createdAt.getHours() + ":" + room.createdAt.getMinutes();
    })

    return res.status(200).json({
      rooms : rooms,
      fulltime : temp,
      time : temptime
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

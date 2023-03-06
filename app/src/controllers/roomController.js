
const mongoose = require("mongoose");
const Users = require("../models/Users").Users;
const Rooms = require("../models/Rooms").Rooms;

require("dotenv").config();

exports.create = async (req, res) => {

  try {

    const creator = await Users.findOne({ _id: req.body.me });

    const newRoom = new Rooms({
      creator: creator.email,
      creatorName: creator.username,
      title: req.body.title,
      description: req.body.description,
      attendee: req.body.attendee
    });

    await newRoom.save();
    console.log("sadfsadf", newRoom._id)

    return res.status(200).json({
      success: true,
      roomId: newRoom._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMeetInfo = async (req, res) => {

  try {
    const rooms = await Rooms.findOne({_id : req.body.roomId});
    console.log(rooms)

    return res.status(200).json({
      title : rooms.title,
      description : rooms.description,
      organizer : rooms.creator,
      link : req.body.roomId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}




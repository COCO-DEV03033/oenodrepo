const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const Users = require("./Users").Users;

const roomSchema = new Schema({
  creator: {
    type: String,
    required: true,
    ref: "Users"
  },
  creatorName: {
    type: String,
    required: true,
    ref: "Users"
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: false,
  },
  attendee: {
    type: Array,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  users: [
    {
      userid: { type: String },
    }
  ]
});

exports.Rooms = mongoose.model("Rooms", roomSchema);

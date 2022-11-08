// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({})
        .populate({
          path: "thoughts",
          populate: {
            path: "reactions",
            model: "reaction",
          },
        })
        .populate("friends");
      if (!users) {
        return res.status(404).json({ message: "No matching user in db." });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId })
        .populate({
          path: "thoughts",
          populate: {
            path: "reactions",
            model: "reaction",
          },
        })
        .populate("friends");
      if (!users) {
        return res.status(404).json({ message: "No matching user in db." });
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const data = User.create(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }
      );
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    try {
      const data = await User.findOneAndRemove({ _id: req.params.userId });

      if (!data) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const removeThought = await Thought.deleteMany({
        username: req.params.userId,
      });

      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },
};

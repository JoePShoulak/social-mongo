// ObjectId() method for converting userId string into an ObjectId for querying database
const { Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const data = await Thought.find({});

      if (!data) {
        return res.status(404).json({ message: "Thought not found." });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  },

  // Get a single user
  async getSingleThought(req, res) {
    try {
      const data = await Thought.findOne({ _id: req.params.thoughtId });
      if (!data) {
        return res.status(404).json({ message: "Thought not found." });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
  },

  // create a new user
  async createThought(req, res) {
    try {
      const data = Thought.create(req.body);
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // update a user
  async updateThought(req, res) {
    try {
      const data = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
      );
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },

  // Delete a user and remove them from the course
  async deleteThought(req, res) {
    try {
      const data = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!data) {
        return res.status(404).json({ message: "Thought not found." });
      }

      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  },
};

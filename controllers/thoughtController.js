const {Thought} = require("../models");

module.exports = {
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err)
    } 
  },

  async getSingleThought(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
      
      if(!thoughts) {
        return res.status(404).json({ message: "No Thought with that ID"})
      }
      return res.json(thoughts)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err)
    }
  },

  async createThought (req, res) {
    try {
      const thoughts = await Thought.create(req.body)

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  async updateThought (req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate({ _id: req.params.thoughtId });

      if (!thoughts) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }
      return res.json(thoughts)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err)
    }
  }

}
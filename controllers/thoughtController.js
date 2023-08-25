const {Thought, User} = require("../models");

module.exports = {
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();

     return res.json(thoughts);
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
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId } ,
        { $addToSet: { thoughts: thoughts._id } },
        { runValidators: true, new: true}
      );
      
      if(!user) {
        return res.status(404).json({
          message: "That user doesn't exist. Thought created"
        })
      }

     return res.status(200).json(thoughts);
    } catch (err) {
     return res.status(500).json(err)
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
  },

  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({ id: req.params.thoughtId});

      if(!thoughts) {
        return res.status(404).json({
          message: "Can't delete a thought that doesn't exist"
        });
      }

     return res.status(200).json({ message: "Thought deleted"})
    } catch (err) {
      console.log(err)
     return res.status(500).json(err)
    }
  },

  async createReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { id: req.params.thoughtId },
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true }
      );

      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err)
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete(
        { id: req.params.thoughtId },
        { $pull: { reactions: req.params.thoughtId } },
        { new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: "You can't react to a reaction that doesn't exist"})
      }
      return res.status(200).json(thoughts)
    } catch (err) {
      return res.status(500).json(err)  
    }
  }

}
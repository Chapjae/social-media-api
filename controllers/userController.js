const { User, Thought } = require("../models");

module.exports = {
  async getUser(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      //need to populate data for one user
      if(!user){
        return res.status(404).json({ message: "No User with that ID" });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {$set: req.body },
      { runValidators: true, new: true}
    );

    if (!user) {
      res.status(404).json({ message: "No User with this id" });
    }
    
      res.json(user);
    } catch (err) {
      res.status(500).json(err);    
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId});

      if (!user) {
        res.status(404).json({ message: "No User with that ID"});
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts }});
      res.json({ message: "User and Thoughts deleted" });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    console.log("hello")
    try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: "That user doesn't exist"});
      }
      res.status(200).json(user)

    } catch (err) {
      console.log(err)
      return res.status(500).json({message: "no friends!"})
    }
  },
  
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
  
      if (!user) {
        return res.status(404).json({ message: "That user doesn't exist"});
      }
      res.status(200).json(user)

    } catch (err) {
    
      return res.status(500).json({message: "no friends!"})
    }
  }
}
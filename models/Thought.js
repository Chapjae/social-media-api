const {Schema, Types} = require("mongoose");
const reactionSchema = require("./Reaction")

const thoughtSchema = new Schema(
  {
  thoughtId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId
  },
  thoughtText: { 
    type: String, 
    require: true, 
    minLength:1, 
    maxLength: 280 
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  username: {
    type: String, 
    required: true
  },
  reactions: [{}]
})

module.exports = thoughtSchema
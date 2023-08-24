const {Schema, model} = require("mongoose");


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId
  },
    reactionBody: {
      type: String,
      require: true,
      maxLength: 280,
  },
    username: {
      type: String,
      require: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

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
  reactions: [reactionSchema]
})


module.exports = thoughtSchema
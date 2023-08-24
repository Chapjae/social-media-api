const {Schema, model} = require("mongoose");
const thoughtSchema = require("./Thought")

const userSchema = new Schema(
  {
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trimmed: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    match: "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b." 
  },
  thoughts: [thoughtSchema],
  friends: [{type: Schema.type.ObjectId, ref: "User"}] 
}, {
  toJSON: {virutals: true}
})

userSchema.virtual("friendCount").get(function() {
  return this.friends.length
})

module.exports = User
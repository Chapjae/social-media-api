const {Schema, model} = require("mongoose");

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
  thoughts:[{type: Schema.type.ObjectId, ref: "Thought"}],
  friends: [{type: Schema.type.ObjectId, ref: "User"}] 
}, {
  toJSON: { virutals: true }
})

userSchema.virtual("friendCount").get(function() {
  return this.friends.length
})

const User = model("user", userSchema);

module.exports = User;
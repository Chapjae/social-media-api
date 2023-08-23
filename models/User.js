const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trimmed: true},
  email: {type: String, required: true, unique: true, match: "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b." },
  thoughts: [{type: Schema.type.ObjectId, ref: "Thought"}],
  friends: [{type: Schema.type.ObjectId, ref: "User"}] 
}, {
  toJSON: {virutals: true}
})

userSchema.virtual("friendCount").get(function() {
  return this.friends.length
})

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, require: true, minLength:1, maxLength: 280 },
  createdAt: {type: Date, default: Date.now},
  username: {type: String, required: true},
  reactions: [{}]
})
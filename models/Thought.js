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
      // Might need to figure out getter to format timestamp
      type: Date,
      default: Date.now
    },
  });

const thoughtSchema = new Schema(
  {
  thoughtText: { 
    type: String, 
    require: true, 
    minLength:1, 
    maxLength: 280 
  },
  createdAt: {
    type: Date, 
    default: Date.now,
    get: (date) => (date) // probably import dayJs and use that, or use my own vanilla JS funtion for date formatting
  },
  username: {
    type: String, 
    required: true
  },
  reactions: [reactionSchema]
}, {
  timestamps: true,
  toJSON: {virtuals: true, getters: true}
});

thoughtSchema.virtual("reactionCount").get(function() {
  return this.reactions.length
});

const Thought = model("Thought", thoughtSchema)

module.exports = Thought
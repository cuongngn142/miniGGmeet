const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: "MeetingRoom" },
    content: { type: String, required: true },
    type: { type: String, default: "text" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);

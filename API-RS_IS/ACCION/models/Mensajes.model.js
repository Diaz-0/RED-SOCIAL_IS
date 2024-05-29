const MessageSchema = {
    senderId: {
      type: INT,
      required: true,
    },
    receiverId: {
      type: INT,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  };
  
  module.exports = MessageSchema;
  
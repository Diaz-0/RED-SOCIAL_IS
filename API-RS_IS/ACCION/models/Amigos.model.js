const FriendshipSchema = {
    userId: {
      type: INT,
      required: true,
    },
    friendId: {
      type: INT,
      required: true,
    },
    estado: {
      type: String,
      enum: ['pendiente', 'aceptada', 'rechazada'],
      default: 'pendiente',
    },
    actionUserId: {
      type: INT,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  };
  
  module.exports = FriendshipSchema;
  
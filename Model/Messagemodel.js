const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    },
    messege: {
        type: String
    }
});

const Message = mongoose.model('messeges', messageSchema);

module.exports = Message;
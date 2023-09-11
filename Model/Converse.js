const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    member: {
        type: Array,
        required: true
    }
});

const Conversation = mongoose.model('conversations', conversationSchema);

module.exports = Conversation;
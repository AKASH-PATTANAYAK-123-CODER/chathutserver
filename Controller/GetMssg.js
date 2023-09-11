const userModel = require("../Model/Usermodel");
const Conversation = require("../Model/Converse");
const Message = require("../Model/Messagemodel");

const GetMssg = async (req, res) => {
    try {
        const checkMessages = async (conversationId) => {
            const messages = await Message.find({ conversationId });
            const messageUserData = Promise.all(messages.map(async (message) => {
                const user = await userModel.findById(message.senderId);
                return { user: { id: user._id }, message: message.messege }
            }));
            res.status(200).json(await messageUserData);
        }
        const conversationId = req.params.conversationId;
        if (conversationId === 'new') {
            const checkConversation = await Conversation.find({ member: { $all: [req.query.senderId, req.query.receiverId] } });
            if (checkConversation.length > 0) {
                checkMessages(checkConversation[0]._id);
            } else {
                return res.status(200).json([])
            }
        } else {
            checkMessages(conversationId);
        }
    } catch (error) {
        console.log('Error', error)
    }

}

module.exports = GetMssg;
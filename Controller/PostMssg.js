const Conversation =require("../Model/Converse");
const Message=require("../Model/Messagemodel");

const PostMssg = async (req, res) => {
    try {
        const { conversationId, senderId, messege, receiverId } = req.body;
        if (!senderId || !messege) return res.status(400).send('Please fill all required fields')
        if (conversationId === 'new' && receiverId) {
            const checkConversation = await Conversation.find({ member: { $all: [senderId, receiverId] } });
            if (checkConversation.length == 0) {
                const newCoversation = new Conversation({ member: [senderId, receiverId] });
                await newCoversation.save();
                const newMessage = new Message({ conversationId: newCoversation._id, senderId, messege });
                await newMessage.save();
            }
            else {
                const newMessage = new Message({ conversationId: checkConversation[0]._id, senderId, messege });
                await newMessage.save();
            }
        } else if (!conversationId && !receiverId) {
            return res.status(400).send('Please fill all required fields')
        } else {
            const newMessage = new Message({ conversationId, senderId, messege });
            await newMessage.save();
        }
    } catch (error) {
        console.log(error, 'Error')
    }
}

module.exports = PostMssg;
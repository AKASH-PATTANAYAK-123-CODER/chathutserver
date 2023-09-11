const userModel=require("../Model/Usermodel");
const Conversation=require("../Model/Converse");

const Getconverse=async(req,res)=>{
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ member: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.member.find((member) => member !== userId);
            const user = await userModel.findById(receiverId);
            return { user: { email:user.email, fullName: user.name, receiverId: user._id }, conversationId: conversation._id }
        }))
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log(error, 'Error')
    }
}
module.exports=Getconverse;
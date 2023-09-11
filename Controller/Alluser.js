const userModel=require("../Model/Usermodel");

const Alluser=async(req,res)=>{
    try {
        const userId = req.params.userId;
        const users = await userModel.find({ _id: { $ne: userId } });
        const usersData = Promise.all(users.map(async (user) => {
            return { user: { email:user.email, fullName: user.name, receiverId: user._id } }
        }))
        res.status(200).json(await usersData);
    } catch (error) {
        console.log('Error', error)
    }
}
module.exports=Alluser;
const jwt = require("jsonwebtoken");
const userModel = require("../Model/Usermodel");
const Authenticate = async (req, res) => {
    try {
        const token = req.cookies.chathuttoken;
        const verifyUser = jwt.verify(token, process.env.JWT_SEC_KEY);
        const user = await userModel.findById(verifyUser._id);
        res.status(200).json({ name: user.name, _id: user._id });


    }
    catch (error) {
        res.status(400).json("Please First You Log In..");
    }

}
module.exports = Authenticate;
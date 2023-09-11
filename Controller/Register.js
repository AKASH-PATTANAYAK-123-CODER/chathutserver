const userModel = require("../Model/Usermodel");
const bcrypt = require("bcrypt");
const validator = require('validator')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!name || !email || !password) return res.status(400).json("All fields are required...");

        if (name.length > 16) res.status(400).json("Your Name Should be in 16 Character including Space")

        if (user) return res.status(400).json("Given mail id already exist");

        if (!validator.isEmail(email)) return res.status(400).json("Given Mail id is not valid");

        if (!validator.isStrongPassword(password)) return res.status(400).json("Password Must be Strong ");

        user = new userModel({ name, email, password });

        const salt = await bcrypt.genSalt(15);

        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        res.status(200).json("Registration Done");
    }
    catch (error) {
        res.status(400).json("Server Error")
    }
}
module.exports = registerUser;
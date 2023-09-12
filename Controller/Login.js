const userModel = require("../Model/Usermodel");
const bcrypt = require("bcrypt");
const validator=require("validator")
const jwt = require("jsonwebtoken");

const create_Token = (_id) => {

    const jwtkey = process.env.JWT_SEC_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn: "1d" });
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!email || !password) return res.status(400).json("All fields are required...");

        if (!validator.isEmail(email)) return res.status(400).json("Given Mail id is not valid");

        if (!user) return res.status(400).json("Given mail id Not exist");

        const isValidPassword=await bcrypt.compare(password,user.password);

        if(!isValidPassword) return res.status(400).json("Invalid Password Give Valid One..");

       const token=create_Token(user._id);
      

       res.cookie("chathuttoken",token,{ maxAge:86400000,httpOnly:true});
                                                                 
       res.redirect("/api/user/authenticate");
    }
    catch (error) {
        res.status(400).json("Server Error")
    }

}

module.exports=LoginUser;



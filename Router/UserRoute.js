const express = require("express");
const router = express.Router();
const registerUser = require("../Controller/Register");
const LoginUser = require("../Controller/Login")
const Authenticate = require("../Middleware/Auth")
const Getconverse = require("../Controller/GetConversation");
const PostMssg = require("../Controller/PostMssg");
const GetMssg = require("../Controller/GetMssg");
const Alluser = require("../Controller/Alluser");
const Log_out = require("../Controller/LogOut")



router.post('/register', registerUser);
router.post('/login', LoginUser);
router.post('/postmssg', PostMssg);
router.get("/authenticate", Authenticate);
router.get("/getConversation/:userId", Getconverse);
router.get('/getmessege/:conversationId', GetMssg);
router.get('/allpeople/:userId', Alluser);
router.get('/logout', Log_out);
module.exports = router;
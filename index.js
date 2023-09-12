const express = require('express');
const cors = require('cors');
const connectDB = require('./Dbconnect/Databasecon');
const app = express();
const server=require('http').createServer(app);
const route = require('./Router/UserRoute');
const cookieparser = require("cookie-parser")
const userModel = require("./Model/Usermodel")
require('dotenv').config()
app.use(express.json());
app.use(cookieparser())

const io = require('socket.io')(server, {
    cors: {
        origin:'https://myapp-chathut-message.netlify.app'       //'http://localhost:3000'               
    }
});



app.use(cors({
    origin:'https://myapp-chathut-message.netlify.app' ,                        //'https://myapp-chathut-message.netlify.app',
    credentials: true
}))


app.use('/api/user', route);

const dburl="mongodb://127.0.0.1:27017/ChatApp"
connectDB(dburl);

let users = [];
io.on('connection', socket => {
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId:socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
        else {
            io.to(socket.id).emit('alreadyExist');
        }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await userModel.findById(senderId);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id }
            });
        }
        else {
            io.to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id }
            });
        }
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });

});






const PORT = process.env.PORT || 5345;


server.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})

const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods :['GET', 'POST']
    }
});

// app.get('/',(req,res)=>{
//     res.json({"Name":"Vaibhav"})
// })

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on('join-room', (data)=>{
        socket.join(data)
        // console.log(`User with ID = ${socket.id} joined room ${data}`)
    })

    socket.on('chat-mssg',(data)=>{
        socket.to(data.room).emit('recieve-mssg', data)
    })
     
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    
});



server.listen(5000, ()=>{
    console.log("Server running at port 5000");
})

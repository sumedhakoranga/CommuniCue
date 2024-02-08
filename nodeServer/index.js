const io = require('socket.io')(8000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  }
});

const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', data => {
    console.log("New user", data.userName) // Adjusted to receive an object
    users[socket.id] = data.userName;
    socket.broadcast.emit('user-joined', { userName: data.userName }); // Emitting as an object
  });

  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, userName: users[socket.id] }); // Adjusted key to userName
  });
});

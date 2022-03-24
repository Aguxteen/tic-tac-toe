import io from 'socket.io-client';
let socket;
///> initiate socket
export const initiateSocket = (room) => {
  socket = io('https://tic-tac-toe-peyon.herokuapp.com/');
  if (socket && room) socket.emit('join', room);
}

///> disconnecting socket

export const disconnectSocket = () => {
  if(socket) socket.disconnect();
}

export const leaveAllSockets = (cb,cb2,cb3) => {
  socket.on("all-leave", ()=>{

     cb("Selection")
     cb2(true)
     cb3(true)
  })
}

export const leaveSocket = (room) => {
    socket.emit("leave", room)
  }

///> listen the players in servers
export const serverListener = (cb) => {
    if (!socket) return(true);
    socket.on("change", servers =>{
        return cb(servers)
    })
}

///> Recibes Play
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
    
  socket.on('play', (play )=> {
    return cb(null, play);
  });
}

///> Sends the play
export const makePlay = (room, squares) => {
  if (socket) socket.emit('play', { squares, room });
}

///>
export const reset = (cb) => {
      
    socket.on('reset', ()=> {
      return cb();
    });
  }
///> Sends the play
export const sendReset = (room) => {
    if (socket) socket.emit('reset', room);
  }
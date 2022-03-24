import { useEffect, useState } from 'react';
import OnlineTicTac from './OnlineTicTac';
import { Link } from 'react-router-dom';
import { disconnectSocket, initiateSocket,
    subscribeToChat, makePlay, leaveSocket,
    serverListener, leaveAllSockets } from '../Library/Socket-func';


    const options = [
        [0,1,2],
        [3,4,5],    
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    
const Rooms = ()=>{
    const [score, setScore] = useState({
        X:0,
        O:0,
    })
    const [rooms, setRooms] = useState ({
        Selection:{
          players:0,
      },
        A:{
          players:0,
      },
        B:{
        players:0,
      },
        C:{
        players:0,
      },
        D:{
            players:0,
        },
        E:{
        players:0,
        },
            F:{
        players:0,
        },
      })
    const [room, setRoom] = useState("Selection");
    const [message, setMessage] = useState(false);

    const [squares, setSquares] = useState(
        [
            null, null,null,
            null, null,null,
            null, null,null,
        ]);
    const [turn, setTurn] = useState("X")
    const [render, setRender] = useState(true)
    const [winningSquares, setWinningSquares] = useState([])


    const reset = (a)=>{
        setTurn("X")
        setSquares(Array(9).fill(null))
        setWinningSquares([])
        

        if(a){
            setScore({
                X:0,
                O:0,
            })
        }
    }
    const endGame=(result, options)=>{
        if(result !== null){
            setScore({...score,
                [result]: score[result] + 1
            })
        }

        setWinningSquares(options)

        setTimeout(()=>{
            reset()
        }, 2000)
        


    }

    const winner = (square)=>{
        for( let i = 0; i < options.length; i++ ){
            const [a,b,c] = options[i]
            if(square[a] && square[a] === square[b] && square[a] === square[c]){
                endGame(square[a], options[i])
                

                return
            }
        }
        if(!square.includes(null)){

            endGame(null, Array.from(Array(10).keys()))

            return
        }
    }
    
    
    const passGameData = (err, data) => {


        setSquares(data)
        winner(data)
          if(err) return;
        }


    
    
    useEffect(() => {
        
        if (room) initiateSocket(room);
        
        serverListener((a)=>{
            setRooms(a)
        })
        subscribeToChat(passGameData);
        makePlay(room, squares)
        leaveAllSockets(setRoom, setMessage, reset)
        
        
        return () => {
        //   leaveSocket(room)
          disconnectSocket();
        }
      }, [room,render,turn]);

    return(
    <div>
        <h1>Tic Tac Toe</h1>
        {room==="Selection" && <Link to="/"> <button>   ←   </button></Link>}
        {message && <p>The other player left the game <button onClick={()=>{setMessage(false)}}>ok</button></p>}
        <h2>Room: {room}</h2>
        {room!=="Selection" && 
        <button onClick={() => {let a=room; setRoom("Selection"); leaveSocket(a);  reset(true)}} key={"Selection"}> Selection </button>
}
            <br/>
            {room==="Selection" &&
            <div className='roomsDiv'>
                <h3>Available rooms</h3>
                {rooms["A"].players<2 && <button className='roomButton' onClick={() => setRoom("A")} key={"A"}> A  Players:{rooms["A"].players}/2 </button>}
                {rooms["B"].players<2 && <button className='roomButton' onClick={() => setRoom("B")} key={"B"}> B  Players:{rooms["B"].players}/2 </button>}
                {rooms["C"].players<2 && <button className='roomButton' onClick={() => setRoom("C")} key={"C"}> C  Players:{rooms["C"].players}/2 </button>}
                {rooms["D"].players<2 && <button className='roomButton' onClick={() => setRoom("D")} key={"D"}> D  Players:{rooms["D"].players}/2 </button>}
                {rooms["E"].players<2 && <button className='roomButton' onClick={() => setRoom("E")} key={"E"}> E  Players:{rooms["E"].players}/2 </button>}
                {rooms["F"].players<2 && <button className='roomButton' onClick={() => setRoom("F")} key={"F"}> F  Players:{rooms["F"].players}/2 </button>}
                
                
            </div>
            }
            


        {room!=="Selection" && 
        <div>
        <h1>Live square:</h1>
         <OnlineTicTac
        turn ={turn}
        setSquares={setSquares}
        squares={squares} 
        team={rooms[room].players===0 ? "O" : "X"}
        setRender={setRender}
        render={render}
        winningSquares={winningSquares}
        score={score}
        endGame={endGame}
        winner={winner}
        room={room}
        /> 
    
        
        </div>
        
        }

        

    </div>)
}

export default Rooms
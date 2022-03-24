import React, { useEffect, useState } from 'react';
import Board from './Board/board';
import '../App.css';
import { disconnectSocket, initiateSocket,
    subscribeToChat, makePlay, leaveSocket,
    serverListener, reset, sendReset} from '../Library/Socket-func';

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

export default function OnlineTicTac({
    setSquares,
    squares,
    team,
    turn,
    setRender,
    render,
    winningSquares,
    score,
    endGame,
    room,
}){
    const [message, setMessage] = useState(false);

    const isTurn = (team)=>{
        let X = squares.filter((e)=>e==="X")
        let O = squares.filter((e)=>e==="O")

        if(team==="X"){
            let back = X.length===O.length
            ? true
            : false
            return back
        }
        if(team==="O"){
            let back = X.length === O.length+1
            ? true
            : false
            return back

        }
    }


    const winner = (square)=>{
        for( let i = 0; i < options.length; i++ ){
            const [a,b,c] = options[i]
            if(square[a] && square[a] === square[b] && square[a] === square[c]){
                setRender(!render)

                return
            }
        }
        if(!square.includes(null)){

            endGame(null, Array.from(Array(10).keys()))
            setRender(!render)

            return
        }
        setRender(!render)
    }
    const handleClick = (square)=>{
        if(isTurn(team)){
            let newSquares = [...squares]
            newSquares.splice(square,1,team)
            setSquares(newSquares)
            winner(newSquares)
        }else{
            setMessage(true)
        }
            
        
        
        
    }
        useEffect(()=>{
            winner(squares)
        },[])
    return(
        
        <div >
            
            <div className='divTodo'>
                <h3>Team: {team}</h3>
            <Board winningSquares={winningSquares} turn={turn} onClick={handleClick} squares={squares}/>
            {message && <p>You cant play now! wait another player to play <button onClick={()=>{setMessage(false)}}>ok</button></p>}

            <div className='divcontador'>
            <span className='contadorX'>{score.X}</span>  <span className='contadorO'>{score.O}</span>
            </div>
            
            </div>


        </div>
    )
}

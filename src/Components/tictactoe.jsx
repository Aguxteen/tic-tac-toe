import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board/board';
import '../App.css';

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

export default function TicTacToe(){
    
    const [turn, setTurn] = useState("X")
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [winningSquares, setWinningSquares] = useState([])
    const [score, setScore] = useState({
        X:0,
        O:0,
    })

    const reset= ()=>{
        setTurn("X")
        setSquares([
                 null, null,null,
                 null, null,null,
                 null, null,null,
             ])
        setWinningSquares([])
    }

    const endGame=(result, options)=>{
        setTurn(null)
        if(result !== null){
            setScore({...score,
                [result]: score[result] + 1
            })
        }

        setWinningSquares(options)

        setTimeout(reset, 2000)

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
        setTurn(turn === "X"? "O" : "X")
    }
    const handleClick = (square)=>{
        let newSquares = [...squares]

        newSquares.splice(square,1,turn)
        setSquares(newSquares)
        winner(newSquares)
    }
    return(
        
        <div >
            <h1>Tic Tac Toe</h1>
            <Link to="/"> <button>   ←   </button></Link>
            <div className='divTodo'>
            <Board winningSquares={winningSquares} turn={turn} onClick={handleClick} squares={squares}/>
            <div className='divcontador'>
            <span className='contadorX'>{score.X}</span>  <span className='contadorO'>{score.O}</span>
            </div>
            
            </div>


        </div>
    )
}

import React from "react"
import Square from "../Square/square"
import "./board.css"

const Board = ({squares, onClick, turn, winningSquares})=>{
    const create = (values)=>(
        values.map(value=>(
            <Square
             winner={winningSquares.includes(value)}
             turn={turn}
             onClick={()=>onClick(value)}
             value={squares[value]}
             key={value}
            />
        ))
    )

    return(
        <div className="board">
            <div className="row">
                {create([0,1,2])}
            </div>

            <div className="row">
                {create([3,4,5])}
            </div>

            <div className="row">
                {create([6,7,8])}
            </div>
        </div>
    )
}
export default Board
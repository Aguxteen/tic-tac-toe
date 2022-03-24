import React from "react"
import "./square.css"
import classNames from "classnames"
const Square = ({ value, onClick, turn, winner })=>{

    const handleClick = ()=>{
        (turn !== null && value === null) && onClick()
    }

    let classname = classNames({
        square:true,
        ["square--"+value]: value !== null,
        winner: winner
    })
    return(
        <div onClick={handleClick} className={classname}>
            
        </div>
    )
}
export default Square
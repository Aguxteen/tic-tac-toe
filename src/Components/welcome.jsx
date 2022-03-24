import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome(){
    

    return(
        <div>
            <h1>Tic Tac Toe</h1>
            <Link to="/offline"> <button>Offline</button></Link>
            <Link to="/online"> <button>Online</button></Link>

        </div>
    )
}
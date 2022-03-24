import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome(){
    

    return(
        <div>
            <h1>Tic Tac Toe</h1>
            
            <Link className='link' to="/offline"> <button>Offline</button></Link>
            <Link className='link' to="/online"> <button>Online</button></Link>
            
            <h2>Created by <a target="_blank" href='https://pedro-peyon-portafolio.vercel.app/'>Pedro Peyon</a></h2>
            <h2>Code  <a target="_blank" href='https://github.com/Aguxteen/tic-tac-toe'>here</a></h2>
        </div>
    )
}



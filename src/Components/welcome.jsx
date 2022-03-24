import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome(){
    

    return(
        <div>
            <h1>Tic Tac Toe</h1>
            <h4>Created by Pedro Peyon</h4>
            <div className='divButtons'>
                <div>
                    <Link className='link' to="/offline"><button className='buttton'>Offline</button></Link>
                    <Link className='link' to="/online" ><button className='buttton'>Online</button></Link>
                </div>
            
            <Link className='link' to="/"       ><button className='butttonA'>Instructions</button></Link>
            <br/>
            <br/>

            <div>
                <a target="_blank" href='https://pedro-peyon-portafolio.vercel.app/'><button className='buttton'>Front code</button></a>
                <a target="_blank" href='https://github.com/Aguxteen/tic-tac-toe-server'><button className='buttton'>Back code</button></a>
            </div>
                <a target="_blank" href='https://github.com/Aguxteen/tic-tac-toe'><button className='buttton'>Creator</button></a>

            

            </div>
            
        </div>
    )
}



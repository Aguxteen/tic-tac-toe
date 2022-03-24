import './App.css';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Welcome from './Components/welcome.jsx';
import TicTacToe from './Components/tictactoe';
import Rooms from './Components/Rooms';
import Instructions from './Components/instructions';

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
     <Route path="/" element={<Welcome/>} />
     <Route path="/offline" element={<TicTacToe/>} />
     <Route path="/online" element={<Rooms />} />
     <Route path="/instructions" element={<Instructions/>} />


     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

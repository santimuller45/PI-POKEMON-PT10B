// import './App.css';
import { Route , Routes } from 'react-router-dom';
import { Landing , Home , Detail , Form } from './views/index.js';

function App() {


  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/detail/:idPokemon" element={<Detail/>}></Route>
          <Route path="/form" element={<Form/>}></Route>
        </Routes>
    </div>
  );
}

export default App;

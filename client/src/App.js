// import './App.css';
import { Route , Routes , useLocation } from 'react-router-dom';
import { Landing , Home , Detail , Form } from './views/index.js';
import Nav from './components/Nav/Nav.jsx';

function App() {

  const location = useLocation();

  return (
    <div className="App">
        {location.pathname !== "/" 
          ? <Nav/>
          : null
        }
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

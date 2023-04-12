import './App.css';
import { Route , Routes } from 'react-router-dom';
import { Landing , Home , Detail , Form } from './views/index.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons , getTypes } from './components/redux/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch])

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

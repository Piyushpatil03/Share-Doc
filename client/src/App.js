import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDoc from './components/CreateDoc';
import Signup from './components/Signup';
import Login from './components/Login';
import Homescreen from './components/Homescreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homescreen' element={<Homescreen/>}/>
        <Route path='/documents/:id' element={<CreateDoc/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

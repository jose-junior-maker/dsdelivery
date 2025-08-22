import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Orders from './routes/Orders';


function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

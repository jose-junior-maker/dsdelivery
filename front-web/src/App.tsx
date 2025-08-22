import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Orders from './routes/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>

  );
}

export default App

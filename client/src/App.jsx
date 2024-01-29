import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRouter from './routes/UserRouter';
import './index.css'

function App() {
  axios.defaults.baseURL = "https://brototask.comicworld.store"
  // axios.defaults.baseURL = "http://localhost:3000"
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<UserRouter />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>

    </>
  )
}

export default App

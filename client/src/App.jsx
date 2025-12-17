import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import Cursor from './components/Cursor'
import Header from './components/Header'
import './App.css'

function App(){
  return (
    <BrowserRouter>
      <Cursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

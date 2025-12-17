import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import Cursor from './components/Cursor'
import './App.css'

function App(){
  return (
    <BrowserRouter>
      <header style={{background:'#000',padding:'12px',position:'sticky',top:0,zIndex:20}}>
        <nav style={{display:'flex',gap:20,alignItems:'center',justifyContent:'center'}}>
          <Link to="/" style={{color:'#fff',fontWeight:'700'}}>Home</Link>
          <Link to="/login" style={{color:'#fff',fontWeight:'700'}}>Login</Link>
          <a href="/admin.html" style={{color:'#fff',fontWeight:'700'}}>Admin</a>
        </nav>
      </header>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

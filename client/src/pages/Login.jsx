import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

export default function Login(){
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()

  const submit = ()=>{
    // simple client-side auth placeholder
    if(user === 'admin' && pass === 'admin'){
      localStorage.setItem('isLoggedIn','1')
      navigate('/admin')
    }else{
      alert('Invalid credentials — use admin/admin for now')
    }
  }

  return (
    <div className="loginHead">
      <div className="login">
        <h1>Login</h1>
        <p><input placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} /></p>
        <p><input placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} /></p>
        <div>
          <button onClick={submit}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

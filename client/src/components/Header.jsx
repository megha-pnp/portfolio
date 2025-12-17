import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <div className="logo"> Megha </div>
      <div className="nav">
        <li> <a href="#home" className="a1"> Home </a> </li>
        <li> <a href="#aboutSection" className="a1"> About </a></li>
        <li> <a href="#skills" className="a1"> Skills </a></li>
        <li><a href="#projects" className="a1"> Projects </a></li>
        <li> <a href="#getTouch" className="a1"> Contact </a></li>
        <li> <a href="/admin.html" className="a1"> Admin </a></li>
      </div>

      <div className="icons">
        <a className="i1" href="https://x.com/megha_2105?t=pBwHswGzuPAg1IIQ8XuYkw&s=09"><i className="fab fa-twitter"/></a>
        <a className="i1" href="https://github.com/megha-pnp"><i className="fab fa-github"/> </a>
        <a className="i1" href="https://www.linkedin.com/in/megha-062022330"><i className="fab fa-linkedin-in"/> </a>
        <a className="i1" href="#"><i className="fab fa-instagram"/> </a>
      </div>
    </header>
  )
}

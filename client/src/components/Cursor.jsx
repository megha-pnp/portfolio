import React, {useEffect, useRef} from 'react'
import '../styles/style.css'

export default function Cursor(){
  const ref = useRef(null)

  useEffect(()=>{
    function onMove(e){
      const el = ref.current
      if(!el) return
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', onMove)
    return ()=> window.removeEventListener('mousemove', onMove)
  },[])

  return <div ref={ref} className="cursor" aria-hidden="true" />
}

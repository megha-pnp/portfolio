import React, {useState} from 'react'
import useSiteData from '../hooks/useSiteData'
import '../styles/admin.css'
import Home from './Home'

function HomePreview(){
  // render Home but keep layout compact for sidebar preview
  return (<div style={{background:'transparent'}}><Home/></div>)
}

export default function Admin(){
  const [siteData, setSiteData] = useSiteData()
  const [selected, setSelected] = useState('home')

  const sec = siteData[selected] || {}
  const updateField = (k,v)=>{
    const next = {...siteData, [selected]: {...sec, [k]: v}}
    setSiteData(next)
  }

  return (
    <div style={{display:'flex',gap:20}}>
      <aside style={{width:280,background:'#111',color:'#fff',padding:16,borderRadius:8}}>
        <h3>Sections</h3>
        <ul style={{listStyle:'none',padding:0}}>
          {['home','about','skills','projects','contact'].map(s=> (
            <li key={s} style={{margin:'6px 0'}}>
              <button onClick={()=>setSelected(s)} style={{width:'100%',padding:8,background:selected===s?'rgba(255,255,255,0.06)':'transparent',color:'#fff',border:0}}>{s}</button>
            </li>
          ))}
        </ul>
      </aside>
      <div style={{flex:1}}>
        <h2>Edit: {selected}</h2>
        <div style={{background:'#fff',padding:16,borderRadius:8}}>
          {selected==='home' && (
            <div>
              <label>Title (HTML allowed)</label>
              <input value={sec.title||''} onChange={e=>updateField('title',e.target.value)} style={{width:'100%'}} />
              <label>Subtitle</label>
              <input value={sec.subtitle||''} onChange={e=>updateField('subtitle',e.target.value)} style={{width:'100%'}} />
              <label>Paragraph</label>
              <textarea value={sec.para||''} onChange={e=>updateField('para',e.target.value)} style={{width:'100%'}} />
            </div>
          )}
          {selected==='about' && (
            <div>
              <label>Heading</label>
              <input value={sec.heading||''} onChange={e=>updateField('heading',e.target.value)} style={{width:'100%'}} />
              <label>Personal (plain text, newline separated)</label>
              <textarea value={sec.personal||''} onChange={e=>updateField('personal',e.target.value)} style={{width:'100%'}} />
            </div>
          )}
          {selected==='skills' && (
            <div>
              <label>Heading</label>
              <input value={sec.heading||''} onChange={e=>updateField('heading',e.target.value)} style={{width:'100%'}} />
              <label>Skills (comma separated)</label>
              <input value={sec.skillsList||''} onChange={e=>updateField('skillsList',e.target.value)} style={{width:'100%'}} />
            </div>
          )}
          {selected==='projects' && (
            <div>
              <label>Heading</label>
              <input value={sec.heading||''} onChange={e=>updateField('heading',e.target.value)} style={{width:'100%'}} />
              <label>Projects (comma separated)</label>
              <input value={sec.list||''} onChange={e=>updateField('list',e.target.value)} style={{width:'100%'}} />
            </div>
          )}
          {selected==='contact' && (
            <div>
              <label>Heading</label>
              <input value={sec.heading||''} onChange={e=>updateField('heading',e.target.value)} style={{width:'100%'}} />
              <label>Info</label>
              <textarea value={sec.info||''} onChange={e=>updateField('info',e.target.value)} style={{width:'100%'}} />
              <label>Email</label>
              <input value={sec.email||''} onChange={e=>updateField('email',e.target.value)} style={{width:'100%'}} />
            </div>
          )}

          <div style={{marginTop:12,display:'flex',gap:8}}>
            <button onClick={()=>{ localStorage.setItem('siteData', JSON.stringify(siteData)); alert('Saved ✔') }} className="primary">Save</button>
            <button onClick={()=>{ if(!confirm('Reset stored data to defaults?')) return; localStorage.removeItem('siteData'); window.location.reload() }}>Reset</button>
          </div>
        </div>
      </div>
      <aside style={{width:360}}>
        <h3>Preview</h3>
        <div style={{width:'100%',height:'70vh',borderRadius:8,border:'1px solid #ddd',overflow:'auto',background:'#0f0f0f',padding:12}}>
          {/* Render the live Home preview inline so edits appear immediately */}
          <HomePreview />
        </div>
      </aside>
    </div>
  )
}

// Simple admin script: store an object `siteData` in localStorage
const defaultData = {
  home: {
    title: "Hi, I'm <span style=\"color:#00ff88;\">Megha</span>",
    subtitle: "Full Stack Developer",
    para: `I specialize in building exceptional digital experiences using cutting-edge technologies.`
  },
  about: {
    heading: "About Me",
    personal: `First Name: Megha\nLast Name: Kathuria\nAge: 20 Years`,
  },
  skills: {
    heading: "My Skills",
    skillsList: "HTML5, CSS3, JS, React.js, VS Code, Git/Github"
  },
  projects: {
    heading: "Projects",
    list: "Personal Portfolio, Library Management, To-do List"
  },
  contact: {
    heading: "GET IN TOUCH",
    email: "meghakathuriaofficial@gmail.com",
    info: "Have a project in mind? Let's collaborate and bring your ideas to life!"
  }
}

let siteData = loadData()

// initialize behavior after DOM ready to avoid race conditions
document.addEventListener('DOMContentLoaded', ()=>{
  const leftSidebar = document.getElementById('leftSidebar')
  const rightSidebar = document.getElementById('rightSidebar')
  const openLeftBtn = document.getElementById('openLeft')
  const closeLeftBtn = document.getElementById('closeLeft')
  const openRightBtn = document.getElementById('openRight')
  const closeRightBtn = document.getElementById('closeRight')
  const editorEl = document.getElementById('editor')
  const saveBtnEl = document.getElementById('saveBtn')
  const resetBtnEl = document.getElementById('resetBtn')
  const previewFrameEl = document.getElementById('previewFrame')

  // If nav has no buttons (unexpected), create them from defaultData keys
  const navList = document.querySelector('#leftSidebar nav ul')
  if(navList && navList.children.length === 0){
    Object.keys(defaultData).forEach(key => {
      const li = document.createElement('li')
      const btn = document.createElement('button')
      btn.className = 'nav-btn'
      btn.dataset.section = key
      btn.textContent = key.charAt(0).toUpperCase() + key.slice(1)
      li.appendChild(btn)
      navList.appendChild(li)
    })
  }

  // attach nav click handlers
  Array.from(document.querySelectorAll('.nav-btn')).forEach(b=>{
    b.addEventListener('click',()=>{
      Array.from(document.querySelectorAll('.nav-btn')).forEach(x=>x.classList.remove('active'))
      b.classList.add('active')
      // open right sidebar and update title — ensure panel pushes content instead of overlaying
      if(rightSidebar){
        rightSidebar.classList.add('open')
        document.body.classList.add('right-open')
      }
      if(openRightBtn) openRightBtn.style.display='none'
      const title = b.textContent.trim()
      const rightTitle = document.getElementById('rightTitle')
      if(rightTitle) rightTitle.textContent = `Edit: ${title}`
      renderEditor(b.dataset.section)
    })
  })

  // open/close buttons
  openLeftBtn && openLeftBtn.addEventListener('click',()=>{
    leftSidebar && leftSidebar.classList.add('open')
    document.body.classList.add('left-open')
    if(openLeftBtn) openLeftBtn.style.display='none'
  })
  closeLeftBtn && closeLeftBtn.addEventListener('click',()=>{
    leftSidebar && leftSidebar.classList.remove('open')
    document.body.classList.remove('left-open')
    if(openLeftBtn) openLeftBtn.style.display=''
  })

  openRightBtn && openRightBtn.addEventListener('click',()=>{
    rightSidebar && rightSidebar.classList.add('open')
    document.body.classList.add('right-open')
    if(openRightBtn) openRightBtn.style.display='none'
  })
  closeRightBtn && closeRightBtn.addEventListener('click',()=>{
    rightSidebar && rightSidebar.classList.remove('open')
    document.body.classList.remove('right-open')
    if(openRightBtn) openRightBtn.style.display=''
  })

  // set initial active button and render
  const initial = document.querySelector('.nav-btn[data-section="home"]') || document.querySelector('.nav-btn')
  if(initial){
    initial.classList.add('active')
    const rightTitle = document.getElementById('rightTitle')
    if(rightTitle) rightTitle.textContent = 'Edit: ' + (initial.textContent.trim() || 'Home')
    renderEditor(initial.dataset.section || 'home')
  } else {
    // show a helpful placeholder
    const editor = document.getElementById('editor')
    if(editor) editor.innerHTML = '<div class="loading">No sections found — try refreshing the page.</div>'
  }

  // save/reset handlers
  saveBtnEl && saveBtnEl.addEventListener('click', ()=>{
    try{
      const activeBtn = document.querySelector('.nav-btn.active')
      if(!activeBtn) return alert('No section selected')
      const active = activeBtn.dataset.section
      const sec = siteData[active]
      if(active==='home'){
        sec.title = unescapeHtml(document.getElementById('title').value)
        sec.subtitle = unescapeHtml(document.getElementById('subtitle').value)
        sec.para = unescapeHtml(document.getElementById('para').value)
      }else if(active==='about'){
        sec.heading = unescapeHtml(document.getElementById('heading').value)
        sec.personal = unescapeHtml(document.getElementById('personal').value)
      }else if(active==='skills'){
        sec.heading = unescapeHtml(document.getElementById('heading').value)
        sec.skillsList = unescapeHtml(document.getElementById('skillsList').value)
      }else if(active==='projects'){
        sec.heading = unescapeHtml(document.getElementById('heading').value)
        sec.list = unescapeHtml(document.getElementById('list').value)
      }else if(active==='contact'){
        sec.heading = unescapeHtml(document.getElementById('heading').value)
        sec.info = unescapeHtml(document.getElementById('info').value)
        sec.email = unescapeHtml(document.getElementById('email').value)
      }

      localStorage.setItem('siteData',JSON.stringify(siteData))
      // refresh preview
      try{previewFrameEl.contentWindow.location.reload()}catch(e){}
      alert('Saved ✔')
    }catch(err){console.error(err);alert('Save failed — check console')}
  })

  resetBtnEl && resetBtnEl.addEventListener('click',()=>{
    if(!confirm('Reset stored data to defaults?')) return
    siteData = JSON.parse(JSON.stringify(defaultData))
    localStorage.setItem('siteData',JSON.stringify(siteData))
    try{previewFrameEl.contentWindow.location.reload()}catch(e){}
    const activeBtn = document.querySelector('.nav-btn.active')
    renderEditor(activeBtn ? activeBtn.dataset.section : 'home')
    alert('Reset ✔')
  })

})

function loadData(){
  try{
    const raw = localStorage.getItem('siteData')
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(defaultData))
  }catch(e){return JSON.parse(JSON.stringify(defaultData))}
}

function renderEditor(section='home'){
  // show a quick loader so the panel never looks blank
  editor.innerHTML = '<div class="loading">Loading editor…</div>'
  try{
    const sec = siteData && siteData[section] ? siteData[section] : (defaultData[section] || {})
    const form = document.createElement('div')
    form.className = 'form'

    if(section==='home'){
      form.innerHTML = `
        <div class="field"><label>Title (HTML allowed)</label><input id="title" type="text" value="${escapeHtml(sec.title||'')}"></div>
        <div class="field"><label>Subtitle</label><input id="subtitle" type="text" value="${escapeHtml(sec.subtitle||'')}"></div>
        <div class="field"><label>Paragraph</label><textarea id="para">${escapeHtml(sec.para||'')}</textarea></div>
      `
    }else if(section==='about'){
      form.innerHTML = `
        <div class="field"><label>Heading</label><input id="heading" type="text" value="${escapeHtml(sec.heading||'')}"></div>
        <div class="field"><label>Personal (plain text)</label><textarea id="personal">${escapeHtml(sec.personal||'')}</textarea></div>
      `
    }else if(section==='skills'){
      form.innerHTML = `
        <div class="field"><label>Heading</label><input id="heading" type="text" value="${escapeHtml(sec.heading||'')}"></div>
        <div class="field"><label>Skills (comma separated)</label><input id="skillsList" type="text" value="${escapeHtml(sec.skillsList||'')}"></div>
      `
    }else if(section==='projects'){
      form.innerHTML = `
        <div class="field"><label>Heading</label><input id="heading" type="text" value="${escapeHtml(sec.heading||'')}"></div>
        <div class="field"><label>Projects (comma separated)</label><input id="list" type="text" value="${escapeHtml(sec.list||'')}"></div>
      `
    }else if(section==='contact'){
      form.innerHTML = `
        <div class="field"><label>Heading</label><input id="heading" type="text" value="${escapeHtml(sec.heading||'')}"></div>
        <div class="field"><label>Info</label><textarea id="info">${escapeHtml(sec.info||'')}</textarea></div>
        <div class="field"><label>Email</label><input id="email" type="text" value="${escapeHtml(sec.email||'')}"></div>
      `
    }

    editor.innerHTML = ''
    editor.appendChild(form)
  }catch(err){
    console.error('renderEditor error',err)
    editor.innerHTML = '<div class="error">Could not load editor — see console for details.</div>'
  }
}

function escapeHtml(str){
  return (str||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function unescapeHtml(str){
  return (str||'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
}

// handle nav clicks
Array.from(document.querySelectorAll('.nav-btn')).forEach(b=>{
  b.addEventListener('click',()=>{
    Array.from(document.querySelectorAll('.nav-btn')).forEach(x=>x.classList.remove('active'))
    b.classList.add('active')
    // open right sidebar and update title — ensure panel pushes content instead of overlaying
    rightSidebar.classList.add('open')
    document.body.classList.add('right-open')
    if(openRightBtn) openRightBtn.style.display='none'
    const title = b.textContent.trim()
    const rightTitle = document.getElementById('rightTitle')
    if(rightTitle) rightTitle.textContent = `Edit: ${title}`
    renderEditor(b.dataset.section)
  })
})

// set initial
document.querySelector('.nav-btn[data-section="home"]').classList.add('active')
renderEditor('home')

saveBtn.addEventListener('click',()=>{
  // collect fields based on currently active section
  const active = document.querySelector('.nav-btn.active').dataset.section
  const sec = siteData[active]
  if(active==='home'){
    sec.title = unescapeHtml(document.getElementById('title').value)
    sec.subtitle = unescapeHtml(document.getElementById('subtitle').value)
    sec.para = unescapeHtml(document.getElementById('para').value)
  }else if(active==='about'){
    sec.heading = unescapeHtml(document.getElementById('heading').value)
    sec.personal = unescapeHtml(document.getElementById('personal').value)
  }else if(active==='skills'){
    sec.heading = unescapeHtml(document.getElementById('heading').value)
    sec.skillsList = unescapeHtml(document.getElementById('skillsList').value)
  }else if(active==='projects'){
    sec.heading = unescapeHtml(document.getElementById('heading').value)
    sec.list = unescapeHtml(document.getElementById('list').value)
  }else if(active==='contact'){
    sec.heading = unescapeHtml(document.getElementById('heading').value)
    sec.info = unescapeHtml(document.getElementById('info').value)
    sec.email = unescapeHtml(document.getElementById('email').value)
  }

  localStorage.setItem('siteData',JSON.stringify(siteData))
  // refresh preview
  try{previewFrame.contentWindow.location.reload()}catch(e){/* ignore */}
  alert('Saved ✔')
})

resetBtn.addEventListener('click',()=>{
  if(!confirm('Reset stored data to defaults?')) return
  siteData = JSON.parse(JSON.stringify(defaultData))
  localStorage.setItem('siteData',JSON.stringify(siteData))
  try{previewFrame.contentWindow.location.reload()}catch(e){}
  renderEditor(document.querySelector('.nav-btn.active').dataset.section)
  alert('Reset ✔')
})

// Load site data from localStorage and apply to DOM (if present)
(function(){
  function getData(){
    try{ const raw = localStorage.getItem('siteData'); return raw ? JSON.parse(raw) : null }catch(e){return null}
  }
  const data = getData()
  if(!data) return // nothing to apply

  // Home
  const homeTitle = document.getElementById('homeTitle')
  if(homeTitle && data.home && data.home.title) homeTitle.innerHTML = data.home.title
  const homeSubtitle = document.getElementById('homeSubtitle')
  if(homeSubtitle && data.home && data.home.subtitle) homeSubtitle.textContent = data.home.subtitle
  const homePara = document.getElementById('homePara')
  if(homePara && data.home && data.home.para) homePara.textContent = data.home.para

  // About
  const aboutHeading = document.getElementById('aboutHeading')
  if(aboutHeading && data.about && data.about.heading) aboutHeading.textContent = data.about.heading
  const aboutPersonal = document.getElementById('aboutPersonal')
  if(aboutPersonal && data.about && data.about.personal){
    // convert newlines to formatted lines
    const lines = data.about.personal.split('\n').map(l=>l.trim()).filter(Boolean)
    let out = '<div class="personal">'
    out += '<div>'
    // show lines in two columns if possible
    for(let i=0;i<Math.ceil(lines.length/2);i++){
      out += `<h5 class="data">${escapeHtml(lines[i])}</h5>`
    }
    out += '</div><div>'
    for(let i=Math.ceil(lines.length/2);i<lines.length;i++){
      out += `<h5 class="data">${escapeHtml(lines[i])}</h5>`
    }
    out += '</div></div>'
    aboutPersonal.innerHTML = out
  }

  // Skills
  const skillsHeading = document.getElementById('skillsHeading')
  if(skillsHeading && data.skills && data.skills.heading) skillsHeading.textContent = data.skills.heading
  const skillsList = document.getElementById('skillsList')
  if(skillsList && data.skills && data.skills.skillsList){
    const parts = data.skills.skillsList.split(',').map(s=>s.trim()).filter(Boolean)
    let out = ''
    for(let i=0;i<parts.length;i++){
      out += `<div class="skills">${escapeHtml(parts[i])}<h6 class="h6"></h6></div>`
    }
    // If there were originally row groups, keep them simple
    skillsList.innerHTML = `<div class="all">${out}</div>`
  }

  // Projects
  const projectsHeading = document.getElementById('projectsHeading')
  if(projectsHeading && data.projects && data.projects.heading) projectsHeading.textContent = data.projects.heading
  const projectsList = document.getElementById('projectsList')
  if(projectsList && data.projects && data.projects.list){
    const parts = data.projects.list.split(',').map(s=>s.trim()).filter(Boolean)
    let out = ''
    parts.forEach(p=>{
      out += `<div class="b1">${escapeHtml(p)}</div>`
    })
    projectsList.innerHTML = out
  }

  // Contact
  const contactHeading = document.getElementById('contactHeading')
  if(contactHeading && data.contact && data.contact.heading) contactHeading.textContent = data.contact.heading
  const contactInfo = document.getElementById('contactInfo')
  if(contactInfo && data.contact && data.contact.info) contactInfo.textContent = data.contact.info
  const contactEmail = document.getElementById('contactEmail')
  if(contactEmail && data.contact && data.contact.email) contactEmail.textContent = data.contact.email

  function escapeHtml(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
})();
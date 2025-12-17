export function loadSiteData(){
  try{
    const raw = localStorage.getItem('siteData')
    return raw ? JSON.parse(raw) : null
  }catch(e){return null}
}

export function defaultSiteData(){
  return {
    home: { title: "Hi, I'm <span style=\"color:#00ff88;\">Megha</span>", subtitle: 'Full Stack Developer', para: 'I specialize in building exceptional digital experiences using cutting-edge technologies.' },
    about: { heading: 'About Me', personal: 'First Name: Megha\nLast Name: Kathuria\nAge: 20 Years' },
    skills: { heading: 'My Skills', skillsList: 'HTML5, CSS3, JS, React.js, VS Code, Git/Github' },
    projects: { heading: 'Projects', list: 'Personal Portfolio, Library Management, To-do List' },
    contact: { heading: 'GET IN TOUCH', email: 'meghakathuriaofficial@gmail.com', info: "Have a project in mind? Let's collaborate and bring your ideas to life!" }
  }
}

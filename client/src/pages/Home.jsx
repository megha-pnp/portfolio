import React from 'react'
import '../styles/style.css'
import useSiteData from '../hooks/useSiteData'

export default function Home(){
  const [data] = useSiteData()

  const home = data.home || {}
  const about = data.about || {}
  const skills = data.skills || {}
  const projects = data.projects || {}
  const contact = data.contact || {}

  return (
    <div>
      <section id="home" className="s1" style={{display: 'flex'}}>
        <div className="block1">
          <h1 id="homeTitle" className="name" dangerouslySetInnerHTML={{__html: home.title}} />
          <div id="homeSubtitle" className="developer">{home.subtitle}</div>
          <p id="homePara" className="para">{home.para}</p>
          <div className="colHead">
            <div className="col">React.js</div>
            <div className="col">Node.js</div>
            <div className="col">TypeScript.js</div>
            <div className="col">MongoDB</div>
          </div>
          <a href="#getTouch" style={{ color: 'black' }}>
            <button className="btn">Let's Build Something Amazing -&gt;</button>
          </a>
        </div>

        <div className="block2">
          <img src="/anime.jpg" alt="" />
        </div>
      </section>

      <section className="about" id="aboutSection">
        <h2 id="aboutHeading" className="abt">{about.heading}</h2>
        <hr />
        <h3 className="abt1">PERSONAL INFO</h3>
        <div id="aboutPersonal" className="aboutDiv">
          <div className="personal">
            <div>
              <h5 className="data">First Name: <span style={{color: 'white'}}>Megha</span></h5>
              <h5 className="data">Age: <span style={{color: 'white'}}>20 Years</span></h5>
              <h5 className="data">Freelance: <span style={{color: 'white'}}>Available</span></h5>
              <h5 className="data">Phone: <span style={{color: 'white'}}>74192-*****</span></h5>
              <h5 className="data">Email: <span style={{color: 'white'}}>meghakathuriaofficial@gmail.com</span></h5>
            </div>
            <div>
              <h5 className="data">Last Name: <span style={{color: 'white'}}>Kathuria</span></h5>
              <h5 className="data">Nationality: <span style={{color: 'white'}}>Indian</span></h5>
              <h5 className="data">Address: <span style={{color: 'white'}}>Panipat</span></h5>
              <h5 className="data">Languages: <span style={{color: 'white'}}>English, Hindi</span></h5>
              <h5 className="data">Category: <span style={{color: 'white'}}>General</span></h5>
            </div>
          </div>

          <div className="personal1">
            <div className="pdiv">
              <div className="p1">
                <h5 className="achive">10+</h5>
                <p className="achive1">Skills Learned</p>
              </div>
              <div className="p1">
                <h5 className="achive">5+</h5>
                <p className="achive1">Projects Completed</p>
              </div>
            </div>

            <div className="pdiv1">
              <div className="p1">
                <h5 className="achive">150+</h5>
                <p className="achive1">Hours of Learning</p>
              </div>
              <div className="p1">
                <h5 className="achive">20+</h5>
                <p className="achive1">Github Commits</p>
              </div>
            </div>
          </div>
        </div>
        <button className="cvbtn">DOWNLOAD CV</button>
      </section>

      <section id="skills" className="s2">
        <div>
          <h2 id="skillsHeading" className="Myskill">{skills.heading}</h2>
          <hr />
        </div>
        <div id="skillsList">
          <div className="all">
            <div className="skills">HTML5<h6 className="h6">Semantic markup and modern web standards</h6></div>
            <div className="skills">CSS3<h6 className="h6">Advanced styling and animations</h6></div>
            <div className="skills">JS<h6 className="h6">Core web stack and ES6+ features</h6></div>
          </div>
          <div className="all">
            <div className="skills">React.js<h6 className="h6">Component-based UI development</h6></div>
            <div className="skills">VS Code<h6 className="h6">Editor and tooling</h6></div>
            <div className="skills">Git/Github<h6 className="h6">Version control & collaboration</h6></div>
          </div>
        </div>
      </section>

      <section className="project" id="projects">
        <h2 id="projectsHeading" className="Myskill">{projects.heading}</h2>
        <hr />
        <div id="projectsList" className="projectdiv">
          <div className="b1">Personal <br />Portfolio</div>
          <div className="b1">Library <br />Management</div>
          <div className="b1">To-do <br />List</div>
        </div>
      </section>

      <section className="contact" id="getTouch">
        <h2 id="contactHeading" className="Myskill">{contact.heading}</h2>
        <hr />
        <p id="contactInfo" className="info">{contact.info}</p>

        <div className="container">
          <div className="box">
            <div className="in">
              <h5 className="h5">Email</h5>
              <p id="contactEmail" className="ph">{contact.email}</p>
            </div>
            <div className="in">
              <h5 className="h5">Available For</h5>
              <p className="ph">Freelance Projects</p>
            </div>
            <div className="in">
              <h5 className="h5">Location</h5>
              <p className="ph">Remote</p>
            </div>
          </div>

          <div className="box1">
            <div><input type="text" placeholder="Your Name" /></div>
            <div><input type="text" placeholder="your.email@example.com" /></div>
            <div><input type="text" placeholder="Project Subject" /></div>
            <div><input className="ab" type="text" placeholder="Tell me about yourself" /></div>
            <button className="btn1">Send Message</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot">
          <div className="aboutMe">
            <h1 className="me">Megha</h1>
            <p className="mypara">Creative Web Developer crafting modern & responsive web experiences.</p>
          </div>
          <div className="quickLinks">
            <h1 className="quick">Quick Links</h1>
            <li style={{listStyle: 'none'}}><a href="#home" className="qlink">Home</a></li>
            <li style={{listStyle: 'none'}}><a href="#aboutSection" className="qlink">About</a></li>
            <li style={{listStyle: 'none'}}><a href="#skills" className="qlink">Skills</a></li>
            <li style={{listStyle: 'none'}}><a href="#projects" className="qlink">Projects</a></li>
            <li style={{listStyle: 'none'}}><a href="#getTouch" className="qlink">Contact</a></li>
          </div>
          <div className="connect">
            <h1 className="con">Connect</h1>
            <a href="https://x.com/megha_2105?t=pBwHswGzuPAg1IIQ8XuYkw&s=09" className="conIcon" style={{marginLeft:20}}><i className="fab fa-twitter"/></a>
            <a href="https://github.com/megha-pnp" className="conIcon"><i className="fab fa-github"/></a>
            <a href="https://www.linkedin.com/in/megha-062022330" className="conIcon"><i className="fab fa-linkedin-in"/></a>
            <a href="#" className="conIcon"><i className="fab fa-instagram"/></a>
          </div>
        </div>
        <pre className="copyright">© 2025 Megha. All rights reserved.</pre>
      </footer>
    </div>
  )
}

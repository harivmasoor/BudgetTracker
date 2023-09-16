import React from 'react';
import './ContactUsPage.css';
import elilta from './as/elilta.jpeg'
import dominic from './as/dominic.jpg'
import hari from './as/hari.jpeg'
import farivar from './as/farivar.jpg'

function ContactUsPage() {
  return (
    <div className="contact-us-page">

     <div className='elilta'>
        <h1>Elilta Abrham</h1>
        <img src={elilta} alt="elilta" />
        <div className="icons-container">
          <a  href="https://github.com/eliltaA" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
          <a  href="eliltatabrham@gmail.com" ><i class="fa fa-user-circle"></i></a>
          <a  href="https://www.linkedin.com/in/elilta-abrham-87b79228b/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
          <div className="about-me">
          Hi. I'm a dedicated software engineer with a passion for coding that goes back to my high school days. I've journeyed from a background in customer service to mastering languages like JavaScript and Ruby and creating Full-Stack Projects. I enjoy tackling challenges head-on and thrive in collaborative environments. Let's build something amazing together.
          </div>
        </div>
      </div>

      <div className='dominic'>
        <h1>Dominic Chan</h1>
        <img src={dominic} alt="dominic" />
        <div className="icons-container">
          <a  href="https://github.com/dominicchanDmc" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
          <a  href="https://dominicchan.netlify.app/" target="_blank" rel="noopener noreferrer"><i class="fa fa-user-circle"></i></a>
          <a  href="https://www.linkedin.com/in/dominic-chan-0b4128255" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
          <div className="about-me">
          Hi, I am Dominic Chan, Having worked as a Full-Stack Developer for seven years in Hong Kong, mainly take part in government and hospital project. During that time, I built different system for public use , using Java, SQL, and Javascript, Jquery. I loved the feeling during debug and the sense of success after solve the bug.
Now, I live in USA and learn new skill such as React, Redux, Ruby on Rails.
I'm currently looking for a job where I can make an impact, and using my debugging experience to solve problems.
          </div>
        </div>
      </div>

      <div className='hari'>
        <h1>Hari Masoor</h1>
        <img src={hari} alt="hari" />
        <div className="icons-container">
          <a  href="https://github.com/harivmasoor" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
          <a  href="https://harimasoor.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-user-circle"></i></a>
          <a  href="https://www.linkedin.com/in/harimasoor/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a> 
          <div className="about-me">
          Hi, I am Hari Masoor. My experiences range from customer service and
troubleshooting...to technically validating 8 figure deals and delivering global keynotes at the
largest conferences in the world. Whatever the task - I am confident I have skills to accomplish
it. I am currently seeking to apply my unique skill set to fullstack positions.
          </div>
        </div>
      </div>

      <div className='farivar'>
        <h1>Farivar Amiri</h1>
        <img src={farivar} alt="farivar" />
        <div className="icons-container">
          <a  href="https://github.com/Farivar90" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i></a>
          <a  href="https://farivar-amiri.com" target="_blank" rel="noopener noreferrer"><i class="fa fa-user-circle"></i></a>
          <a  href="https://linkedin.com/in/farivar-amiri-458273198" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a>
          <div className="about-me">
          Hello,

I'm Farivar Amiri. Previously, I owned and managed Lomana Cafe and partnered in the automotive parts import sector. For over 14 years, I've been deeply involved in the financial markets, with a keen focus on Forex. I possess degrees in Electrical and Electronic Engineering and Atomic Physics from a prestigious university in my homeland. Building and innovating are passions of mine. In this endeavor, I'm responsible for the UI/UX design and frontend development. I've completed diverse projects in various languages; feel free to explore them in my portfolio.
          </div>
        </div>
      </div>

    </div>
  );
}

export default ContactUsPage;

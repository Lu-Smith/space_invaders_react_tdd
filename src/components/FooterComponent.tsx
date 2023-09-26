import React from 'react';
import "../styles/Footer.css";

const FooterComponent = () => {
  return (
    <div data-testid="Footer-component" className='Footer'>
        <h4>This game was coded by 
            <a 
            className="Footer-profile-link" 
            href="https://www.lunasmithart.com/" 
            target="_blank"
            rel="noreferrer"
            data-text="Luna Smith"> Luna Smith </a> 
            and is available as an open-source project on 
            <a 
            className="Footer-gitHub-link" 
            href="https://github.com/Lu-Smith/space_invaders_react_tdd" 
            target="_blank"
            rel="noreferrer"
            data-text="GitHub"> GitHub</a>.
        </h4>
    </div>
  )
}

export default FooterComponent
import React from 'react'

const FooterComponent = () => {
  return (
    <div data-testid="Footer-component">
        <h4>This game was coded by 
            <a 
            className="profile-link" 
            href="https://www.lunasmithart.com/" 
            target="_blank"
            rel="noreferrer"> Luna Smith </a> 
            and is available as an open-source project on 
            <a 
            className="gitHub-link" 
            href="https://github.com/Lu-Smith/space_invaders_react_tdd" 
            target="_blank"
            rel="noreferrer"> GitHub</a>.
        </h4>
    </div>
  )
}

export default FooterComponent
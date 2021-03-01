import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className='footer'>
      <a href="https://github.com/Christina-Kashevar" target="_blank" rel="noreferrer" className="footer__link">
       <img className="footer__link_img" src="../img/github.svg" alt="github icon" />
      </a>
      <span>2021</span>
      <a href="https://rs.school/js/" rel="noreferrer" target="_blank" className="footer__link">
        <img className="footer__link_img" src="../img/rsschool.svg" alt="rsschool icon" />
      </a>
  </div>
)

export default Footer;
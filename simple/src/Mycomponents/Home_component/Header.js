import React from 'react';
import '../../index.css';
import logo from '../../assets/e11f95725a67cdcc447f76a7fa75eef7.jpg';
import boseLogo from '../../assets/bose_web.png';
import jcdesc from '../../assets/header.svg';
export default function Header() {
    return(  
        <header>
            <img className="header-unilogo" src={logo} alt="First Image Description" />
            <img className=" header-desc" src={jcdesc} alt="Header SVG" />
            <img className="header-bose"src={boseLogo} alt="Bose Logo" />
            
        </header>
    );
}

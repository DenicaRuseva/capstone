import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Footer.css';

const footer = () => (
    <div className='footer'>
        <div className='footer-wrapp'>
            <div className='footer-item'>
                <span className='footer-icon'>
                    <Link to="/"><FontAwesomeIcon icon='home' size='1x'/></Link>
                </span>
                <Link to="/"><span> Home</span></Link>
            </div>
            
            <div className='footer-item'>
                <span className='footer-icon'>
                    <Link to="/contact"><FontAwesomeIcon icon='address-book' size='1x'/></Link>
                </span>
                <Link to="/contact"><span> Contact us</span></Link>
            </div>  
            <div className='footer-item'>
                <span className='footer-icon'>
                    <Link to="/about"><FontAwesomeIcon icon='info' size='1x'/></Link>
                </span>
                <Link to="/about"><span> About us</span></Link>
            </div>
        </div>
        
    </div>
);

export default footer;
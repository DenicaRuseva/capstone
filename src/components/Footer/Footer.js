import React, {PureComponent} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends PureComponent {
    render(){
        return (
        <div className='footer'>
            <div className='footer-wrapp'>
                <div className='footer-item'>
                    <span className='footer-icon'>
                        <Link to="/"><FontAwesomeIcon icon='home' size='1x'/></Link>
                    </span>
                    <Link to="/"><span> Home</span></Link> {/*rubric73 rubric76*/}
                </div>
                
                <div className='footer-item'>
                    <span className='footer-icon'>
                        <Link to="/contact"><FontAwesomeIcon icon='address-book' size='1x'/></Link>
                    </span>
                    <Link to="/contact"><span> Contact us</span></Link> {/*rubric75 rubric78*/}
                </div>  
                <div className='footer-item'>
                    <span className='footer-icon'>
                        <Link to="/about"><FontAwesomeIcon icon='info' size='1x'/></Link>
                    </span>
                    <Link to="/about"><span> About us</span></Link> {/*rubric74 rubric77*/}
                </div>
            </div> 
        </div>
        )
    }
};

export default Footer;
import React, {PureComponent} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Contacts.css';


class Contacts extends PureComponent {
    render(){
        return(
            <div className='contacts-container'>
                <div className='form  contact-form contacts-wrapper'>
                    <h4>CONTACT INFO</h4>
                    <p>
                        <FontAwesomeIcon icon='map-marker-alt'/>
                        <span> WorldWideImporters locality</span>
                    </p>
                    <p>
                        <span>GPS: 12.3456789, 34.1234567</span>
                    </p>
                    <p>
                    <FontAwesomeIcon icon='phone'/>
                        <span> 123-456-7890</span> 
                    </p>
                    <p>
                        <FontAwesomeIcon icon="at"/>
                        <span> loremipsum@lorem.com</span>
                    </p>
                </div>
            </div>

        );
    };
};

export default Contacts;
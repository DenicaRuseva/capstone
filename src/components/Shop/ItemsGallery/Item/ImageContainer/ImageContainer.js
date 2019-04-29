import React from 'react';
import './ImageContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const imageContainer = (props) => {
    const image = <img src={props.src} alt={props.alt} height={props.height} width={props.width}
        onLoad={(event) => {
            event.target.parentElement.classList.add('image-shown');
            // event.target.nextElementSibling.classList.add('hide');
        }} onClick={props.clicked}/>;

    return (
        <div className='img-container'>
            {image}
            <div className='img-container-spinner' onClick={props.clicked}><FontAwesomeIcon icon='image' size='7x'/></div>
        </div>
    );
};

export default imageContainer;
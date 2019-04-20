import React from 'react';
import './ImageContainer.css';

const imageContainer = (props) => (
    <div className='img-container'>
        <img src={props.src} alt={props.alt} height="126.5px"/>
    </div>
);

export default imageContainer;
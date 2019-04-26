import React from 'react';
import './ImageContainer.css';



const imageContainer = (props) => {
    const image = <img src={props.src} alt={props.alt} height="126.5px"
        onLoad={(event) => {
            event.target.classList.add('image-shown');
            event.target.nextElementSibling.classList.add('hide');
        }} onClick={props.clicked}/>;

    return (
        <div className='img-container'>
            {image}
            <div className='img-container-spinner' onClick={props.clicked}>spinner</div>
        </div>
    );
};

export default imageContainer;
import React from 'react';
import './CarouselCheckbox.css';

const carouselCheckbox = (props) => (
    <div className="carousel-checkbox-container">
        <label className='carousel-checkbox-label'>Toggle Slide Show
            <input type="checkbox" onClick={props.changed}/>
        </label>
    </div>
);
 export default carouselCheckbox;
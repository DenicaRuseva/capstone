import React from 'react';
import CaruselRadioButton from './CrouselRadioButton/CarouselRadioButton';
import './CarouselRadioButtons.css';

const caruselRadioButtons = (props) => (
    <div className='radio-buttons'>
        <div className='radio-buttons-wrapp'>
            <CaruselRadioButton value='0' shownProductId={props.shownProductId} clicked={props.clickOnButton}/>
            <CaruselRadioButton value='1' shownProductId={props.shownProductId} clicked={props.clickOnButton}/>
            <CaruselRadioButton value='2' shownProductId={props.shownProductId} clicked={props.clickOnButton}/>
        </div>

    </div>
);

export default caruselRadioButtons;
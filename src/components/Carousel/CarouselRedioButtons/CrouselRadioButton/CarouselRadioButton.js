import React from 'react';

const caruselRadioButton = (props) => (
    <input className='radio-button' type='radio' value={props.value} checked={props.value == props.shownProductId} onChange={() => props.clicked(props.value)}/>
);

export default caruselRadioButton;
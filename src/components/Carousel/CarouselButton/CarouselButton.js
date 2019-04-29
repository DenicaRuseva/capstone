import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CarouselButton.css';


const caruselButton = (props) => (
    props.left ? 
    <div className="leftBtn" disabled={props.disabled}><FontAwesomeIcon icon='angle-left' size="5x" onClick={props.clicked}/></div> :
    <div className="rightBtn" disabled={props.disabled}><FontAwesomeIcon icon='angle-right' size="5x" onClick={props.clicked}/></div>
);

export default caruselButton;
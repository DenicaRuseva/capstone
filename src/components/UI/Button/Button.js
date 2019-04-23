import React from 'react';
import './Button.css';

const button = (props) => (
    <button className={props.class} type={props.type} onClick={props.clicked}>{props.children}</button> 
);

export default button;
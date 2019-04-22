import React from 'react';

const button = (props) => (
    <button className={props.class} type={props.type} onClick={props.clicked}>{props.cildren}</button> 
);

export default button;
import React from 'react';
import './Input.css';


const input = ( props ) => {
    const inputClasses = ["inputElement"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid');
    };

    return (
        <div className='input'>
            <label className='label'>{props.label}</label>
            <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
        </div>
    );

};

export default input;
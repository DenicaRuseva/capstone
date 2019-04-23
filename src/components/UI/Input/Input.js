import React from 'react';
import './Input.css';


const input = ( props ) => {
    const inputClasses = ["inputElement"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('invalid');
    };

    if(props.touched){
        inputClasses.push('touched');
    };

    let inputElement;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='input'>
            <label className='label'>{props.label}{inputElement}</label>
            
        </div>
    );

};

export default input;
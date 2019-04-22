import React from 'react';
import Input from './Input/Input';
import './Form.css';


const form = (props) => {

        const formElementsArray = [];
        for (let key in props.orderForm) {
            formElementsArray.push({
                id: key,
                config: props.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={(event) => {
                event.preventDefault();
                props.makeOrder(event) } }
                > {/*rubric51*/}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => props.inputChanged(event, formElement.id)} 
                        label={formElement.config.label}
                        />
                ))}
                 {/*rubric50*/}
                <button className='order-button'>CHECKOUT</button>
            </form>
        );
        return (
            <div className='form'>
                <h4>Enter Shipping Details</h4>
                {form}
            </div>
        );
};


export default form;
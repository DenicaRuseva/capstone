import React, {Component} from 'react';
import Input from './Input/Input';
import './Form.css';


class Form extends Component {
    

    render () {
        const formElementsArray = [];
        for (let key in this.props.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.props.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={(event) => this.props.makeOrder(event)}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.props.inputChanged(event, formElement.id)} 
                        label={formElement.config.label}
                        />
                ))}
                <button type='submit' className='order-button'>ORDER</button>
            </form>
        );
        return (
            <div className='form'>
                <h4>Enter Shipping Details</h4>
                {form}
            </div>
        );
    }
};


export default Form;
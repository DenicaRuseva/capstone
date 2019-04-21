import React, {Component} from 'react';
import Input from './Input/Input';
import './Form.css';


class Form extends Component {
    state = {
        orderForm: {
            firstName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                },
                valid: false,
                touched: false
            },
            street: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone Number 123-456-7890',
                    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        };
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        };

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        };

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        };

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        };

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={(event) => event.preventDefault()}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <button disabled={!this.state.formIsValid}>ORDER</button>
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
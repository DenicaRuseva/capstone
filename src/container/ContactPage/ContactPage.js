import React, {Component} from 'react';
import Form from '../../components/UI/Form/Form';
import {updateFormOnInput} from '../utility';

class ContactPage extends Component {

    state = {
        contactForm: {
            firstName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    pattern: '^[A-Za-z]{1,50}$',
                    required: true, 
                    tabIndex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    isLettersOnly: true,
                    maxLength: 50
                },
                label: "First Name",
                valid: false,
                touched: false
            },
            lastName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    pattern: '^[A-Za-z]{1,50}$', 
                    required: true, 
                    tabIndex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    isLettersOnly: true,
                    maxLength: 50
                },
                label: 'Last Name',
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    pattern: '^.{1,50}$',
                    placeholder: 'Your E-Mail',
                    required: true,
                    tabIndex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 50
                },
                label: "E-mail",
                valid: false,
                touched: false
            },
            textarea: {
                elementType: 'textarea',
                elementConfig: {
                    rows: '5',
                    cols: '33',
                    maxLength:"500",
                    placeholder: 'Enter your message' 
                },
                value: '',
                validation: {
                    required: true
                },
                label: 'Message',
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormData = updateFormOnInput(event, inputIdentifier, this.state.contactForm);
        this.setState({contactForm: updatedFormData[0], formIsValid: updatedFormData[1]});
    };

    formSubmitHandler = () => {
        const message = this.state.contactForm.textarea.value;
        console.log(message);
        window.alert("Your message: " + JSON.stringify({message}).split(':')[1].slice(0, -1));
    };

    render(){
        return(
            <div className='contact-page'>
            <Form 
            form={this.state.contactForm}
            inputChanged={this.inputChangedHandler}
            onSubmited={this.formSubmitHandler}
            btnText="Send"/>
            </div>
        );
    };
};

export default ContactPage;
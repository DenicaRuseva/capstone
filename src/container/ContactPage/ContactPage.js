import React, {Component} from 'react';
import Form from '../../components/UI/Form/Form';
import Contacts from '../../components/ContactPage/Contacts/Contacts';
import {updateFormOnInput} from '../utility';
import './ContactPage.css';

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
                label: "FIRST NAME *",
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
                label: 'LAST NAME *',
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    pattern: '^.{1,50}$',
                    placeholder: 'E-Mail',
                    required: true,
                    tabIndex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 50
                },
                label: "EMAIL *",
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
                label: 'MESSAGE',
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
                <div className="form-container">
                    <Form 
                    formClass="contact-form"
                    form={this.state.contactForm}
                    formHeader="CONTACT US"
                    inputChanged={this.inputChangedHandler}
                    onSubmited={this.formSubmitHandler}
                    btnText="Send"
                    btnClass='contacts-button'/>
                </div>
                    <Contacts/>
            </div>
        );
    };
};

export default ContactPage;
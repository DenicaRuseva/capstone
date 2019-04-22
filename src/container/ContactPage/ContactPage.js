import React, {Component} from 'react';

class ContactPage extends Component {

    state = {
        contactForm: {
            name: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    pattern: '^[A-Za-z]+$',
                    required: true,
                    tabindex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    isLettersOnly: true
                },
                label: "Name",
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        }
    };

    render(){
        return(
            <div className='contact-page'>
            form
            </div>
        );
    };
};

export default ContactPage;
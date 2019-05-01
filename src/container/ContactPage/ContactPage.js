import React, {Component} from 'react';
import Form from '../../components/UI/Form/Form';
import Contacts from '../../components/ContactPage/Contacts/Contacts';
import {updateFormOnInput} from '../utility';
import './ContactPage.css';

class ContactPage extends Component {

    state = {
        contactForm: {
            dropdown: {
                elementType: 'dropdown',
                elementConfig: {
                    listItems: [
                        {
                            value: 'Nisi lacus sed viverra tellus',
                            elementConfig: {
                            listItems: ['Id volutpat lacus', 'Adipiscing', 'Interdum velit laoreet id donec ultrices tincidunt']
                            }
                        }, 
                        {
                            value: 'Nibh mauris',
                            elementConfig: {
                            listItems: ['Etiam dignissim diam quis enim lobortis scelerisque', 'Ut morbi tincidunt', 'Sfeugiat sed lectus']
                            }
                        }, 
                        {
                            value: 'Cursus metus aliquam',
                            elementConfig: {
                            listItems: ['Pellentesque diam volutpat', 'Iaculis eu non diam phasellus', 'Neque']
                            }
                        }, 
                        {
                            value: '',
                            elementConfig: {
                                listItems: ['All']
                            }
                        
                        }
                    ]
                },
                label: 'SUBJECT',
                value: 'All',
                touched: false
            },
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
                    placeholder: 'Enter your message',
                    required: true 
                },
                value: '',
                validation: {
                    required: true
                },
                label: 'MESSAGE *',
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

    //rubric60
    formSubmitHandler = () => {
        const message = this.state.contactForm.textarea.value;
        window.alert("Your message: " + JSON.stringify({message}).split(':')[1].slice(0, -1));
        let updatedForm = {...this.state.contactForm};
        for (let key in updatedForm) {
            updatedForm[key] = {
                ...this.state.contactForm[key]
            };
            updatedForm[key].value = '';
            updatedForm[key].touched = false;
        };
        updatedForm.dropdown.value = 'All';
        this.setState({contactForm: updatedForm});
    };

    handleSubcategoryChoosen = (event) => {
        const updatedForm = {
            ...this.state.contactForm
        };
        const updatedFormElement = { 
            ...updatedForm.dropdown
        };
        updatedForm.dropdown = updatedFormElement;
        updatedFormElement.value = event.target.innerHTML;
        updatedFormElement.touched = true;
        this.setState({contactForm: updatedForm})
    };
    

    render(){
        return(
            <div className='contact-page'>
            {/*rubric57 rubric59 rubric61*/}
                <div className="form-container"> 
                    <Form 
                    formClass="contact-form"
                    form={this.state.contactForm}
                    formHeader="CONTACT US"
                    inputChanged={this.inputChangedHandler}
                    onSubmited={this.formSubmitHandler}
                    btnText="Send"
                    btnClass='contacts-button'
                    onSubcetegoryChoosen={this.handleSubcategoryChoosen}/>
                </div>
                {/*rubric58 */}
                    <Contacts/>
            </div>
        );
    };
};

export default ContactPage;
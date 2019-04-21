import React, {Component} from 'react';
import Order from './Order/Order';
import Form from './Form/Form';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import Modal from '../UI/Modal/Modal';
import OrderSummary from './OrderSummary/OrderSummary';
import './Cart.css';

class Cart extends Component {

    state = {
        orderForm: {
            firstName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    pattern: '^[A-Za-z]+$',
                    required: true
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
            lastName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    pattern: '^[A-Za-z]+$',
                    required: true
                },
                value: '',
                validation: {
                    required: true,
                    isLettersOnly: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    required: true
                },
                value: '',
                validation: {
                    required: true
                },
                label: "Address",
                valid: false,
                touched: false
            },
            city: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                    required: true
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
                    placeholder: '123-456-7890',
                    pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
                    required: true 
                },
                value: '',
                validation: {
                    required: true,
                    isPhone: true
                },
                label: 'Phone number',
                valid: false,
                touched: false
            }
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        };
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        };

        if(rules.isPhone) {
            const pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
            isValid = pattern.test(value) && isValid
        };

        if(rules.isLettersOnly) {
            const pattern = /^[a-zA-Z]+$/;
            isValid = pattern.test(value) && isValid;
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
        
        this.setState({orderForm: updatedOrderForm});

    }

    render(){
        const cart = this.props.products.length > 0 || this.props.orderMade  ? (
                <div className="cart">
                    <Modal show={this.props.orderMade} modalClosed={this.props.cleanState}>
                        <OrderSummary 
                        products={this.props.products} 
                        productsQuantities={this.props.productsQuantities}
                        totalPrice={this.props.totalPrice}
                        firstName={this.state.orderForm.firstName.value}
                        lastName={this.state.orderForm.lastName.value}
                        street={this.state.orderForm.street.value}
                        city={this.state.orderForm.city.value}
                        phoneNumber={this.state.orderForm.phoneNumber.value}/>
                    </Modal>
                    <Order 
                        products={this.props.products} 
                        productsQuantities={this.props.productsQuantities}
                        removeProduct={this.props.removeProduct}
                        changeQuantity={this.props.changeQuantity}
                        totalPrice={this.props.totalPrice}/>
                    <Form 
                        orderForm={this.state.orderForm}
                        inputChanged={this.inputChangedHandler}
                        makeOrder={this.props.makeOrder}/>
                </div>
              ) : <div className='cart-empty'>Your cart is empty</div>
        
        return (
            <WithoutRootDiv>
                {cart}
            </WithoutRootDiv> 
        );
    };
}
   

export default Cart;
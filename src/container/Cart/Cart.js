import React, {Component} from 'react';
import Order from '../../components/Cart/Order/Order';
import Form from '../../components/Cart/Form/Form';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Cart/OrderSummary/OrderSummary';
import './Cart.css';
import { updateFormOnInput } from '../utility';

class Cart extends Component {

    state = {
        orderForm: {
            firstName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    pattern: '^[A-Za-z]+$',  /*rubric52*/
                    required: true, /*rubric52*/
                    tabindex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    isLettersOnly: true
                },
                label: "First Name",
                valid: false,
                touched: false
            },
            lastName: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    pattern: '^[A-Za-z]+$', /*rubric52*/
                    required: true, /*rubric52*/
                    tabindex:"-1"
                },
                value: '',
                validation: {
                    required: true,
                    isLettersOnly: true
                },
                label: 'Last Name',
                valid: false,
                touched: false
            },
            street: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    required: true, /*rubric52*/
                    tabindex:"-1"
                },
                value: '',
                validation: {
                    required: true
                },
                label: "Street",
                valid: false,
                touched: false
            },
            city: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                    required: true, /*rubric52*/
                    tabindex:"-1"
                },
                value: '',
                validation: {
                    required: true
                },
                label: 'City',
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementConfig: {
                    type: 'tel',
                    placeholder: '123-456-7890',
                    pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$', /*rubric52*/
                    required: true,  /*rubric52*/
                    tabindex:"-1"
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

    // inputChangedHandler = (event, inputIdentifier) => {
    //     const updatedOrderForm = {
    //         ...this.state.orderForm
    //     };
    //     const updatedFormElement = { 
    //         ...updatedOrderForm[inputIdentifier]
    //     };
    //     updatedFormElement.value = event.target.value;
    //     updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //     updatedFormElement.touched = true;
    //     updatedOrderForm[inputIdentifier] = updatedFormElement;
        
    //     this.setState({orderForm: updatedOrderForm});

    // }


      inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = updateFormOnInput(event, inputIdentifier, this.state.orderForm);
        
        this.setState({orderForm: updatedForm});
    };

    render(){
        const cart = this.props.products.length > 0 || this.props.orderMade  ? (
                <div className="cart">
                    <Modal show={this.props.orderMade} modalClosed={this.props.cleanState}>
                        {/*rubric51*/}
                        <OrderSummary 
                        totalPrice={this.props.totalPrice}
                        firstName={this.state.orderForm.firstName.value}
                        lastName={this.state.orderForm.lastName.value}
                        street={this.state.orderForm.street.value}
                        city={this.state.orderForm.city.value}
                        phoneNumber={this.state.orderForm.phoneNumber.value}/>
                    </Modal>
                    <Order  /*rubric47, rubric49, rubric53, rubric54, rubric55*/
                        products={this.props.products} 
                        productsQuantities={this.props.productsQuantities}
                        removeProduct={this.props.removeProduct}
                        changeQuantity={this.props.changeQuantity}
                        totalPrice={this.props.totalPrice}/>
                    <Form /*rubric48, rubric50, rubric51, rubric52 */
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
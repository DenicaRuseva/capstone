import React from 'react';
import './OrderSummary.css';

const orderSummary = (props) => {
    console.log("in render orderSummary");
    return (
        <div className='order-summary'>
            <h3 className='order-header'>Your order was received</h3>
            <p>Total cost: {(props.totalPrice*1.01+10).toFixed(2)}$</p>
            <h4>Shipping details:</h4>
            <p>Address: {props.street}, {props.city}</p>
            <p>Name: {props.firstName} {props.lastName}</p>
            <p>Phone Number: {props.phoneNumber}</p>
        </div>
);
};

export default orderSummary;
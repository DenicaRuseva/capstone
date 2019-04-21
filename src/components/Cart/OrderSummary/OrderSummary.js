import React from 'react';
import WithoutRootDiv from '../../../hoc/WithoutRootDiv/WithoutRootDiv';

const orderSummary = (props) => {
    console.log("in render orderSummary");
    const productsList = props.products.map((product, i) => {
        return <li key={i}>{product.name}: {props.productsQuantities[i]} pieces</li>
    } );
    return (
        <WithoutRootDiv>
            <h3>Your order was received</h3>
            <ul>
                {productsList}
            </ul>
            <p>Total cost: {(props.totalPrice*1.01+10).toFixed(2)}$</p>
            <h5>Shipping details:</h5>
            <p>Address: {props.street} str, {props.city}</p>
            <p>{props.firstName} {props.lastName}</p>
            <p>{props.phoneNumber}</p>
        </WithoutRootDiv>
);
};

export default orderSummary;
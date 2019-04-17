import React from 'react';

const cart = (props) => {
    console.log(props.products);
    const products = props.products.map(product => {
        return <div>name: {product.name}</div>
    });
    return <div>{products}</div>
};

export default cart;
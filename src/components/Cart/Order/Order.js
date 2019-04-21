import React from 'react';
import Product from './Product/Product';
import './Order.css';

const order = (props) => {
    const shipping = 10;
    // let totalPrice = 0;
    const products = props.products.map((product, i) => {
        if(product.stock >= props.productsQuantities[i]){
            // totalPrice = totalPrice + parseFloat(product.price)*props.productsQuantities[i];
            return (
            <Product 
            key={i} 
            product={product} 
            quantity={props.productsQuantities[i]} 
            removeProduct={() => props.removeProduct(i)}
            changeQuantity={(event) => props.changeQuantity(event, i)}/>
            );
        }
        else {
            // totalPrice = totalPrice + parseFloat(product.price)*parseInt(product.stock);
            return (
            <Product 
            key={i} 
            product={product} 
            quantity={product.stock} 
            quantityReduce={true} 
            removeProduct={() => props.removeProduct(i)}
            changeQuantity={(event) => props.changeQuantity(event, i)}/>
            );
        }
    });
    return(
        <div className='table'>
            <div className='t-head'>
                <div className='t-row'>
                    <div className="th-product">Product</div>
                    <div className="th">Price</div> 
                    <div className="th">Quantity</div>
                    <div className="th">Total Cost</div>
                    <div className="th">Remove</div>
                </div>
            </div>
            {products}
            {/*rubric49*/}
            <div className="cost">
                <div>Subtotal: <span>{(props.totalPrice*1).toFixed(2)}$</span></div>
                <div>Tax cost: <span>{(props.totalPrice*0.01).toFixed(2)}$</span></div>
                <div>Shipping: <span>{(shipping*1).toFixed(2)}$</span></div>
                <div className='total'>Total: <span>{(props.totalPrice*1.01 + shipping*1).toFixed(2)}$</span></div>
            </div>
        </div>
    )
};

export default order;
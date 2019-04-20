import React from 'react';
import Product from './Product/Product';
import './Order.css';

const order = (props) => {
    const shipping = 10;
    let totalPrice = 0;
    const products = props.products.map((product, i) => {
        if(product.stock >= props.productsQuantities[i]){
            totalPrice = totalPrice + parseFloat(product.price)*props.productsQuantities[i];
            return <Product key={i} product={product} quantity={props.productsQuantities[i]}/>
        }
        else {
            totalPrice = totalPrice + parseFloat(product.price)*parseFloat(product.stock);
            return <Product key={i} product={product} quantity={product.stock} quantityReduce={true}/>
        }
    });
    console.log(products);
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
            <div className="cost">
                <div>Subtotal: <span>{totalPrice.toFixed(2)}$</span></div>
                <div>Tax cost: <span>{(totalPrice*0.01).toFixed(2)}$</span></div>
                <div>Shipping: <span>{shipping.toFixed(2)}$</span></div>
                <div className='total'>Total: <span>{(totalPrice + totalPrice*0.1 + shipping).toFixed(2)}$</span></div>
            </div>
        </div>
    )
};

export default order;
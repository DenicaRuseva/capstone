import React, {Component} from 'react';
import Order from './Order/Order';
import './Cart.css';

class Cart extends Component {


    render(){
        console.log(this.props.products);
        return (
            <div className="cart">
                <Order products={this.props.products} productsQuantities={this.props.productsQuantities}/>
                <div>form</div>
            </div>
        );
    };
}
   

export default Cart;
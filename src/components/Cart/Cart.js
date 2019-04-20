import React, {Component} from 'react';
import Order from './Order/Order';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import './Cart.css';

class Cart extends Component {

    render(){
        const cart = this.props.products.length > 0 ? (
                <div className="cart">
                      <Order 
                      products={this.props.products} 
                      productsQuantities={this.props.productsQuantities}
                      removeProduct={this.props.removeProduct}
                      changeQuantity={this.props.changeQuantity}/>
                      <div>form</div>
                </div>
              ) : <div>Your cart is empty</div>
        
        return (
            <WithoutRootDiv>{cart}</WithoutRootDiv> 
        );
    };
}
   

export default Cart;
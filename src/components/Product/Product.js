import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../UI/Input/Input';
import ImageContainer from '../Shop/ItemsGallery/Item/ImageContainer/ImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Product.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Product extends Component{
        state = {
                productQuantity: 1
        };

        quantityChangeHandler =(event) => {
                console.log(event.target.value);
                const newQuantity = event.target.value*1;
                this.setState({productQuantity: newQuantity});
        };

        render(){
                let product;
        if(this.props.product){
                product = this.props.product;
        }
        else {
                const productUrl = this.props.location.search.split("=").pop();
                let validUrl = false;
                let productId;
    
                for(let i = 0; i < this.props.allProducts.length; i++) {
                    if (this.props.allProducts[i].name == decodeURI(productUrl)) {
                        validUrl = true;
                        productId = i;
                        i = this.props.allProducts.length;
                    };
                };
    
                if(validUrl){
                        product = productId;
                }
                else {
                    this.props.history.replace('/shopping');
                };   
        };
        
        return (
        <div className="product">
        {/* rubric36 */}
            <div className='product-image-container'>
                <ImageContainer src={this.props.allProducts[product].imagelink} height='600px' alt={this.props.allProducts[product].name}/>
            </div>
            <div className='product-info-container'>
        {/* rubric35 */}
                <h3>{this.props.allProducts[product].name}</h3>
        {/* rubric39 */}
                <div>price: {this.props.allProducts[product].price.toFixed(2)}$</div>
        {/* rubric37 */}
                <div>rating: {(this.props.allProducts[product].rating*1).toFixed(2)}</div>
        {/* rubric38 */}
                <div>instock: {this.props.allProducts[product].stock} pcs</div>
        {/* rubric42 */}                
                <Input elementType='input' elementConfig={{
                    type: 'number',
                    min: 1,
                    max: this.props.allProducts[product].stock,
                    defaultValue: 1
                }} label="Qty:" changed={(event) => this.quantityChangeHandler(event)}/>
        {/* rubric40 */}
                <div>{this.props.allProducts[product].description}</div>
        {/* rubric41, rubric44 */}
                <Button class="add-button" clicked={() => this.props.addProductToCart(product, this.state.productQuantity)}>Add</Button>
        {/* rubric43, rubric45 */}
                <Button class="add-button" clicked={() => this.props.history.goBack()}><FontAwesomeIcon icon='arrow-alt-circle-left'/> Back</Button>
            </div>
        </div>
    );   
};

};

const mapStateToProps = state => {
        return {
                allProducts: state.allProducts
        };
};

export default withRouter(connect(mapStateToProps)(Product));
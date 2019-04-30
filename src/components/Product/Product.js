import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../UI/Input/Input';
import ImageContainer from '../Shop/ItemsGallery/Item/ImageContainer/ImageContainer';
import Spinner from '../UI/Spinner/Spinner';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import './Product.css';


class Product extends Component {
        state = {
                productQuantity: 1,
                productId: '',
                loading: true
        };

        componentDidMount(){
                console.log('in CWM product');
                if(this.props.product){
                        this.setState({productId: this.props.product, loading: false});
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
            
                        if(!validUrl){
                            this.props.history.replace('/shopping');
                        }
                        else {
                                this.setState({productId: productId*1, loading: false});
                        };
                };
        };

        quantityChangeHandler =(event) => {
                const newQuantity = event.target.value*1;
                this.setState({productQuantity: newQuantity});
        };

        render(){
                console.log('in render product')
        const productPage = this.state.loading ? <Spinner/> : (
                <div className="product">
                        {/* rubric36 */}
                        <div className='product-image-container'>
                                <ImageContainer src={this.props.allProducts[this.state.productId].imagelink} height='600px' alt={this.props.allProducts[this.state.productId].name}/>
                        </div>
                        <div className='product-info-container'>
                        {/* rubric35 */}
                                <h3>{this.props.allProducts[this.state.productId].name}</h3>
                        {/* rubric39 */}
                                <div>price: {this.props.allProducts[this.state.productId].price.toFixed(2)}$</div>
                        {/* rubric37 */}
                                <div>rating: {(this.props.allProducts[this.state.productId].rating*1).toFixed(2)}</div>
                        {/* rubric38 */}
                                <div>instock: {this.props.allProducts[this.state.productId].stock} pcs</div>
                        {/* rubric42 */}                
                                <Input elementType='input' elementConfig={{
                                type: 'number',
                                min: 1,
                                max: this.props.allProducts[this.state.productId].stock,
                                defaultValue: 1
                                }} label="Qty:" changed={(event) => this.quantityChangeHandler(event)}/>
                        {/* rubric40 */}
                                <div>{this.props.allProducts[this.state.productId].description}</div>
                        {/* rubric41, rubric44 */}
                                <Button class="add-button" clicked={() => this.props.addProductToCart(this.state.productId, this.state.productQuantity)}>Add</Button>
                        {/* rubric43, rubric45 */}
                                <Button class="add-button" clicked={() => this.props.history.goBack()}><FontAwesomeIcon icon='arrow-alt-circle-left'/> Back</Button>
                        </div>
                </div>
        );
               
        return (
                <WithoutRootDiv>
                        {productPage}
                </WithoutRootDiv>
        ); 
        
        };

};

const mapStateToProps = state => {
        return {
                allProducts: state.allProducts
        };
};

export default connect(mapStateToProps)(Product);
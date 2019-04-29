import React from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ImageContainer from '../../Shop/ItemsGallery/Item/ImageContainer/ImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { withRouter } from 'react-router-dom';
import './Product.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const product = (props) => {
        const productUrl = props.location.search.split("=").pop();
        let productId;
    
                for(let i = 0; i < props.allProducts.length; i++) {
                    if (props.allProducts[i].name == decodeURI(productUrl)) {
                        productId = i;
                        i = props.allProducts.length;
                    };
                };
        return (
        <div className="product">
        {/* rubric36 */}
            <div className='product-image-container'>
                <ImageContainer src={props.allProducts[productId].imagelink} height='600px' alt={props.allProducts[productId].name}/>
            </div>
            <div className='product-info-container'>
        {/* rubric35 */}
                <h3>{props.allProducts[productId].name}</h3>
        {/* rubric39 */}
                <div>price: {props.allProducts[productId].price.toFixed(2)}$</div>
        {/* rubric37 */}
                <div>rating: {(props.allProducts[productId].rating*1).toFixed(2)}</div>
        {/* rubric38 */}
                <div>instock: {props.allProducts[productId].stock} pcs</div>
        {/* rubric42 */}                
                <Input elementType='input' elementConfig={{
                    type: 'number',
                    min: 1,
                    max: props.allProducts[productId].stock,
                    defaultValue: 1
                }} label="Qty:" changed={(event) => props.onQuantityChange(event)}/>
        {/* rubric40 */}
                <div>{props.allProducts[productId].description}</div>
        {/* rubric41, rubric44 */}
                <Button class="add-button" clicked={props.clickOnAddBtn}>Add</Button>
        {/* rubric43, rubric45 */}
                <Button class="add-button" clicked={props.clickOnBackBtn}><FontAwesomeIcon icon='arrow-alt-circle-left'/> Back</Button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
        return {
                allProducts: state.allProducts
        };
};

export default withRouter(connect(mapStateToProps)(product));
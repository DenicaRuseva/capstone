import React from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ImageContainer from '../../Shop/ItemsGallery/Item/ImageContainer/ImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { withRouter } from 'react-router-dom';
import './Product.css';

const product = (props) => {
    return (
        <div className="product">
        {/* rubric36 */}
            <div className='product-image-container'>
                <ImageContainer src={props.product.imagelink} height='600px' alt={props.product.name}/>
            </div>
            <div className='product-info-container'>
        {/* rubric35 */}
                <h3>{props.product.name}</h3>
        {/* rubric39 */}
                <div>price: {props.product.price.toFixed(2)}$</div>
        {/* rubric37 */}
                <div>rating: {(props.product.rating*1).toFixed(2)}</div>
        {/* rubric38 */}
                <div>instock: {props.product.stock} pcs</div>
        {/* rubric42 */}                
                <Input elementType='input' elementConfig={{
                    type: 'number',
                    min: 1,
                    max: props.product.stock,
                    defaultValue: 1
                }} label="Qty:" changed={(event) => props.onQuantityChange(event)}/>
        {/* rubric40 */}
                <div>{props.product.description}</div>
        {/* rubric41, rubric44 */}
                <Button class="add-button" clicked={props.clickOnAddBtn}>Add</Button>
        {/* rubric43, rubric45 */}
                <Button class="add-button" clicked={props.clickOnBackBtn}><FontAwesomeIcon icon='arrow-alt-circle-left'/> Back</Button>
            </div>
        </div>
    );
};

export default product;
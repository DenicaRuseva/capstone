import React from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ImageContainer from '../../Shop/ItemsGallery/Item/ImageContainer/ImageContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Product.css';

const product = (props) => {
    console.log(props.product);
    return (
        <div className="product">
            <div className='product-image-container'>
                <ImageContainer src={props.product.imagelink} height='600px' alt={props.product.name}/>
            </div>
            <div className='product-info-container'>
                <h3>{props.product.name}</h3>
                <div>price: {props.product.price.toFixed(2)}$</div>
                <div>rating: {(props.product.rating*1).toFixed(2)}</div>
                <div>instock: {props.product.stock} pcs</div>
                
                <Input elementType='input' elementConfig={{
                    type: 'number',
                    min: 1,
                    max: props.product.stock,
                    defaultValue: 1
                }} label="Quantity:"/>
                <div>{props.product.description}</div>

                <Button class="add-button">Add</Button>
                <Button class="add-button"><FontAwesomeIcon icon='arrow-alt-circle-left'/> Back</Button>
            </div>
        </div>
    );
};

export default product;
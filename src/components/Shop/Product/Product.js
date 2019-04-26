import React from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const product = (props) => {
    console.log(props.product);
    return (
        <div className="product">
            <div className='product-image-container'>
                <img src={props.product.imagelink} width='100%' height='100%' alt={props.product.name}/>
            </div>
            <div className='product-info-container'>
                <h3>{props.product.name}</h3>
                <div>{props.product.price}</div>
                <div>{props.product.rating}</div>
                <div>{props.product.stock}</div>
                <div>{props.product.descriotion}</div>
                <Input elementType='input' elementConfig={{
                    type: 'number',
                    min: 1,
                    max: props.product.stock,
                    defaultValue: 1
                }}/>
                <Button>Add</Button>
                <Button>Back</Button>
            </div>
        </div>
    );
};

export default product;
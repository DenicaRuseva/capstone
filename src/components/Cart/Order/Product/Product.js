import React from 'react';
import WithoutRootDiv from '../../../../hoc/WithoutRootDiv/WithoutRootDiv';

const product = (props) => (
        <WithoutRootDiv>
            <div className='t-row wrap'>
                {props.quantityReduce ? <div className='quantity-reduce'>Your product quantity is reduce to {props.product.stock} pieces</div> : null}
                <div className="hidden">Product</div>
                <div className='td-image'><img src={props.product.imagelink} alt={props.product.name} height='100px'/></div>
                <div className='td-name'>{props.product.name}</div>
                <div className="hidden">Price</div> 
                <div className='td-price'>{props.product.price.toFixed(2)}$</div>
                <div className="hidden">Quantity</div>
                <div className='td-quantity'><input type="number" name="quantity" min="1" max={props.product.stock} defaultValue={props.quantity}/></div>
                <div className="hidden">Total Cost</div>
                
                <div className='td-total-price-product'>{(parseFloat(props.quantity)*props.product.price).toFixed(2)}$</div>
                <div className="hidden">Remove</div>
                
                <div className='remove-btn'><button>-</button></div>
            </div>
            <div className='border-row'><div className='border'></div></div>
        </WithoutRootDiv>
)

export default product;
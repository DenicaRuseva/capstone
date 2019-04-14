import React from 'react';
import './Item.css';

const item = (props) => (
    <div className='item'>
        <div className='img-container'>
            <img src={props.item.imagelink}/>
        </div>
        <div className='info-container'>
            <p className='info-name'>{props.item.name}</p>
            <p className='info-price'>$ {props.item.price}</p>
            <p className='info-rating'>rating: {props.item.rating}</p>
            <button type='button'>add</button>
        </div>
    </div>
);

export default item;
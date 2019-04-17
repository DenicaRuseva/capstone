import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Item.css';

const item = (props) => (
    <div className='item'>
        <div className='img-container'>
            <img src={props.item.imagelink}/>
        </div>
        <div className='info-container'>
        <div className='info-wrapper'>
            <p className='info-name'>{props.item.name}</p>
            <p className='info-price'>$ {props.item.price.toFixed(2)}</p>
            <p className='button-container'><button className='add-button' type='button' onClick={() => props.clickOnAddBtn(props.item)}>add</button></p> 
            <p className='info-rating'><FontAwesomeIcon className='star' icon='star'/>{props.item.rating}</p>
        </div>
        
        </div>
    </div>
);

export default item;
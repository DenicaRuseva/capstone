import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageContainer from './ImageContainer/ImageContainer';
import Button from '../../../UI/Button/Button';
import { Link } from 'react-router-dom';
import './Item.css';

const item = (props) => (
    <div className='item'>
        <div className='item-img-container'>
            <ImageContainer src={props.item.imagelink} alt={props.item.name} height="126.5px" clicked={props.clickOnImg}/>
        </div>
        {/* <div className='item-img-container'>
            <ImageContainer src={props.item.imagelink} alt={props.item.name} height="126.5px" clicked={props.clickOnImg}/>
        </div> */}
        <div className='info-container'>
        <div className='info-wrapper'>
            <p className='info-name' onClick={props.clickOnImg}>{props.item.name}</p>
            <p className='info-price'>$ {props.item.price.toFixed(2)}</p>
            <p className='button-container'><Button class='add-button' type='button' clicked={() => props.clickOnAddBtn(props.item)}>add</Button></p> 
            <p className='info-rating'><FontAwesomeIcon className='star' icon='star'/>{props.item.rating}</p>
        </div>
        
        </div>
    </div>
);

export default item;
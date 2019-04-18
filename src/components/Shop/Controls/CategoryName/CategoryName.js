import React from 'react';

const categoryName = (props) => (
    <div className='category-name'>
        <div className='content-wrapper'>
            <span>Category:&nbsp;{props.category}</span>
            <div className='number-of-products'>{props.numberOnShownProducts}/{props.numberOfProductsInCategory} products {props.category==='all' ? null : " in category"}</div>
        </div>         
    </div>
);

export default categoryName;
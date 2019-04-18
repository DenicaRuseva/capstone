import React from 'react';

const numberOfProducts = (props) => (
    <div className='number-of-products'>
        <span>{props.numberOnShownProducts} products shown of {props.numberOfProductsInCategory} products {props.category==='all' ? null : " in category"}</span>
    </div>
);

export default numberOfProducts;
import React from 'react';
import CategoryName from './CategoryName/CategoryName';
import Sort from './Sort/Sort';
import InStockCheckbox from './InStockCheckbox/InStockCheckbox';
import NumberOfProducts from './NumberOfProducts/NumberOfProducts';
import './Controls.css';


const controls = (props) => {
    console.log('in controls');
    return(
        <div className="controls-container">
            <div className='controls'>
                <CategoryName category={props.category}/>
                <Sort onSort={props.onSort}/>
                <InStockCheckbox onInStockClick={props.onInStockClick}/>
                <NumberOfProducts 
                    category={props.category}
                    numberOnShownProducts={props.numberOnShownProducts}
                    numberOfProductsInCategory={props.numberOfProductsInCategory}/>
            </div>
        </div>
    );
};

export default controls;
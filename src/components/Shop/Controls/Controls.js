import React from 'react';
import WithoutRootDiv from '../../../hoc//WithoutRootDiv/WithoutRootDiv';
import CategoryName from './CategoryName/CategoryName';
import Sort from './Sort/Sort';
import InStockCheckbox from './InStockCheckbox/InStockCheckbox';
import './Controls.css';


const controls = (props) => {
    console.log('in controls');
    return(
        <WithoutRootDiv>
            <div className='controls'>
                <CategoryName 
                    category={props.category}
                    numberOnShownProducts={props.numberOnShownProducts}
                    numberOfProductsInCategory={props.numberOfProductsInCategory}
                />
                <Sort onSort={props.onSort}/>
                <InStockCheckbox onInStockClick={props.onInStockClick}/>
            </div>
        </WithoutRootDiv>
    );
};

export default controls;
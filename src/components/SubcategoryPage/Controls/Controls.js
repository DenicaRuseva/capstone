import React from 'react';
import WithoutRootDiv from '../../../hoc//WithoutRootDiv/WithoutRootDiv';
import './Controls.css';


const controls = (props) => {
    return(
        <WithoutRootDiv>
            <div className='controls'>
                <div className='category-name'>
                    <div className='content-wrapper'>
                    <span>Category:&nbsp;{props.category}</span>
                    
                    </div>
                    
                </div>
                <label className='sort-label'>
                <div className='content-wrapper'>
                    <span>Sort by:&nbsp;</span>
                    <select onChange={(event) => {event.preventDefault(); props.onSort(event.target.value)}}>
                        <option value='none_none'>none</option>
                        <option value='name_ascending'>name (A-Z)</option>
                        <option value='name_descending'>name (Z-A)</option>
                        <option value='price_ascending'>price (lowest first)</option>
                        <option value='price_descending'>price (highest first)</option>
                        <option value='rating_ascending'>rating (lowest first)</option>
                        <option value='rating_descending'>rating (highest first)</option>
                    </select>  
                </div>                    
                </label>
                <label className='instock-label'>
                <div className='content-wrapper'>
                    <input type="checkbox"/>
                    <span>&nbsp;In stock only</span>
                </div>
                    
                </label>
            </div>
        </WithoutRootDiv>
    );
};

export default controls;
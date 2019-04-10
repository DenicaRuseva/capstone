import React from 'react';

const controls = (props) => {
    return(
        <div>
            <label>Sort by:
              <select onChange={(event) => {event.preventDefault(); event.stopPropagation(); props.onSort(event.target.value)}}>
                <option value='none_none'>none</option>
                <option value='name_ascending'>name (A-Z)</option>
                <option value='name_descending'>name (Z-A)</option>
                <option value='price_ascending'>price (lowest first)</option>
                <option value='price_descending'>price (highest first)</option>
                <option value='rating_ascending'>rating (lowest first)</option>
                <option value='rating_descending'>rating (highest first)</option>
            </select>  
            </label>
            
        </div>
    )
};

export default controls;
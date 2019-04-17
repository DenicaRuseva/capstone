import React, {PureComponent} from 'react';

class Sort  extends PureComponent{
    render(){
        console.log('in sort');
        return(
            <label className='sort-label'>
                <div className='content-wrapper'>
                    <span>Sort by:&nbsp;</span>
                    <select onChange={(event) => {event.preventDefault(); this.props.onSort(event.target.value)}}>
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
        );
    };
};

export default Sort;
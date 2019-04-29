import React, {Component} from 'react';

class Sort extends Component {

    state = {
        options: [
            {
                value: 'none_none',
                innerHtml: 'none'
            },
            {
                value: 'name_ascending',
                innerHtml: 'name (A-Z)'
            }, {
                value: 'name_descending',
                innerHtml: 'name (Z-A)'
            }, {
                value: 'price_ascending',
                innerHtml: 'price (lowest first)'
            }, {
                value: 'price_descending',
                innerHtml: 'price (highest first)'
            }, {
                value: 'rating_ascending',
                innerHtml: 'rating (lowest first)'
            }, {
                value: 'rating_descending',
                innerHtml: 'rating (highest first)'
            }
        ],
        defaultValue: 'none'
    };

    render(){
        const options = this.state.options.map((o, i) => {
           return <option key={i} value={o.value} selected={o.selected}>{o.innerHtml}</option>
        });
        console.log('in sort');
        return(
            <label className='sort-label'>
                <div className='content-wrapper'>
                    <span>Sort by:&nbsp;</span>
                    <select 
                        onChange={(event) => this.props.onSort(event)} value={this.props.selectValue}>
                        {options}
                    </select>  
                </div>                    
            </label>
        );
    };
};

export default Sort;
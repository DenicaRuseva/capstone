import React, {PureComponent} from 'react';

class InStockCheckbox extends PureComponent {
    render(){
        console.log('in instock');
    return (
        <label className='instock-label'>
            <div className='content-wrapper'>
                <input type="checkbox" onClick={this.props.onInStockClick}/>
                <span>&nbsp;In stock only</span>
            </div>
        </label>
    );
    }
};

export default InStockCheckbox;
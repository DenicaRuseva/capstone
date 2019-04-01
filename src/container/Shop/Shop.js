import React, { Component } from 'react';
import ShopSideBar from '../../components/ShopSideBar/ShopSideBar';

class Shop extends Component {

    componentDidMount(){
        console.log('in cdm Shop');
    };

    render(){
        console.log('in render shop');
        console.log(this.props);
        return (
            <div>
                <ShopSideBar categories={['a', 'b', 'c', 'd']}/>
                <div>img gallery</div>
            </div>
        )
    };
};

export default Shop;
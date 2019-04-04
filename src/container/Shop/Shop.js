import React, { Component } from 'react';
import ShopSideBar  from '../../components/ShopSideBar/ShopSideBar';
import ShopGallery from '../../components/ShopGallery/ShopGallery';
import { connect } from 'react-redux';

// const ShopSideBar = require('../../components/ShopSideBar/ShopSideBar').default;
// const ShopGallery = require('../../components/ShopGallery/ShopGallery').default;


class Shop extends Component {

    componentDidMount(){
        console.log('in cdm Shop');
    };

    toggleClassShow = (event) => {
       event.target.classList.toggle('show-subcat');

    };

    render(){
        
        console.log('in render shop');
        console.log(this.props);

        const shop = this.props.loadingShop ? <div>spinner</div> : (
            <div>
                <ShopSideBar 
                    categoriesAndSubcat={this.props.categoriesAndSubcat}
                    toggleClassShow={this.toggleClassShow}/>
                <ShopGallery itemsToShow={this.props.allProducts}/>
            </div>
        )
        return (
            <div>{shop}</div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loadingShop,
        allProducts: state.allProducts,
        categoriesAndSubcat: state.categoriesAndSubcat,
        subcategories: state.subcategories,
        shopRoutes: state.shopRoutes
    }
}

export default connect(mapStateToProps)(Shop);
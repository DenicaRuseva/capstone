import React, { Component } from 'react';
import ShopSideBar  from '../../components/ShopSideBar/ShopSideBar';
import ShopGallery from '../../components/ShopGallery/ShopGallery';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// const ShopSideBar = require('../../components/ShopSideBar/ShopSideBar').default;
// const ShopGallery = require('../../components/ShopGallery/ShopGallery').default;


class Shop extends Component {

    componentDidMount(){
        console.log('in cdm Shop');
    };

    render(){
        console.log('in render shop');
        console.log(this.props);
        const shop = this.props.loading ? <div>spinner</div> : 
            (
                <div>
                    <ShopSideBar categoriesAndSubcat={this.props.categoriesAndSubcat} match={this.props.match}/>
                    <ShopGallery 
                        currentCategory={this.props.match.params.category}
                        currentSubcategory={this.props.match.params.subcategory}/>
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
        subcategories: state.subcategories
    }
}

export default connect(mapStateToProps)(Shop);
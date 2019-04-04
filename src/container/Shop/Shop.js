import React, { Component } from 'react';
import ShopSideBar  from '../../components/ShopSideBar/ShopSideBar';
import ShopGallery from '../../components/ShopGallery/ShopGallery';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

// const ShopSideBar = require('../../components/ShopSideBar/ShopSideBar').default;
// const ShopGallery = require('../../components/ShopGallery/ShopGallery').default;


class Shop extends Component {

    componentDidMount(){
        console.log('in cdm Shop');
    };

    render(){
        
        console.log('in render shop');
        console.log(this.props);

        const shop = this.props.loadingShop ? <div>spinner</div> : (
            <div>
                <ShopSideBar categoriesAndSubcat={this.props.categoriesAndSubcat}/>
                <Switch>
                    <Route path="/shop/:category/:subcategory" component={ShopGallery}/>
                    <Route path="/shop/:category" component={ShopGallery}/>
                    <Route path="/shop" component={ShopGallery}/>
                </Switch>
                
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
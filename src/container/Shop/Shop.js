import React, { Component } from 'react';
import ShopSideBar  from '../../components/ShopSideBar/ShopSideBar';
import SubategoriesGallery from '../../components/ShopGalleries/SubcategoriesGallery/SubcategoriesGallery';
import { connect } from 'react-redux';
import ItemsGallery from '../../components/ShopGalleries/ItemsGallery/ItemsGallery';

// const ShopSideBar = require('../../components/ShopSideBar/ShopSideBar').default;
// const ShopGallery = require('../../components/ShopGallery/ShopGallery').default;


class Shop extends Component {

    state = {
        currentCategory: 'all',
        currentSubcategory: 'all'
    }

    componentDidMount(){
        console.log('in cdm Shop');
    };

    toggleClassShow = (event) => {
       event.target.classList.toggle('show-subcat');

    };

    render(){
        
        console.log('in render shop');
        console.log(this.props);
        const shop = this.props.loading ? <div>spinner</div> : (
            <div>
                <ShopSideBar 
                    categoriesAndSubcat={this.props.categoriesAndSubcat}
                    toggleClassShow={this.toggleClassShow}/>
                <SubategoriesGallery 
                    currentCategory={this.state.currentCategory}/>
                <ItemsGallery currentCategory={this.state.currentCategory}/>
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
        categoriesAndSubcat: state.categoriesAndSubcat,
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    }
}

export default connect(mapStateToProps)(Shop);
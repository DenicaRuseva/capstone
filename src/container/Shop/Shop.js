import React, { Component } from 'react';
import ShopSideBar  from '../../components/ShopSideBar/ShopSideBar';
import ShopGallery from '../../components/ShopGallery/ShopGallery';
import { connect } from 'react-redux';

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

        const shop = this.props.loadingShop ? <div>spinner</div> : (
            <div>
                <ShopSideBar 
                    categoriesAndSubcat={this.props.categoriesAndSubcat}
                    toggleClassShow={this.toggleClassShow}/>
                <ShopGallery 
                    category={this.state.currentCategory}
                    subcategory={this.state.currentSubcategory}/> 
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
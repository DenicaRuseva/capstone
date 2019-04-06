import React, { Component } from 'react';
import ShopSideBar  from '../../components/ShopSideBar/ShopSideBar';
import SubcategoriesGallery from '../../components/ShopGalleries/SubcategoriesGallery/SubcategoriesGallery';
import { connect } from 'react-redux';
import ItemsGallery from '../../components/ShopGalleries/ItemsGallery/ItemsGallery';
import './Shop.css';


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
        const shop = this.props.loading ? <div>spinner</div> : (
            <div className='grid-container shop'>
                <div className='row categories-side-bar-container'>
                    <div className='desktop-only col-s-3-12 categories-section'>
                        <ShopSideBar 
                            categoriesAndSubcat={this.props.categoriesAndSubcat}
                            toggleClassShow={this.toggleClassShow}/>
                    </div>
                    <div className='col-s-9-12 subcategories-section'>
                        <SubcategoriesGallery 
                            currentCategory={this.state.currentCategory}/>
                    </div>
                </div>
                <div className='row'>
                    <ItemsGallery currentCategory={this.state.currentCategory}/>
                </div>
                
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
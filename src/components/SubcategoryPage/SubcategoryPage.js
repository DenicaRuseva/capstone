import React from 'react';
import ItemsGallery from './ItemsGallery/ItemsGallery';
import ShopSideBar from '../CategoriesPage/ShopSideBar/ShopSideBar';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const subcategoryPage = (props) => {
    const categoriesAndSubcat=[...Array({
        category: props.match.params.category,
        subcategories: [...props.categoriesByIds[props.match.params.category].all]
    })];
    console.log(categoriesAndSubcat);

    return(
    <div>
        <div>controls</div>
        <div>
            <ShopSideBar categoriesAndSubcat={categoriesAndSubcat}/>
            <ItemsGallery/>
        </div>
    </div>
);
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds
    };
};

export default withRouter(connect(mapStateToProps)(subcategoryPage));
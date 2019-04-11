import React from 'react';
import ItemsGallery from './ItemsGallery/ItemsGallery';
import ShopSideBar from '../CategoriesPage/ShopSideBar/ShopSideBar';
import Controls from './Controls/Controls';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const subcategoryPage = (props) => {
    console.log(props);
    const categoriesAndSubcat=[...Array({
        category: props.match.params.category,
        subcategories: [...props.categoriesByIds[props.match.params.category].all]
    })];
 

    return(
    <div>
        <Controls onSort={props.onSort} category={props.match.params.category}/>
        <div>
            <ShopSideBar 
                categoriesAndSubcat={categoriesAndSubcat}
                clickOnCategory={props.clickOnCategory}/>
            <ItemsGallery sort={props.sort} onUnmount={props.onUnmount}/>
        </div>
    </div>
);
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds,
        categoriesAndSubcat: state.categoriesAndSubcat
    };
};

export default withRouter(connect(mapStateToProps)(subcategoryPage));
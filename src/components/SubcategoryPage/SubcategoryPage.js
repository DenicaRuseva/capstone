import React from 'react';
import ItemsGallery from './ItemsGallery/ItemsGallery';
import ShopSideBar from './ShopSideBar/ShopSideBar';
import Controls from './Controls/Controls';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import './SubcategoryPage.css';

const subcategoryPage = (props) => {
    console.log(props);
   
 

    return(
    <WithoutRootDiv>
                <div className='hide-on-sm controls-container'>
                    <Controls onSort={props.onSort} category={props.match.params.category ? props.match.params.category : "All"}/>
                </div>
                    <ShopSideBar 
                    categoriesAndSubcat={props.categoriesAndSubcat}
                    clickOnCategory={props.clickOnCategory}
                    showCategories={props.showCategories}/>
                <div className="sm-only controls-container">
                    <Controls onSort={props.onSort} category={props.match.params.category ? props.match.params.category : "All"}/>
                </div>
                <ItemsGallery sort={props.sort} onUnmount={props.onUnmount}/>
              


        
        
            
    </WithoutRootDiv>
);
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds,
        categoriesAndSubcat: state.categoriesAndSubcat
    };
};

export default withRouter(connect(mapStateToProps)(subcategoryPage));
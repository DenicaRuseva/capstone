import React from 'react';
import ItemsGallery from './ItemsGallery/ItemsGallery';
import ShopSideBar from './ShopSideBar/ShopSideBar';
import Controls from './Controls/Controls';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import { connect } from 'react-redux';
import './SubcategoryPage.css';

const subcategoryPage = (props) => {
    console.log(props);
   
 

    return(
    <WithoutRootDiv>
                <div className='hide-on-sm controls-container'>
                    <Controls 
                    onSort={props.onSort} 
                    // category={props.match.params.category ? props.match.params.category : "All"}
                    category={props.currentCategory}
                    onInStockClick={props.onInStockClick}
                    numberOfItemsShown={0}
                    numberOfItemsInCategory={0}/>
                </div>
                    <ShopSideBar 
                    categoriesAndSubcat={props.categoriesAndSubcat}
                    clickOnCategory={props.clickOnCategory}
                    showCategories={props.showCategories}
                    hideCategoryMenu={props.hideCategoryMenu}
                    clickOnSubcategory={props.clickOnSubcategory}/>
                <div className="sm-only controls-container">
                    <Controls 
                    onSort={props.onSort} 
                    // category={props.match.params.category ? props.match.params.category : "All"}
                    category={props.currentCategory}
                    onInStockClick={props.onInStockClick}
                    numberOfItemsShown={0}
                    numberOfItemsInCategory={0}/>
                </div>
                <ItemsGallery 
                    sort={props.sort} 
                    onUnmount={props.onUnmount}
                    showInStockOnly={props.showInStockOnly}
                    currentCategory={props.currentCategory}
                    currentSubcategory={props.currentSubcategory}/>
              


        
        
            
    </WithoutRootDiv>
);
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds,
        categoriesAndSubcat: state.categoriesAndSubcat
    };
};

export default connect(mapStateToProps)(subcategoryPage);
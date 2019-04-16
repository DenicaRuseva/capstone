import React from 'react';
import ItemsGallery from './ItemsGallery/ItemsGallery';
import ShopSideBar from './ShopSideBar/ShopSideBar';
import Controls from './Controls/Controls';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import './SubcategoryPage.css';

const subcategoryPage = (props) => {
   
 

    return(
            <WithoutRootDiv>
                <div className='hide-on-sm controls-container'>
                    <Controls 
                        onSort={props.onSort} 
                        category={props.currentCategory}
                        onInStockClick={props.onInStockClick}
                        numberOfProductsInCategory={props.numberOfProductsInCategory}
                        numberOnShownProducts={props.numberOnShownProducts}/>
                </div>
                    <ShopSideBar
                        clickOnCategory={props.clickOnCategory}
                        toggleCategoryMenu={props.toggleCategoryMenu}
                        shownCategoryMenu={props.shownCategoryMenu}
                        clickOnSubcategory={props.clickOnSubcategory}/>
                <div className="sm-only controls-container">
                    <Controls 
                        onSort={props.onSort} 
                        category={props.currentCategory}
                        onInStockClick={props.onInStockClick}
                        numberOfProductsInCategory={props.numberOfProductsInCategory}
                        numberOnShownProducts={props.numberOnShownProducts}/>
                </div>
                <ItemsGallery 
                    onUnmount={props.onUnmount}
                    productsToShow={props.productsToShow}/> 
            </WithoutRootDiv>
    );
};


export default subcategoryPage;
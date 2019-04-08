import React from 'react';
import ShopSideBar from './ShopSideBar/ShopSideBar';
import SubcategoriesGallery from './SubcategoriesGallery/SubcategoriesGallery';

const categoriesPage = (props) => {
    console.log(props);
    return(
        <div className='grid-container shop'>
        <div className='row categories-side-bar-container'>
            <div className='desktop-only col-s-3-12 categories-section'>
                <ShopSideBar 
                    categoriesAndSubcat={props.categoriesAndSubcat}
                    clickOnCategory={props.clickOnCategory}
                    clickOnSubcategory={props.clickOnSubcategory}/>
            </div>
            <div className='col-s-9-12 subcategories-section'>
                <SubcategoriesGallery 
                clickOnSubcategory={props.clickOnSubcategory}/>
            </div>
        </div>    
    </div>)
};


export default categoriesPage;






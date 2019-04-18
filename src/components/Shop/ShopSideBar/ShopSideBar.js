import React from 'react';
import CategoryButtons from './CategoryButtons/CategoryButtons';
// import { connect } from 'react-redux';
import './ShopSideBar.css';

const shopSideBar = (props) => {
    // let categoriesAndSubcategories = props.categoriesAndSubcat.map( (key, i) => {
    //     return (
    //             <CategoryButton 
    //                 key={key+i}
    //                 categoryAndSubcat = {props.categoriesAndSubcat[i]} 
    //                 clickOnCategory={props.clickOnCategory}
    //                 clickOnSubcategory={props.clickOnSubcategory}
    //                 hideCategoryMenu={props.hideCategoryMenu}/>
    //     )
    // });

    const attachedClasses = props.shownCategoryMenu ? ['side-bar-wrapper show-categories'] : ['side-bar-wrapper'];
    console.log('in shop side bar');
    return (
        <div className={attachedClasses}>
            <div className='hide-on-sm'> 
                <p className='text'>Shop by category:</p>
            </div>
                <div className='sm-only text' onClick={() => props.toggleCategoryMenu()}>Shop by category:</div>
                <div className='side-bar-container'>
                    <div className='side-bar'> 
                        <CategoryButtons
                        clickOnCategory={props.clickOnCategory}
                        clickOnSubcategory={props.clickOnSubcategory}
                        hideCategoryMenu={props.hideCategoryMenu}
                        currentCategory={props.currentCategory}
                        clickedCategories={props.clickedCategories}/>
                    </div>
                </div>
        </div>
    );
};

// const mapStateToProps = state => {
//     return {
//         categoriesAndSubcat: state.categoriesAndSubcat
//     };
// };

export default shopSideBar;
import React from 'react';
import CategoryButton from './CategoryButton/CattegoryButton';
import './ShopSideBar.css';

const shopSideBar = (props) => {
    console.log(props);
    let categoriesAndSubcategories = props.categoriesAndSubcat.map( (key, i) => {
        return (
                <CategoryButton 
                    key={key+i}
                    categoryAndSubcat = {props.categoriesAndSubcat[i]} 
                    clickOnCategory={props.clickOnCategory}
                    hideCategoryMenu={props.hideCategoryMenu}/>
        )
    });

    // categoriesAndSubcategories = categoriesAndSubcategories.concat(categoriesAndSubcategories.slice(0,1));
    // const test = categoriesAndSubcategories.length % 4;
    // console.log(test);
    // // let height;
    // let freeSpace;
    // if(test !== 0){
    //     // height = ~~(categoriesAndSubcategories.length/4)*200 + 250;
    //     // height = categoriesAndSubcategories.length * 50;
    //     freeSpace = (4 - test)*50;
    // };
    // // const freeSpace = test*50;
    // // const freeSpace = height % 4 + 50;
    // // const style = {
    // //     minHeight: height
    // // };

    // const style2 = {
    //     paddingBottom: freeSpace 
    // }

    // const style2 = {
    //     height: freeSpace/2 + 50
    // }

    // const style2 = {
    //     position: "relative",
    //     marginTop: freeSpace/2
    // }


    return (
        <div id='side-bar-wrapper' className='side-bar-wrapper'>
            <div className='hide-on-sm'> 
                <p className='text'>Shop by category:</p>
            </div>
                <div className='sm-only text' onClick={(event) => props.showCategories(event)}>Shop by category:</div>
                <div className='side-bar-container'>
                    <div className='side-bar'> 
                        {categoriesAndSubcategories}
                    </div>
                </div> 
        
           
            
           
        </div>
    );
};

export default shopSideBar;
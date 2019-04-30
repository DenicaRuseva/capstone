import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './CategoryButton.css';



const categoryButton = (props) => {
    console.log("in category button");

    //rubric25
    let categoryListitemClasses = ['category-list-item'];
    if(props.currentCategory === props.categoryAndSubcat.category){
        categoryListitemClasses.push('active');
    };
    if(props.clickedCategories[props.categoryId]){
        categoryListitemClasses.push('show-subcat');
    };


    const subcategories = props.categoryAndSubcat.subcategories.map((subcat, i) => {
        return (
            <li 
            className='subcategory-list-item' 
            key={subcat+i} 
            onClick={(event) => {event.stopPropagation(); props.clickOnSubcategory(props.categoryAndSubcat.category, subcat)}}>
                <NavLink 
                    to={'/shopping/' + props.categoryAndSubcat.category + '/' + subcat}>
                    <span>{subcat}</span>
                </NavLink> 
        </li>
        );
    });
    return (
            <ul className='category-list'>
                <li className={categoryListitemClasses.join(' ')} onClick={(event) => {props.clickOnCategory(props.categoryId, props.categoryAndSubcat.category, event)}}>
                        <span>{props.categoryAndSubcat.category}</span>
                        <ul className='subcategory-list'>{subcategories}</ul>
                </li>
            </ul>  
    );
};

export default withRouter(categoryButton);
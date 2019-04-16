import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './CategoryButton.css';



const categoryButton = (props) => {
    console.log(props);

    let categoryListitemClasses = ['category-list-item'];
    if(props.match.params.category === props.categoryAndSubcat.category){
        categoryListitemClasses.push('show-subcat');
    }
    const subcategories = props.categoryAndSubcat.subcategories.map((subcat, i) => {
        return (
            <li 
                className='subcategory-list-item' 
                key={subcat+i} 
                onClick={(event) => {event.stopPropagation(); props.clickOnSubcategory(subcat)}}>
                    <NavLink 
                    to={'/shop/' + props.categoryAndSubcat.category + '/' + subcat}
                    onClick={
                        (event) => {
                            event.stopPropagation();
                            props.hideCategoryMenu(event.target);
                            props.clickOnSubcategory(subcat);
                        }
                        }>
                    <span onClick={
                        (event) => {
                            props.hideCategoryMenu(event.target.parentElement);
                            props.clickOnSubcategory(subcat);
                        }
                    }>{subcat}</span>
                    </NavLink> 
            </li>
        );
    });
    return (
        <ul className='category-list'>
                <li className={categoryListitemClasses.join(' ')} onClick={(event) => props.clickOnCategory(event, props.categoryAndSubcat.category)}>
                        <span>{props.categoryAndSubcat.category}</span>
                    <ul className='subcategory-list'>{subcategories}</ul>
                </li>

        </ul>
    )
}

export default withRouter(categoryButton);
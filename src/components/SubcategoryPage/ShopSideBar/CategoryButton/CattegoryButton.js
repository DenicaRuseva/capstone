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
            <li className='subcategory-list-item' key={subcat+i} onClick={(event) => event.stopPropagation()}>
                <NavLink 
                to={'/shop/' + props.categoryAndSubcat.category + '/' + subcat}
                onClick={(event) => event.stopPropagation()}><span>{subcat}</span></NavLink> 
            </li>
        );
    });
    return (
        <ul className='category-list'>
                <li className={categoryListitemClasses.join(' ')} onClick={(event) => props.clickOnCategory(event, props.categoryAndSubcat.category, props.match.params.category)}>
                        <span>{props.categoryAndSubcat.category}</span>
                    <ul className='subcategory-list'>{subcategories}</ul>
                </li>

        </ul>
    )
}

export default withRouter(categoryButton);
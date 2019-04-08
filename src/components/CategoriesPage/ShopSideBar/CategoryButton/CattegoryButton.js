import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './CategoryButton.css';



const categoryButton = (props) => {
    console.log(props);

    const subcategories = props.categoryAndSubcat.subcategories.map((subcat, i) => {
        return (
            <li className='subcategory-list-item' key={subcat+i}>
                <Link 
                to={'/shop/' + props.categoryAndSubcat.category + '/' + subcat}
                onClick={(event) => event.stopPropagation()}>{subcat}</Link> 
            </li>
        );
    });
    return (
        <ul className='category-list'>
                <li className='category-list-item' onClick={(event) => props.clickOnCategory(event, props.categoryAndSubcat.category, props.match.params.category)}>
                    {/* <Link to={'/shop/' + props.categoryAndSubcat.category} onClick={(event) => props.clickOnCategory(event, props.categoryAndSubcat.category)}> */}
                        {props.categoryAndSubcat.category}
                    {/* </Link>  */}
                    <ul className='subcategory-list'>{subcategories}</ul>
                </li>

        </ul>
    )
}

export default withRouter(categoryButton);
import React from 'react';
import './CategoryButton.css';



const categoryButton = (props) => {
    console.log(props);

    const subcategories = props.categoryAndSubcat.subcategories.map((subcat, i) => {
        return (
            <li key={subcat+i}>
                    {subcat}
            </li>
        );
    });
    return (
        <ul className='category-list'>
            <li onClick={(event) => props.clicked(event)}>
                {props.categoryAndSubcat.category}
                <ul className='subcategory-list'>{subcategories}</ul>
            </li>
        </ul>
    )
}

export default categoryButton;
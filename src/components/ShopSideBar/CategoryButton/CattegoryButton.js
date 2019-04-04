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
        <ul>
            <li onClick={(event) => props.clicked(event)}>
                {props.categoryAndSubcat.category}
                <ul>{subcategories}</ul>
            </li>
        </ul>
    )
}

export default categoryButton;
import React from 'react';

const categoryButton = (props) => {
    console.log(props.categoryAndSubcat);
    const subcategories = props.categoryAndSubcat.subcategories.map((subcat, i) => {
        return <li key={subcat+i}>{subcat}</li>
    });
    return (
        <ul>
            <li>{props.categoryAndSubcat.category}
                <ul>{subcategories}</ul>
            </li>
        </ul>
    )
}

export default categoryButton;
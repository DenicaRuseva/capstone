import React from 'react';
import { NavLink, Route } from 'react-router-dom';



const categoryButton = (props) => {
    console.log(props);

    const subcategories = props.categoryAndSubcat.subcategories.map((subcat, i) => {
        return (
            <li key={subcat+i}>
                <NavLink 
                    to={`/shop/${props.categoryAndSubcat.category}/${subcat}`}>
                    {subcat}
                </NavLink>
            </li>
        );
    });
    return (
        <ul>
            <li>
                <NavLink 
                to={`/shop/${props.categoryAndSubcat.category}`}>
                    {props.categoryAndSubcat.category}
                </NavLink>
                <Route  path={`/shop/${props.categoryAndSubcat.category}/`}
                render={() => <ul>{subcategories}</ul>}/>
            </li>
        </ul>
    )
}

export default categoryButton;
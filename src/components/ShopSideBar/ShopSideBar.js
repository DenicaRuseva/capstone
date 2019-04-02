import React from 'react';
import CategoryButton from './CategoryButton/CattegoryButton';

const shopSideBar = (props) => {
    const categories = props.categories.map( (category, i) => {
        return <CategoryButton key={i} clicked={() => alert('click')}>{category.category}</CategoryButton>
    });

    return (
        <div>{categories}</div>
    );



};

export default shopSideBar;
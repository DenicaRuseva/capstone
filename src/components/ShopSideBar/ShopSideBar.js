import React from 'react';
import CategoryButton from './CategoryButton/CattegoryButton';

const shopSideBar = (props) => {
    console.log(props.categoriesAndSubcat);
    const categoriesAndSubcat = props.categoriesAndSubcat.map( (key, i) => {
        return <CategoryButton 
            key={key+i}
            categoryAndSubcat = {props.categoriesAndSubcat[i]} 
            clicked={() => alert('click')}/>
    });

    return (
        <div>{categoriesAndSubcat}</div>
    );



};

export default shopSideBar;
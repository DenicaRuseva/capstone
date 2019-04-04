import React from 'react';
import CategoryButton from './CategoryButton/CattegoryButton';
import { connect } from 'react-redux';

const shopSideBar = (props) => {
    console.log(props);
    const categoriesAndSubcategories = props.categoriesAndSubcat.map( (key, i) => {
        return (
                <CategoryButton 
                    key={key+i}
                    categoryAndSubcat = {props.categoriesAndSubcat[i]} 
                    clicked={props.toggleClassShow}/>
        )
    });

    return (
        <div>{categoriesAndSubcategories}</div>
    );



};

const mapStateToProps = state => {
    return {
        categoriesAndSubcat: state.categoriesAndSubcat
    };
};

export default connect(mapStateToProps)(shopSideBar);


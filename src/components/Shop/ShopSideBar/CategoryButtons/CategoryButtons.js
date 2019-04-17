import React from 'react';
import WithoutRootDiv from '../../../../hoc/WithoutRootDiv/WithoutRootDiv';
import CategoryButton from '../CategoryButton/CattegoryButton';
import {connect} from 'react-redux';

const categoryButtons = (props) => {
    console.log('in categories buttons');
    let categoriesAndSubcategories = props.categoriesAndSubcat.map( (key, i) => {
        return (
                <CategoryButton 
                key={key+i}
                categoryAndSubcat = {props.categoriesAndSubcat[i]} 
                clickOnCategory={props.clickOnCategory}
                clickOnSubcategory={props.clickOnSubcategory}
                hideCategoryMenu={props.hideCategoryMenu}/>
        );
    });
    return (
        <WithoutRootDiv>{categoriesAndSubcategories}</WithoutRootDiv>
    );
};

const mapStateToProps = state => {
    return {
        categoriesAndSubcat: state.categoriesAndSubcat
    };
};

export default connect(mapStateToProps)(categoryButtons);
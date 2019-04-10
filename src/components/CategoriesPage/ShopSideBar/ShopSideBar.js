import React from 'react';
import CategoryButton from './CategoryButton/CattegoryButton';
// import { connect } from 'react-redux';
import './ShopSideBar.css';

const shopSideBar = (props) => {
    console.log(props);
    const categoriesAndSubcategories = props.categoriesAndSubcat.map( (key, i) => {
        return (
                <CategoryButton 
                    key={key+i}
                    categoryAndSubcat = {props.categoriesAndSubcat[i]} 
                    clickOnCategory={props.clickOnCategory}/>
        )
    });

    return (
        <div className='side-bar'>
            {categoriesAndSubcategories}
        </div>
    );



};

// const mapStateToProps = state => {
//     return {
//         categoriesAndSubcat: state.categoriesAndSubcat
//     };
// };

// export default connect(mapStateToProps)(shopSideBar);

export default shopSideBar;


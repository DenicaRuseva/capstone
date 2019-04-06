import React from 'react';
import { connect } from 'react-redux';
import Subcategory from './Subcategory/Subcategory';
import './SubcategoriesGallery.css';

const subcategoriesGallery = (props) => {
    let items = props.categoriesByIds[props.currentCategory].all.map(subcategory => {
        try {
           return {
                name: subcategory,
                imagelink: props.subcategoriesByIds[subcategory][0][0].imagelink
            }; 
        }
        catch {
            return {
                name: subcategory,
                imagelink: false
            };
        }; 
    });

    items = items.map((item, i) => {
        return <Subcategory key={i} item={item}/>
    });

    return (
        <div className='grid-container flex-container'>
            {items}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    };
};

export default connect(mapStateToProps)(subcategoriesGallery);
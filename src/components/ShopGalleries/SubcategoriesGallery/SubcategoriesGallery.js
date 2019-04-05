import React from 'react';
import WithoutRootDiv from '../../../hoc/WithoutRootDiv/WithoutRootDiv';
import { connect } from 'react-redux';
import ShopGalleryItem from '../ShopGalleryItem/ShopGalleryItem';

const subcategoriesGallery = (props) => {
    let items = props.currentCategory !== 'all' ? props.categoriesByIds[props.currentCategory].all : props.categoriesByIds.all.all;
    items = items.map(subcategory => {
        try {
           return {
                name: subcategory,
                imagelink: props.subcategoriesByIds[subcategory][0][0].imagelink
            }; 
        }
        catch {
            return {
                name: subcategory,
                imageSrc: false
            };
        }; 
    });
    items = items.map((item, i) => {
        return <ShopGalleryItem item={item}/>
    })
    return <div>{items}</div>
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    };
};

export default connect(mapStateToProps)(subcategoriesGallery);
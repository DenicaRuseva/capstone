import React from 'react';
import ShopGalleryItem from './ShopGalleryItem/ShopGalleryItem';
import { connect } from 'react-redux';

const shopGallery = (props) => {
    console.log(props.categoriesByIds[props.category][props.subcategory]);
    const items = props.categoriesByIds[props.category][props.subcategory].map( el => {
        return props.subcategoriesByIds[el].map((arr) => {
           
            return arr.map((item, i) => {
                console.log(item);
                return <ShopGalleryItem key={item+i} item={item}/>
            })
            
        })
    });
    console.log(items);


    return(
        <div>{items}</div>
    );
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds
    };
};

export default connect(mapStateToProps)(shopGallery);
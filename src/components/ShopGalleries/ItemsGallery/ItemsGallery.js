import React from 'react';
import ShopGalleryItem from '../ShopGalleryItem/ShopGalleryItem';
import { connect } from 'react-redux';


const itemsGallery = (props) => {
    let items = props.categoriesByIds[props.currentCategory].all.map(subcategory => {
        return props.subcategoriesByIds[subcategory][0].map((item, i) => {
            return <ShopGalleryItem key={item.name+i} item={item}/>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    },[]);  
   
    
    console.log(items)

    return <div>{items}</div>
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    }
}

export default connect(mapStateToProps)(itemsGallery);
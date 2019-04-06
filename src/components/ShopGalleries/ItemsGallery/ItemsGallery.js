import React from 'react';
import Item from './Item/Item';
import { connect } from 'react-redux';


const itemsGallery = (props) => {
    let items = props.categoriesByIds[props.currentCategory].all.map(subcategory => {
        return props.subcategoriesByIds[subcategory][0].map((item, i) => {
            return <Item key={item.name+i} item={item}/>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    },[]);  
   
    
    console.log(items)

    return <div className='grid-container flex-container'>{items}</div>
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    }
}

export default connect(mapStateToProps)(itemsGallery);
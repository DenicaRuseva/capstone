import React from 'react';
import Item from './Item/Item';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';


const itemsGallery = (props) => {
    // console.log(props.currentCategory);
    const currentCategory = props.match.params.category ? props.match.params.category : 'all';
    const currentSubcategory = props.match.params.subcategory ? props.match.params.subcategory : 'all';

    let items = props.categoriesByIds[currentCategory][currentSubcategory].map(subcategory => {
        return props.subcategoriesByIds[subcategory][0].map((item, i) => {
            return <Item key={item.name+i} item={item}/>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    },[]);  
   
    
    if(!items[0]){
        items = <div>No items to show</div>;
    };

    return <div className='grid-container flex-container'>{items}</div>
};

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    }
}

export default withRouter(connect(mapStateToProps)(itemsGallery));
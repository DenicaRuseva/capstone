import React from 'react';
import Item from './Item/Item';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';


const itemsGallery = (props) => {
    // console.log(props.currentCategory);
    const currentCategory = props.match.params.category ? props.match.params.category : 'all';
    const currentSubcategory = props.match.params.subcategory ? props.match.params.subcategory : 'all';

    // let items = props.categoriesByIds[currentCategory][currentSubcategory].map(subcategory => {
    //     return props.subcategoriesByIds[subcategory][0].map((item, i) => {
    //         return <Item key={item.name+i} item={item}/>;
    //     })
    // }).reduce((arr, el) => {
    //     return arr.concat(el);
    // },[]);  

    let items = props.categoriesByIds[currentCategory][currentSubcategory].map(subcategory => {
        return props.subcategoriesByIds[subcategory][0].map((item, i) => {
            return item;
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    },[]);

    console.log(items);
   
    
    if(!items[0]){
        items = <div>No items to show</div>;
    }
    else {
        switch(props.sort.sortBy){
            case 'none': break;
            case 'name': items = sortAlphabetical(items, props.sort.order); break;
            case 'price': items = sortNumbers(items, props.sort.sortBy, props.sort.order); break;
            case 'rating': items = sortNumbers(items, props.sort.sortBy, props.sort.order); break;
        };
        items = items.map((item, i) => {
        return <Item key={item.name+i} item={item}/>;
    });
    };
    

    

    
    console.log(items);


    return <div className='grid-container flex-container'>{items}</div>
};

const sortAlphabetical = (items, order) => {
    items.sort((a, b) => {
        console.log(a);
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
    });
    if(order === 'descending'){
        items = items.reverse(); 
    }
    return items;
};

const sortNumbers = (items, criteria, order) => {
    items.sort((a, b) => {
        return a[criteria] - b[criteria];
    });
    if(order === 'descending'){
        items = items.reverse(); 
    }
    return items;
};


const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    }
};

export default withRouter(connect(mapStateToProps)(itemsGallery));
import React, {Component} from 'react';
import Item from './Item/Item';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';


class ItemsGallery extends Component {
   

    componentWillUnmount(){
        this.props.onUnmount();
    }

    sortAlphabetical = (items, order) => {
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
    
    sortNumbers = (items, criteria, order) => {
        items.sort((a, b) => {
            return a[criteria] - b[criteria];
        });
        if(order === 'descending'){
            items = items.reverse(); 
        }
        return items;
    };


    render(){
        console.log(this.props);
    const currentCategory = this.props.match.params.category ? this.props.match.params.category : 'all';
    const currentSubcategory = this.props.match.params.subcategory ? this.props.match.params.subcategory : 'all';

    let items = this.props.categoriesByIds[currentCategory][currentSubcategory].map(subcategory => {
        return this.props.subcategoriesByIds[subcategory][0].map((item, i) => {
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
        switch(this.props.sort.sortBy){
            case 'none': break;
            case 'name': items = this.sortAlphabetical(items, this.props.sort.order); break;
            case 'price': items = this.sortNumbers(items, this.props.sort.sortBy, this.props.sort.order); break;
            case 'rating': items = this.sortNumbers(items, this.props.sort.sortBy, this.props.sort.order); break;
        };
        items = items.map((item, i) => {
        return <Item key={item.name+i} item={item}/>;
    });
    };
    

    

    
    console.log(items);


    return <div className='grid-container flex-container'>{items}</div>
};

};
    

const mapStateToProps = state => {
    return {
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    }
};

export default withRouter(connect(mapStateToProps)(ItemsGallery));
import React from 'react';
import { connect } from 'react-redux';
import Subcategory from './Subcategory/Subcategory';
import './SubcategoriesGallery.css';
import {withRouter} from 'react-router-dom';

const subcategoriesGallery = (props) => {
    let items = [];
        if(props.match.params.category){
        items = props.categoriesByIds[props.match.params.category].all.map(subcategory => {
            try {
               return {
                    name: subcategory,
                    linkTo: '/shop/' + props.match.params.category + '/' + subcategory, 
                    imagelink: props.subcategoriesByIds[subcategory][0][0].imagelink,
                    category: props.match.params.category
                }; 
            }
            catch {
                return {
                    name: subcategory,
                    linkTo: '/shop/' + props.match.params.category + '/' + subcategory,
                    imagelink: '',
                    category: props.match.params.category
                };
            }; 
        });
    }
    else {
        items = Object.keys(props.categoriesByIds).slice(0, ((Object.keys(props.categoriesByIds).length) - 1)).map(category => {
          return [...Array(props.categoriesByIds[category].all.length)].map( (_, i) => {
                try {
                    return {
                        name: props.categoriesByIds[category].all[i],
                        linkTo: '/shop/' + category + '/' + props.categoriesByIds[category].all[i], 
                        imagelink: props.subcategoriesByIds[props.categoriesByIds[category].all[i]][0][0].imagelink,
                        category: category
                    }; 
                 }
                catch {
                    return {
                        name: props.categoriesByIds[category].all[i],
                        linkTo: '/shop/' + category + '/' + props.categoriesByIds[category].all[i],
                        imagelink: '',
                        category: category
                    };
                };
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el);
        },[]);
    };

    

    
    items = items.map((item, i) => {
        return <Subcategory key={i} item={item}/>
    });


    return (
        <div className='grid-container subcategories-container'>
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

export default withRouter(connect(mapStateToProps)(subcategoriesGallery));
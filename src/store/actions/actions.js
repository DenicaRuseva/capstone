import * as actionTypes from './actionsTypes';
import axios from 'axios';


const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    };
};

const fetchProductsFaill = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAILL,
        error: error
    };
};

const fetchProductsSuccess = (products) => {
    console.log(products);
    return dispatch => {
        dispatch(setProductsObjectAndCarouselProducts(products));
    };
};

const setProductsObjectAndCarouselProducts = (products) => {
    const carouselProducts = Object.keys(products).map(key => {
        return Object.keys(products[key].subcategories).map( newKey => {
            return [...Array(products[key].subcategories[newKey].items.length)].map((_, i) => {
                return products[key].subcategories[newKey].items[i]
            });
        })
    }).reduce((arr, el) => {
            return arr.concat(el);
        }, []).reduce((arr, el) => {
            return arr.concat(el);
        }, []).sort((a, b) => b.rating - a.rating);
    console.log(carouselProducts);
    return {
        type: actionTypes.SET_PRODUCTS_OBJECT_AND_CAROUSEL_PRODUCTS,
        products: products,
        carouselProducts: carouselProducts.slice(0, 5)
    };
};


export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        const products = axios.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json')
        .then(res => dispatch(fetchProductsSuccess(res.data)))
        .catch( error => dispatch(fetchProductsFaill(error)));
        
    };

};
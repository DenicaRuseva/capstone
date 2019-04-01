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

const fetchProductsSuccess = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS
    };
};


export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        const products = axios.get('https://webmppcapstone.blob.core.windows.net/data/itemsdata.json');
        console.log(products);
    };

};
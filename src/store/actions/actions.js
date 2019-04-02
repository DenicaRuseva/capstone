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
        dispatch(setState(products));
    };
};

const setState = (products) => {
    return dispatch => {
        const allProducts = Object.keys(products).map(key => {
            return Object.keys(products[key].subcategories).map( newKey => {
                return [...products[key].subcategories[newKey].items];
            });
        }).reduce((arr, el) => {
                return arr.concat(el);
            }, []).reduce((arr, el) => {
                return arr.concat(el);
            }, []);
        const carouselProducts = allProducts.sort((a, b) => b.rating - a.rating).slice(0, 10);
        console.log(carouselProducts);
        dispatch(setCarouselProductsAndProductsObject(products, carouselProducts));
        const categoriesAndSubcat = Object.keys(products).map(key => {
            return {
                category: products[key].category,
                subcategories: [...Array(products[key].subcategories.length)].map((_, i) => {
                return products[key].subcategories[i].name
                })
            };
        });
        const subcategories = Object.keys(products).map(key => {
            return Object.keys(products[key].subcategories).map(newKey => {
                return {
                    name: products[key].subcategories[newKey].name,
                    items:  [...products[key].subcategories[newKey].items]
                };
            });
        });
        console.log(allProducts);
        console.log(categoriesAndSubcat);
        console.log(subcategories);
        dispatch(setShopProducts(allProducts, categoriesAndSubcat, subcategories));


    };
    
   
};

const setShopProducts = (allProducts, categoriesAndSubcat, subcategories) => {
    return {
        type: actionTypes.SET_SHOP_PRODUCTS,
        allProducts: allProducts,
        categoriesAndSubcat: categoriesAndSubcat,
        subcategories: subcategories
    };
};

const setCarouselProductsAndProductsObject = (productsObject, carouselProducts) => {
    return {
        type: actionTypes.SET_PRODUCTS_OBJECT_AND_CAROUSEL_PRODUCTS,
        productsObject: productsObject,
        carouselProducts: carouselProducts
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
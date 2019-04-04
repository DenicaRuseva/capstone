import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    productsObject: [],
    carouselProducts: [],
    // allProducts: [],
    categoriesAndSubcat: [],
    subcategories: [],
    categoriesByIds: [], 
    subcategoriesByIds: [],
    loadingCarousel: true,
    loadingShop: true,
    error: false
};


const fetchProductsStart = (state) => { //May be not needed???
    return {
        ...state,
        loading: true
    };
};

const fetchProductsFaill = (state, action) => {
    console.log(action.error);
    return {
        ...state,
        loading: false,
        error: true
    };
};

const setProductsObjectAndCarouselProducts = (state, action) => {
    return {
        ...state,
        productsObject: [
            ...state.productsObject,
            ...action.productsObject
        ],
        carouselProducts: [
            ...state.carouselProducts,
            ...action.carouselProducts
        ],
        loadingCarousel: false
    }
};

const setShopProducts = (state, action) => {
    return {
        ...state,
        // allProducts: [
        //     ...state.allProducts,
        //     ...action.allProducts
        // ],
        categoriesAndSubcat: [
            ...state.categoriesAndSubcat,
            ...action.categoriesAndSubcat
        ],
        subcategories: [
            ...state.subcategories,
            ...action.subcategories
        ],
        categoriesByIds: [
            ...state.categoriesByIds,
            ...action.categoriesByIds
        ], 
        subcategoriesByIds: [
            ...state.subcategoriesByIds,
            ...action.subcategoriesByIds
        ],
        loadingShop: false
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state);
        case actionTypes.FETCH_PRODUCTS_FAILL: return fetchProductsFaill(state, action);
        case actionTypes.SET_PRODUCTS_OBJECT_AND_CAROUSEL_PRODUCTS: return setProductsObjectAndCarouselProducts(state, action);
        case actionTypes.SET_SHOP_PRODUCTS: return setShopProducts(state, action);
        default: return state;
    };

};

export default reducer;
import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    // productsObject: [],
    carouselProducts: [],
    // allProducts: [],
    categoriesAndSubcat: [],
    // subcategories: [],
    categoriesByIds: {}, 
    subcategoriesByIds: {},
    allProducts: [],
    loadingCarousel: true,
    loadingShop: true,
    error: false
};


const fetchProductsStart = (state) => { //May be not needed???
    return {
        ...state,
        loadingCarousel: true,
        loadingShop: true
    };
};

const fetchProductsFaill = (state, action) => {
    console.log(action.error);
    return {
        ...state,
        loadingCarousel: false,
        loadingShop: false,
        error: true
    };
};

const setCarouselProducts = (state, action) => {
    return {
        ...state,
        carouselProducts: [
            ...state.carouselProducts,
            ...action.carouselProducts
        ],
        loadingCarousel: false
    }
};

const setShopData = (state, action) => {
    console.log(action.categoriesByIds);
    return {
        ...state,
        categoriesAndSubcat: [
            ...state.categoriesAndSubcat,
            ...action.categoriesAndSubcat
        ],
        categoriesByIds: {
            ...state.categoriesByIds,
            ...action.categoriesByIds
        },
        subcategoriesByIds: {
            ...state.subcategoriesByIds,
            ...action.subcategoriesByIds
        },
        loadingShop: false
    };
};

const setAllProducts = (state, action) => {
    return {
        ...state,
        allProducts: action.products
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state);
        case actionTypes.FETCH_PRODUCTS_FAILL: return fetchProductsFaill(state, action);
        case actionTypes.SET_CAROUSEL_PRODUCTS: return setCarouselProducts(state, action);
        case actionTypes.SET_SHOP_DATA: return setShopData(state, action);
        case actionTypes.SET_ALL_PRODUCTS: return setAllProducts(state, action);
        default: return state;
    };

};

export default reducer;
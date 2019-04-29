import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    allProducts: [],
    allProductsByIds: [],
    categoriesAndSubcat: [],
    categoriesByIds: {}, 
    subcategoriesByIds: {},
    sort: {
        sortBy: 'none',
        order: 'none'
    },
    showInStockOnly: false,
    currentCategory: 'all',
    currentSubcategory: 'all',
    productsToShow: [],
    numberOfProductsInCategory: null,
    shownCategoryMenu: false,
    clickedCategories: [],
    selectValue: 'none',
    shopMounted: false,
    productSelected: 0,
    loading: true,
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
        allProductsByIds: [
            ...state.allProductsByIds,
            ...action.allProductsByIds
        ],
        productsToShow: [
            ...state.productsToShow,
            ...action.productsToShow
        ],
        clickedCategories: [
            ...state.clickedCategories,
            ...action.clickedCategories
        ],
        loadingShop: false
    };
};

const setAllProducts = (state, action) => {
    return {
        ...state,
        allProducts: action.products
    };
};


const saveShopState = (state, action) => {
    return {
        ...state,
        sort: {
            ...state.sort,
            sortBy: action.state.sort.sortBy,
            order: action.state.sort.order
        },
        showInStockOnly: action.state.showInStockOnly,
        currentCategory: action.state.currentCategory,
        currentSubcategory: action.state.currentSubcategory,
        productsToShow: [
            ...action.state.productsToShow
        ],
        numberOfProductsInCategory: action.state.numberOfProductsInCategory,
        shownCategoryMenu: action.state.shownCategoryMenu,
        clickedCategories: [...action.state.clickedCategories],
        productSelected: action.state.productSelected,
        selectValue: action.state.selectValue,
        loading: action.state.loading,
        shopMounted: true
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state);
        case actionTypes.FETCH_PRODUCTS_FAILL: return fetchProductsFaill(state, action);
        case actionTypes.SET_CAROUSEL_PRODUCTS: return setCarouselProducts(state, action);
        case actionTypes.SET_SHOP_DATA: return setShopData(state, action);
        case actionTypes.SET_ALL_PRODUCTS: return setAllProducts(state, action);
        case actionTypes.SAVE_SHOP_STATE: return saveShopState(state, action);
        default: return state;
    };

};

export default reducer;
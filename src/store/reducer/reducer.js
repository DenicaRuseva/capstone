import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    productsObject: [],
    loading: false,
    error: false
};


const fetchProductsStart = (state) => {
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

const setProducts = (state, action) => {
    return {
        ...state,
        productsObject: [
            ...state.productsObject,
            ...action.products
        ],
        loading: false
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state);
        case actionTypes.FETCH_PRODUCTS_FAILL: return fetchProductsFaill(state, action);
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);
        default: return state;
    };

};

export default reducer;
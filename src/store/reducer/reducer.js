import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    loading: false
};


const fetchProductsStart = (state) => {
    return {
        ...state,
        loading: true
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state);
        default: return state;
    };

};

export default reducer;
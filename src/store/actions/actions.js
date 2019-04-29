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
    return dispatch => {
        dispatch(setState(products));
    };
};

export const flattenArray = (arr) => arr.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), []
);

const makeArrayToArraysWithNElements = (array) => {
    let arr = [];
    while(array.length) {
        arr.push(array.splice(0, 4));
    };
    return arr;
};


const setAllProducts = (products) => {
    return {
        type: actionTypes.SET_ALL_PRODUCTS,
        products: products
    };
};

const mekeAllProductsObject = (products) => {
    let allProducts = Object.keys(products).map(key => {
        return Object.keys(products[key].subcategories).map( newKey => {
            return products[key].subcategories[newKey].items;
        });
    });
    allProducts = flattenArray(allProducts);
    return allProducts;
};

const makeCategoryesAndSubcategories = (products) => {
    const catAndSubcat = Object.keys(products).map(key => {
        return {
            category: products[key].category,
            subcategories: [...Array(products[key].subcategories.length)].map((_, i) => {
            return products[key].subcategories[i].name
            })
        };
    });
    return catAndSubcat;
};

const makeCategoriesByIds = (products, categoriesAndSubcat) => {
    let allSubcategById = [];
    let categoriesByIds = {};


    Object.keys(products).map(key => {
        return categoriesByIds[products[key].category] = {
            'all': [...Array(products[key].subcategories.length)].map((_, i) => {
            allSubcategById.push(products[key].subcategories[i].name);
                return products[key].subcategories[i].name
            })
        }
    });

    categoriesAndSubcat.map((el, i) => {
        categoriesAndSubcat[i].subcategories.map(subcategory => {
            return categoriesByIds[el.category] = {
                ...categoriesByIds[el.category],
                [subcategory]: [subcategory]
            }
        })
    });

    categoriesByIds['all'] = {'all': allSubcategById};

    return categoriesByIds;
};

const makesubcategoriesByIds = (products) => {
    let subcategoriesByIds = [];
    let a = -1*1;
    Object.keys(products).map(key => {
        return Object.keys(products[key].subcategories).map((newKey) => {
            return subcategoriesByIds[products[key].subcategories[newKey].name] = 
            [...Array(products[key].subcategories[newKey].items.length)]
            .map((_, i) => {
                a = a + 1;
                return a*1;
            });
        })
    });
    return subcategoriesByIds;
};

const makeAllProductsByIds = (products) => {
    let allProductsByIds = [];
    let i = 0;
    while(i < products.length){
        allProductsByIds.push(i);
        i++
    };
    return allProductsByIds;
};

const mekeClickedCategories = (length) => {
    let clickedCategories = [];
    for(let i = 0; i < length; i++){
        clickedCategories.push(false);
    };
    return clickedCategories;
};

const makeCarouselProducts = () => {
    let carouselProducts = [];
    for(let i = 0; i < 12; i++){
        carouselProducts.push(85-i)
        // carouselProducts.push(i)

    }
    console.log(carouselProducts);
    carouselProducts = makeArrayToArraysWithNElements(carouselProducts);
    return carouselProducts;
};

const setState = (products) => {
    return dispatch => {
        console.log(products);
        const allProducts = mekeAllProductsObject(products); //Make array of objects; Every object represent product;
        dispatch(setAllProducts(allProducts));

        
        const carouselProducts = makeCarouselProducts();
        
        dispatch(setCarouselProducts(carouselProducts));

        const categoriesAndSubcat = makeCategoryesAndSubcategories(products); //Make array of objects; Every object have
                                                                            // category property, holding name of category and
                                                                            //subcategory property - array of subcategories names of category

        const categoriesByIds = makeCategoriesByIds(products, categoriesAndSubcat); //Object of objects; Every object holds a category name
                                                                                //as property and array of subcategoryes as value; 
        
    
        const allProductsByIds = makeAllProductsByIds(allProducts); //Array; Holds numbers of all ids;

        const subcategoriesByIds = makesubcategoriesByIds(products); //Object of objects; Every object holds a subcategory name
                                                                    //as property and array of items in subcategory ids as value;  


        const clickedCategories = mekeClickedCategories(categoriesAndSubcat.length); //Array, holding bolean values; If clickedCategories[n] === true,
                                                                                    //categoriesAndSubc[n].category will be clicked

        // const productsToShow = makeArrayToArraysOfTwentyFourElements([...allProductsByIds]); //Will be use to be shown 24 products per page;

        dispatch(setShopData(categoriesAndSubcat, categoriesByIds, subcategoriesByIds, allProductsByIds, clickedCategories));
    };
};

const setShopData = (categoriesAndSubcat, categoriesByIds, subcategoriesByIds, allProductsByIds, clickedCategories) => {
    return {
        type: actionTypes.SET_SHOP_DATA,
        categoriesAndSubcat: categoriesAndSubcat,
        categoriesByIds: categoriesByIds,
        subcategoriesByIds: subcategoriesByIds,
        allProductsByIds: allProductsByIds,
        clickedCategories: clickedCategories,
        productsToShow: allProductsByIds
    };
};

const setCarouselProducts = (carouselProducts) => {
    return {
        type: actionTypes.SET_CAROUSEL_PRODUCTS,
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
}


export const saveShopState = (state) => {
    return {
        type: actionTypes.SAVE_SHOP_STATE,
        state: state
    };
};


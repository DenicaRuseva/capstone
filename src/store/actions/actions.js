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

        // let allSubcategById =[];
        let subcategoriesById = [];
        let categoriesByIds = Object.keys(products).map(key => {
            return {
                [products[key].category]: {
                    'all': [...Array(products[key].subcategories.length)].map((_, i) => {
                    // allSubcategById.push(products[key].subcategories[i].name);
                    return products[key].subcategories[i].name
                    }),
                }
            };
        });

        subcategoriesById = [...Array(categoriesByIds.length)].map((_, i) => {
            return [...Array(subcategories[i].length)].map((_, k) => {
                return {
                    [subcategories[i][k].name]: [[subcategories[i][k].name]]
                }
            })
        });

        
        const catKeys = categoriesByIds.map(i => {
            return Object.keys(i);
        });
        categoriesByIds = categoriesByIds.map((_,i) => {
            return {
                [catKeys[i]]: {
                    ...Object.assign({}, ...subcategoriesById[i]),
                    ...categoriesByIds[i][catKeys[i]]
                }
            }
        });

        subcategoriesById = subcategoriesById.reduce((arr, el) => {
            return arr.concat(el.map(obj => {
                return {
                    ...obj
                }
            }))
        },[]);

        
        // subcategoriesById.map(i => {
        //     console.log(Object.keys(i));
        //     Object.keys(i).map((subcat, i) => {
        //         console.log(subcat);
        //         let ids = [];
        //         ids = allProducts.filter(product => product.subcategory.toLowerCase() === subcat.toLowerCase());
        //         console.log({[subcat]: [ids]});
        //         return subcatByIds[subcat] = ids;  
        //     })
        // });

        const subcategoriesByIds = subcategories.map(arr => {
            return [...Array(arr.length)].map((_,i) => {
                return {
                    [arr[i].name]: [...Array(arr[i].items.length)].map((_, j) => {
                        return arr[i].items[j]
                    })
                }
            })
        }).reduce((arr, el) => {
            return arr.concat(el.map(obj => {
                return {
                    ...obj
                }
            }))
        },[]);;
        console.log(subcategoriesByIds);

     
    // //  console.log(allSubcategById);
        console.log(categoriesByIds);
         console.log(subcategoriesById);
         console.log(subcategoriesByIds);
    //     console.log(allProducts);
    //     console.log(categoriesAndSubcat);
    //     console.log(subcategories);
        dispatch(setShopProducts(categoriesAndSubcat, subcategories, categoriesByIds, subcategoriesByIds));


    };
    
   
};

const setShopProducts = (categoriesAndSubcat, subcategories, categoriesByIds, subcategoriesByIds) => {
    return {
        type: actionTypes.SET_SHOP_PRODUCTS,
        // allProducts: allProducts,
        categoriesAndSubcat: categoriesAndSubcat,
        subcategories: subcategories,
        categoriesByIds: categoriesByIds,
        subcategoriesByIds: subcategoriesByIds
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
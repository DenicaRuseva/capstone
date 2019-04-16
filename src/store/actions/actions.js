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


// function deepCopy(src) {
//     let target = Array.isArray(src) ? [] : {};
//     for (let key in src) {
//       let v = src[key];
//       if (v) {
//         if (typeof v === "object") {
//           target[key] = deepCopy(v);
//         } else {
//           target[key] = v;
//         }
//       } else {
//         target[key] = v;
//       }
//     }
  
//     return target;
//   };

const deepCopy = (obj) => {
    let target = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      let v = obj[key];
      if (v) {
        if (typeof v === "object") {
          target[key] = deepCopy(v);
        } else {
          target[key] = v;
        }
      } else {
        target[key] = v;
      }
    }
    return target;
};


const setAllProducts = (products) => {
    return {
        type: actionTypes.SET_ALL_PRODUCTS,
        products: products
    };
};


const setState = (products) => {
    console.log(products);
    return dispatch => {
        const allProducts = Object.keys(products).map(key => {
            return Object.keys(products[key].subcategories).map( newKey => {
                return products[key].subcategories[newKey].items;
            });
        }).reduce((arr, el) => {
                return arr.concat(el);
        }, []).reduce((arr, el) => {
                return arr.concat(el);
        }, []);

        console.log(allProducts);
        dispatch(setAllProducts(allProducts));

        const carouselProducts = allProducts.sort((a, b) => b.rating - a.rating).slice(0, 10);
        console.log(carouselProducts);


        dispatch(setCarouselProducts(carouselProducts));


        const categoriesAndSubcat = Object.keys(products).map(key => {
            return {
                category: products[key].category,
                subcategories: [...Array(products[key].subcategories.length)].map((_, i) => {
                return products[key].subcategories[i].name
                })
            };
        });

        let allSubcategById = [];
        let subcategoriesByIds = {};
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


     Object.keys(products).map(key => {
            return Object.keys(products[key].subcategories).map((newKey) => {
                return subcategoriesByIds[products[key].subcategories[newKey].name] = 
                [deepCopy(products[key].subcategories[newKey].items)];
            });
        });

     

     
        categoriesByIds['all'] = {'all': deepCopy(allSubcategById)};
        
      

        //  console.log(subcategoriesByIds);
 
        dispatch(setShopData(categoriesAndSubcat, categoriesByIds, subcategoriesByIds));
        // dispatch(setShopData(categoriesAndSubcat, subcategories, categoriesByIds));


    };
    
   
};

const setShopData = (categoriesAndSubcat, categoriesByIds, subcategoriesByIds) => {
    return {
        type: actionTypes.SET_SHOP_DATA,
        // allProducts: allProducts,
        categoriesAndSubcat: categoriesAndSubcat,
        // subcategories: subcategories,
        categoriesByIds: categoriesByIds,
        subcategoriesByIds: subcategoriesByIds
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

};
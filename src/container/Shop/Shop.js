import React, { Component } from 'react';
import { connect } from 'react-redux';
import Controls from '../../components/Shop/Controls/Controls';
import ShopSideBar from '../../components/Shop/ShopSideBar/ShopSideBar';
import ItemsGallery from '../../components/Shop/ItemsGallery/ItemsGallery';
import PropsRoute from '../../hoc/Routes/PropsRoute'; 
import Product from '../../components/Shop/Product/Product';
import './Shop.css';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import {flattenArray, deepCopy} from '../utility';



class Shop extends Component {

    state = {
        loading: true,
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
        productSelected: 0
    };


    componentDidMount(){
        console.log('in CDM Shop');
        const numberOfCategories = this.props.categoriesAndSubcat.length;
        let clickedCategories = [];
        for(let i=0; i < numberOfCategories; i++){
            clickedCategories.push(false);
        };

        if(this.props.location.pathname === '/product' && this.props.location.search){
            const productUrl = this.props.location.search.split("=").pop();
            let validUrl = false;
            let productId;

            for(let i = 0; i < this.props.allProducts.length; i++) {
                if (this.props.allProducts[i].name == decodeURI(productUrl)) {
                    validUrl = true;
                    productId = i;
                    i = this.props.allProducts.length;
                };
            };

            if(validUrl){
                    this.setState({
                    productsToShow: this.props.allProducts,
                    numberOfProductsInCategory: this.props.allProducts.length,
                    clickedCategories: clickedCategories,
                    productSelected: productId,
                    loading: false
                });
                this.props.history.replace('/product?name=' + productUrl);
            }
            else {
                this.setState({
                    productsToShow: this.props.allProducts,
                    numberOfProductsInCategory: this.props.allProducts.length,
                    clickedCategories: clickedCategories,
                    loading: false
                });
                this.props.history.replace('/shopping');
            };  
        }
        else {
            if(this.props.match.params.category){
                const currentURLCategory = this.props.categoriesByIds[this.props.match.params.category] ? this.props.match.params.category : 'all';
                const currentURLSubcategory = (currentURLCategory !== 'all' && this.props.match.params.subcategory && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory]) ? this.props.match.params.subcategory : 'all';
    
               
               
    
                if(currentURLCategory === 'all'){
                    this.props.history.replace('/shopping');
                    this.setState({
                        productsToShow: this.props.allProducts,
                        numberOfProductsInCategory: this.props.allProducts.length,
                        clickedCategories: clickedCategories,
                        loading: false
                    });
                }
                else {
                    let productsToShow =  this.makeProductsToShow(currentURLCategory, currentURLSubcategory);
    
                    if(currentURLSubcategory === 'all'){
                        this.props.history.replace('/shopping/' + currentURLCategory);
                        clickedCategories = this.props.categoriesAndSubcat.map((el, i) => {
                            if(el.category === currentURLCategory){
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        this.setState({
                        currentCategory: currentURLCategory,
                        productsToShow: productsToShow,
                        numberOfProductsInCategory: productsToShow.length,
                        clickedCategories: clickedCategories,
                        loading: false
                        });
                        this.props.history.replace('/shopping/' + currentURLCategory);
                    }
                    else {
                        let productsInCategory = this.makeProductsToShow(currentURLCategory, 'all');
                        clickedCategories = this.props.categoriesAndSubcat.map((el, i) => {
                            if(el.category === currentURLCategory){
                                return true;
                            }
                            else {
                                return false;
                            }
                        });
                        this.setState({
                        currentCategory: currentURLCategory,
                        currentSubcategory: currentURLSubcategory,
                        productsToShow: productsToShow,
                        numberOfProductsInCategory: productsInCategory.length,
                        clickedCategories: clickedCategories,
                        loading: false
                        });
                        this.props.history.replace('/shopping/' + currentURLCategory + '/' + currentURLSubcategory);
                    }
                };
            }
            else {
                this.setState({
                    productsToShow: this.props.allProducts,
                    numberOfProductsInCategory: this.props.allProducts.length,
                    clickedCategories: clickedCategories,
                    loading: false
                });
                this.props.history.replace('/shopping');
            };
        }

        
       
    };

    shouldComponentUpdate(nextProps, nextState){
        if(this.state === nextState){
            return false;
        }
        return true;
    };

    makeProductsToShow = (category, subcategory) => {
        let productsToShow = this.props.categoriesByIds[category][subcategory].map(subcategory => {
            return this.props.subcategoriesByIds[subcategory][0].map(item => {
                return item;
            })
        });
        productsToShow = flattenArray(productsToShow);
        return productsToShow;
    };

    checkDoesInStockIsChecked = (products) => {
        if(this.state.showInStockOnly){
            products = products.filter(item => parseFloat(item.stock) !== 0);
        };
        return products;
    };

    toggleSubcategoriesDropdown = (categoryId) => {
        let clickedCategories = [...this.state.clickedCategories];
        clickedCategories[categoryId] = !clickedCategories[categoryId];
        return clickedCategories;
    };

    showSubcategoriesDropdown = (categoryId) => {
        let clickedCategories = [...this.state.clickedCategories];
        clickedCategories[categoryId] = true;
        return clickedCategories;
    };

    countProductsInCategory = (category) => {
        let number = 0;
        this.props.categoriesByIds[category].all.map(subcategory => {
            if(this.props.subcategoriesByIds[subcategory][0]){
                number = number + this.props.subcategoriesByIds[subcategory][0].length;
            };
        });
        return number;
    };

    sideBarCategoryClickHandler = (categoryId, categoryClicked) => {
        if(this.state.currentCategory === categoryClicked){
            let productsToShow = deepCopy(this.props.allProducts);
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);
            productsToShow = this.checkDoesInStockIsChecked(productsToShow);
            this.props.history.replace('/shopping');
            const clickedCategories = this.toggleSubcategoriesDropdown(categoryId);
            this.setState({
                currentCategory: 'all',
                currentSubcategory: 'all',
                productsToShow: productsToShow,
                numberOfProductsInCategory: this.props.allProducts.length,
                clickedCategories: clickedCategories
            });
        }
        else {
            this.props.history.replace(`/shopping/${categoryClicked}`);
            let productsToShow = this.makeProductsToShow(categoryClicked, 'all');
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);
            const numberOfProductsInCategory = productsToShow.length;
            productsToShow = this.checkDoesInStockIsChecked(productsToShow);
            const clickedCategories = this.showSubcategoriesDropdown(categoryId);
            this.setState({
                currentCategory: categoryClicked,
                currentSubcategory: 'all',
                productsToShow: productsToShow,
                numberOfProductsInCategory: numberOfProductsInCategory,
                clickedCategories: clickedCategories
            });
        };
    };


    // rubric26, rubric28
    sideBarSubcategoryClickHandler = (category, subcategoryClicked) => {
        if(this.state.currentSubcategory === subcategoryClicked){
            return;
        };
        let productsToShow = this.makeProductsToShow(category, subcategoryClicked);

        const numberOfProductsInCategory = this.countProductsInCategory(category);
        

        productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);

        productsToShow = this.checkDoesInStockIsChecked(productsToShow);


        this.setState({
            currentCategory: category,
            currentSubcategory: subcategoryClicked,
            productsToShow: productsToShow,
            shownCategoryMenu: false,
            numberOfProductsInCategory: numberOfProductsInCategory
        });
    };

    toggleCategoryMenuHandler = () => {
        this.setState( ( prevState ) => {
            return { shownCategoryMenu: !prevState.shownCategoryMenu };
        } );
    };

    // rubric33
    sortItemsHandler = (sortCriteria) => {
        const sortDate = sortCriteria.split('_');
        if(this.state.sort.sortBy === sortDate[0] && this.state.sort.order === sortDate[1]){
            return;
        }
        if(sortDate[0] === 'none'){
            let productsToShow = this.makeProductsToShow(this.state.currentCategory, this.state.currentSubcategory);
            this.setState({
                sort: {
                    sortBy: 'none',
                    order: 'none'
                },
                productsToShow: productsToShow
            });
        }
        else if(this.state.sort.sortBy === sortDate[0]){
            this.setState({
                sort: {
                    sortBy: sortDate[0],
                    order: sortDate[1]
                },
                productsToShow: this.state.productsToShow.reverse()
            });
        }
        else {
            let productsToShow = this.state.productsToShow;
            productsToShow = this.sortProducts(productsToShow, sortDate[0], sortDate[1]);
            this.setState({
                sort: {
                    sortBy: sortDate[0],
                    order: sortDate[1]
                },
                productsToShow: productsToShow
            }); 
        }
        
    };

    sortProducts = (products, sortCriteria, order) => {
        switch(sortCriteria){
            case 'none': return products;
            case 'name': return this.sortAlphabetical(products, order);
            case 'price': return this.sortNumbers(products, sortCriteria, order);
            case 'rating': return this.sortNumbers(products, sortCriteria, order);
        };
    };
   
    sortAlphabetical = (products, order) => {
        products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
        if(order === 'descending'){
            products = products.reverse(); 
        }
        return products;
    };
    
    sortNumbers = (products, sortCriteria, order) => {
        products.sort((a, b) => {
            return a[sortCriteria] - b[sortCriteria];
        });
        if(order === 'descending'){
            products = products.reverse(); 
        }
        return products;
    };
    

    resetSort = () => {
            this.setState({
                sort: {
                    sortBy: 'none',
                    order: 'none'
                }
            });
    };

    // rubric28, rubric29
    inStockClickHandler = () => {
        if(this.state.showInStockOnly){
            let productsToShow = this.makeProductsToShow(this.state.currentCategory, this.state.currentSubcategory);
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.order);
            this.setState({
                showInStockOnly: false,
                productsToShow: productsToShow
            });
        }
        else {
            const productsToShow = this.state.productsToShow.filter(item => parseFloat(item.stock) !== 0);
            this.setState({
                showInStockOnly: true,
                productsToShow: productsToShow
            });
        };
    };

    showProductPageHandler = (product) => {
        this.props.history.replace('/product?=' + product.name);
    };

    productSelectHandler = (id) => {
        console.log(id);
        console.log(this.state.productsToShow[id]);
        this.setState({
            productSelected: id
        });
        this.props.history.replace('/product?name=' + this.state.productsToShow[id].name);

    };


    render(){
        console.log('in render shop');
        const shop = this.state.loading ? <div>spinner</div> :
        (
            <div className='shop'>
                    {/* rubric19 */}
                    <PropsRoute path='/shopping' 
                        component={ShopSideBar} 
                        clickOnCategory={this.sideBarCategoryClickHandler}
                        clickOnSubcategory={this.sideBarSubcategoryClickHandler}
                        toggleCategoryMenu={this.toggleCategoryMenuHandler}
                        shownCategoryMenu={this.state.shownCategoryMenu}
                        currentCategory={this.state.currentCategory}
                        clickedCategories={this.state.clickedCategories}/>
                    {/*  rubric14, rubric15, rubric16, rubric17, rubric18  */}
                    <PropsRoute path='/shopping' component={Controls} 
                        onSort={this.sortItemsHandler} 
                        category={this.state.currentCategory}
                        onInStockClick={this.inStockClickHandler}
                        numberOfProductsInCategory={this.state.numberOfProductsInCategory}
                        numberOnShownProducts={this.state.productsToShow.length}/>
                {/* rubric20  */}
                    <PropsRoute path='/shopping' component={ItemsGallery}
                     onUnmount={this.resetSort}
                     productsToShow={this.state.productsToShow}
                     clickOnAddBtn={this.props.addProductToCart}
                     clickOnImg={this.productSelectHandler}/> 
                    <PropsRoute path='/product' component={Product} product={this.state.productsToShow[this.state.productSelected]}/>
            </div>
        );
        return <WithoutRootDiv>{shop}</WithoutRootDiv>
    };
};

const mapStateToProps = state => {
    return {
        categoriesAndSubcat: state.categoriesAndSubcat,
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
        allProducts: state.allProducts
    };
};

export default connect(mapStateToProps)(Shop);
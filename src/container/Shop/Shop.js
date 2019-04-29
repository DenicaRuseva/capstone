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
import * as action from '../../store/actions/index';




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
        productSelected: 0,
        selectedProductQty: 1,
        selectValue: 'none_none'
    };


    componentDidMount(){
        console.log('in CDM Shop');
        if(this.props.shopMounted){
            console.log(this.props.productSelected);
            this.setState({
                loading: false,
                sort: {
                    ...this.state.sort,
                    sortBy: this.props.sort.sortBy,
                    order: this.props.sort.order
                },
                showInStockOnly: this.props.showInStockOnly,
                currentCategory: this.props.currentCategory,
                currentSubcategory: this.props.currentSubcategory,
                productsToShow: [...this.props.productsToShow],
                numberOfProductsInCategory: this.props.numberOfProductsInCategory,
                shownCategoryMenu: this.props.shownCategoryMenu,
                clickedCategories: [...this.props.clickedCategories],
                productSelected: this.props.productSelected,
                selectValue: this.props.selectValue,
                loading: this.props.loading
            });
        }
        else if(!this.props.shopMounted && this.state.loading) {
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
                        productsToShow: [...this.props.allProducts],
                        numberOfProductsInCategory: this.props.allProducts.length,
                        clickedCategories: [...clickedCategories],
                        productSelected: productId,
                        loading: false
                    });
                    this.props.history.replace('/product?name=' + productUrl);
                }
                else {
                    this.setState({
                        productsToShow: [...this.props.allProducts],
                        numberOfProductsInCategory: this.props.allProducts.length,
                        clickedCategories: [...clickedCategories],
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
                            productsToShow: [...this.props.allProductsByIds],
                            numberOfProductsInCategory: this.props.allProductsByIds.length,
                            clickedCategories: [...clickedCategories],
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
                            productsToShow: [...productsToShow],
                            numberOfProductsInCategory: productsToShow.length,
                            clickedCategories: [...clickedCategories],
                            loading: false
                            });
                            this.props.history.replace('/shopping/' + currentURLCategory);
                        }
                        else {
                            // let productsInCategory = this.makeProductsToShow(currentURLCategory, 'all');
                            const numberOfProductsInCategory = this.countProductsInCategory(currentURLCategory);
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
                            productsToShow: [...productsToShow],
                            numberOfProductsInCategory: numberOfProductsInCategory,
                            clickedCategories: [...clickedCategories],
                            loading: false
                            });
                            this.props.history.replace('/shopping/' + currentURLCategory + '/' + currentURLSubcategory);
                        }
                    };
                }
                else {
                    this.setState({
                        productsToShow: [...this.props.allProductsByIds],
                        numberOfProductsInCategory: this.props.allProductsByIds.length,
                        clickedCategories: [...clickedCategories],
                        loading: false
                    });
                    this.props.history.replace('/shopping');
                };
            };
        };
    };

    componentWillUnmount(){
        console.log('in component will unmount shop');
        this.props.onShopUnmount(this.state);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state === nextState){
            return false;
        }
        return true;
    };

    makeProductsToShow = (category, subcategory) => {
        let productsToShow = this.props.categoriesByIds[category][subcategory].map(subcategory => {
            return this.props.subcategoriesByIds[subcategory].map(id => {
                return id;
            });
        });
        productsToShow = flattenArray(productsToShow);
        return productsToShow;
    };

    checkDoesInStockIsChecked = (products) => {
        if(this.state.showInStockOnly){
            products = products.filter(id => parseFloat(this.props.allProducts[id].stock) !== 0);
        };
        return products;
    };

    toggleSubcategoriesDropdown = (categoryId) => {
        let updatedClickedCategories = [...this.state.clickedCategories];
        updatedClickedCategories[categoryId] = !updatedClickedCategories[categoryId];
        return updatedClickedCategories;
    };

    showSubcategoriesDropdown = (categoryId) => {
        let clickedCategories = [...this.state.clickedCategories];
        clickedCategories[categoryId] = true;
        return clickedCategories;  
    };

    countProductsInCategory = (category) => {
        let number = 0;
        this.props.categoriesByIds[category].all.map(subcategory => {
        if(toString(this.props.subcategoriesByIds[subcategory][0])){
            number = number + this.props.subcategoriesByIds[subcategory].length;
        };
    });
    return number;
    };

    sideBarCategoryClickHandler = (categoryId, categoryClicked) => {
        if(this.state.currentCategory === categoryClicked){
            let productsToShow = [...this.props.allProductsByIds];
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);
            productsToShow = this.checkDoesInStockIsChecked(productsToShow);
            this.props.history.replace('/shopping');
            const clickedCategories = this.toggleSubcategoriesDropdown(categoryId);
            this.setState({
                currentCategory: 'all',
                currentSubcategory: 'all',
                productsToShow: productsToShow,
                numberOfProductsInCategory: productsToShow.length,
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
    sortItemsHandler = (event) => {
        const sortCriteria = event.target.value;
        const sortDate = sortCriteria.split('_');
        if(this.state.sort.sortBy === sortDate[0] && this.state.sort.order === sortDate[1]){
            return;
        }
        else {
            if(sortDate[0] === 'none'){
                let productsToShow = this.makeProductsToShow(this.state.currentCategory, this.state.currentSubcategory);
                this.setState({
                    sort: {
                        sortBy: 'none',
                        order: 'none'
                    },
                    productsToShow: [...productsToShow],
                    selectValue: event.target.value
                });
            }
            else if(this.state.sort.sortBy === sortDate[0]){
                const updatedProductsToShow = [...this.state.productsToShow].reverse();
                this.setState({
                    sort: {
                        sortBy: sortDate[0],
                        order: sortDate[1]
                    },
                    productsToShow: updatedProductsToShow,
                    selectValue: event.target.value
                });
            }
            else {
                let productsToShow = [...this.state.productsToShow];
                productsToShow = this.sortProducts(productsToShow, sortDate[0], sortDate[1]);
                this.setState({
                    sort: {
                        sortBy: sortDate[0],
                        order: sortDate[1]
                    },
                    productsToShow: productsToShow,
                    selectValue: event.target.value
                }); 
            };
        };
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
            const nameA = this.props.allProducts[a].name.toUpperCase();
            const nameB = this.props.allProducts[b].name.toUpperCase();
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
        };
        return products; 
};
    
    sortNumbers = (products, sortCriteria, order) => {
        products.sort((a, b) => {
            return this.props.allProducts[a][sortCriteria] - this.props.allProducts[b][sortCriteria];
        });
        if(order === 'descending'){
            products = products.reverse(); 
        }
        return products;   
    };

    // rubric28, rubric29
    inStockClickHandler = () => {
        if(this.state.showInStockOnly){
            let productsToShow = this.makeProductsToShow(this.state.currentCategory, this.state.currentSubcategory);
            const numberOfProductsInCategory = this.countProductsInCategory(this.state.currentCategory);
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.order);
            this.setState({
                showInStockOnly: false,
                productsToShow: [...productsToShow],
                numberOfProductsInCategory: numberOfProductsInCategory
            });
        }
        else {
            const productsToShow = this.state.productsToShow.filter(id => parseFloat(this.props.allProducts[id].stock) !== 0);
            const numberOfProductsInCategory = this.countProductsInCategory(this.state.currentCategory);
            this.setState({
                showInStockOnly: true,
                productsToShow: [...productsToShow],
                numberOfProductsInCategory: numberOfProductsInCategory
            });
        };
    };

    showProductPageHandler = (product) => {
        this.props.history.replace('/product?=' + product.name);
    };

    productSelectHandler = (id) => {
        const state =   {
            ...this.state,
            productSelected: id
        };
        this.props.onShopUnmount(state);
        this.props.history.push('/product?name=' + this.props.allProducts[id].name);
        // this.setState({
        //     productSelected: id*1
        // }, () => this.props.history.push('/product?name=' + this.props.allProducts[id].name));
    };

    onSelectProductQtyChangeHandler = (event) => {
        this.setState({
            selectedProductQty: event.target.value
        });
    };

    showPreviousPageHandler = () => {
        this.props.history.goBack();
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
                        numberOnShownProducts={this.state.productsToShow.length}
                        selectValue={this.state.selectValue}
                    />
                {/* rubric20  */}
                    <PropsRoute path='/shopping' component={ItemsGallery}
                     productsToShow={this.state.productsToShow}
                     clickOnAddBtn={this.props.addProductToCart}
                     clickOnImg={this.productSelectHandler}/> 
                    <PropsRoute 
                    path='/product' 
                    component={Product} 
                    product={this.props.allProducts[this.state.productSelected]}
                    clickOnAddBtn={() => this.props.addProductToCart(this.props.allProducts[this.state.productSelected], this.state.selectedProductQty)}
                    onQuantityChange={this.onSelectProductQtyChangeHandler}
                    clickOnBackBtn={this.showPreviousPageHandler}/>
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
        allProducts: state.allProducts,
        allProductsByIds: state.allProductsByIds,
        sort: state.sort,
        showInStockOnly: state.showInStockOnly,
        currentCategory: state.currentCategory,
        currentSubcategory: state.currentSubcategory,
        productsToShow: state.productsToShow,
        numberOfProductsInCategory: state.numberOfProductsInCategory,
        shownCategoryMenu: state.shownCategoryMenu,
        clickedCategories: state.clickedCategories,
        productSelected: state.productSelected,
        selectValue: state.selectValue,
        loading: state.loading,
        shopMounted: state.shopMounted
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShopUnmount: (state) => {dispatch(action.saveShopState(state))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
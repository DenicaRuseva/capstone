import React, { Component } from 'react';
import { connect } from 'react-redux';
import Controls from '../../components/Shop/Controls/Controls';
import ShopSideBar from '../../components/Shop/ShopSideBar/ShopSideBar';
import ItemsGallery from '../../components/Shop/ItemsGallery/ItemsGallery';
import './Shop.css';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';


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
        shownCategoryMenu: false
    };


    componentDidMount(){

        if(this.props.match.params.category){
           
            const currentURLCategory = this.props.categoriesByIds[this.props.match.params.category] ? this.props.match.params.category : 'all';
            const currentURLSubcategory = (currentURLCategory !== 'all' && this.props.match.params.subcategory && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory]) ? this.props.match.params.subcategory : 'all';

           
           

            if(currentURLCategory === 'all'){
                this.props.history.replace('/shop');
                this.setState({
                    productsToShow: this.props.allProducts,
                    numberOfProductsInCategory: this.props.allProducts.length,
                    loading: false
                });
            }
            else {
                let productsToShow =  this.makeProductsToShow(currentURLCategory, currentURLSubcategory);

                if(currentURLSubcategory === 'all'){
                    this.props.history.replace('/shop/' + currentURLCategory);
                    this.setState({
                    currentCategory: currentURLCategory,
                    productsToShow: productsToShow,
                    numberOfProductsInCategory: productsToShow.length,
                    loading: false
                    });
                }
                else {
                    let productsInCategory = this.makeProductsToShow(currentURLCategory, 'all');
                    this.setState({
                    currentCategory: currentURLCategory,
                    currentSubcategory: currentURLSubcategory,
                    productsToShow: productsToShow,
                    numberOfProductsInCategory: productsInCategory.length,
                    loading: false
                    });
                }
            };
        }
        else {
            this.setState({
                productsToShow: this.props.allProducts,
                numberOfProductsInCategory: this.props.allProducts.length,
                loading: false
            });
        };
       
    };

    flattenArray = (arr) => arr.reduce(
        (a, b) => a.concat(Array.isArray(b) ? this.flattenArray(b) : b), []
    );
    

    makeProductsToShow = (category, subcategory) => {
        let productsToShow = this.props.categoriesByIds[category][subcategory].map(subcategory => {
            return this.props.subcategoriesByIds[subcategory][0].map(item => {
                return item;
            })
        });
        productsToShow = this.flattenArray(productsToShow);
        return productsToShow;
    };

    sideBarCategoryClickHandler = (categoryClicked) => {
        if(this.state.currentCategory === categoryClicked){
            let productsToShow = this.props.allProducts;
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);
            

            if(this.state.showInStockOnly){
                productsToShow = productsToShow.filter(item => parseFloat(item.stock) !== 0);
            };


            this.props.history.replace('/shop');

            this.setState({
                currentCategory: 'all',
                currentSubcategory: 'all',
                productsToShow: productsToShow,
                numberOfProductsInCategory: this.props.allProducts.length
            });
        }
        else {
            this.props.history.replace(`/shop/${categoryClicked}`);
            let productsToShow = this.makeProductsToShow(categoryClicked, 'all');
            productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);
            const numberOfProductsInCategory = productsToShow.length;
            if(this.state.showInStockOnly){
                productsToShow = productsToShow.filter(item => parseFloat(item.stock) !== 0);
            };

            this.setState({
                currentCategory: categoryClicked,
                currentSubcategory: 'all',
                productsToShow: productsToShow,
                numberOfProductsInCategory: numberOfProductsInCategory
            });
        };
    };

    sideBarSubcategoryClickHandler = (subcategoryClicked) => {
      
        if(this.state.currentSubcategory === subcategoryClicked){
            return;
        };
        let productsToShow = this.makeProductsToShow(this.state.currentCategory, subcategoryClicked);

        let numberOfProductsInCategory = 0;
        this.props.categoriesByIds[this.state.currentCategory].all.map(subcategory => {
            if(this.props.subcategoriesByIds[subcategory][0]){
                numberOfProductsInCategory = numberOfProductsInCategory + this.props.subcategoriesByIds[subcategory][0].length;
            };
        });

        productsToShow = this.sortProducts(productsToShow, this.state.sort.sortBy, this.state.sort.order);

        if(this.state.showInStockOnly){
            productsToShow = productsToShow.filter(item => parseFloat(item.stock) !== 0);
        };

        this.setState({
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
            console.log(productsToShow);
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



    render(){
        console.log(this.props);
        const shop = this.state.loading ? <div>spinner</div> :
        (
            <div className='shop'>
            <div className='hide-on-sm controls-container'>
                    <Controls 
                         onSort={this.sortItemsHandler} 
                         category={this.state.currentCategory}
                         onInStockClick={this.inStockClickHandler}
                         numberOfProductsInCategory={this.state.numberOfProductsInCategory}
                         numberOnShownProducts={this.state.productsToShow.length}/>
                </div>
                    <ShopSideBar
                        clickOnCategory={this.sideBarCategoryClickHandler}
                        clickOnSubcategory={this.sideBarSubcategoryClickHandler}
                        toggleCategoryMenu={this.toggleCategoryMenuHandler}
                    shownCategoryMenu={this.state.shownCategoryMenu}/>
                <div className="sm-only controls-container">
                    <Controls 
                         onSort={this.sortItemsHandler} 
                         category={this.state.currentCategory}
                         onInStockClick={this.inStockClickHandler}
                         numberOfProductsInCategory={this.state.numberOfProductsInCategory}
                         numberOnShownProducts={this.state.productsToShow.length}/>
                </div>
                <ItemsGallery 
                    onUnmount={this.resetSort}
                    productsToShow={this.state.productsToShow}/>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import SubcategoryPage from '../../components/SubcategoryPage/SubcategoryPage';
import PropsRoute from '../../hoc/Routes/PropsRoute';
import './Shop.css';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';


class Shop extends Component {

    state = {
        sort: {
            sortBy: 'none',
            order: 'none'
        },
        showInStockOnly: false,
        currentCategory: 'all',
        currentSubcategory: 'all'
    };


    componentDidMount(){

        if(this.props.match.params.category || this.props.match.params.subcategory){
            if(this.props.match.params.category === 'all'){
                this.props.history.replace('/shop');
            }
            else {
                const currentURLCategory = (this.props.match.params.category &&  this.props.categoriesByIds[this.props.match.params.category]) ? this.props.match.params.category : 'all';
                const currentURLSubcategory = (currentURLCategory !== 'all' && this.props.match.params.subcategory && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory]) ? this.props.match.params.subcategory : 'all';
                if(currentURLCategory !== 'all'){
                    this.setState({currentCategory: currentURLCategory, currentSubcategory: currentURLSubcategory});
                }
                if(currentURLSubcategory !== 'all'){
                    this.setState({currentCategory: currentURLCategory, currentSubcategory: currentURLSubcategory});
                }
            
                if(currentURLCategory === 'all'){
                    this.props.history.replace('/shop');
                }
                else if(currentURLSubcategory === 'all' && this.props.match.params.subcategory){
                    this.props.history.replace('/shop/' + currentURLCategory)
                }
            }
        }
    };


    sideBarCategoryClickHandler = (event, categoryClicked) => {
        if(this.state.currentCategory === categoryClicked){
            // event.target.parentElement.classList.toggle('show-subcat');
            this.props.history.replace('/shop');
            this.setState({currentCategory: 'all', currentSubcategory: 'all'});
        }
        else {
            this.props.history.replace(`/shop/${categoryClicked}`);
            this.setState({currentCategory: categoryClicked, currentSubcategory: 'all'});
            // event.target.parentElement.classList.add('show-subcat');
        };
        // event.target.parentElement.classList.toggle('show-subcat');
    };

    sideBarSubcategoryClickHandler = (subcategoryClicked) => {

        this.setState({currentSubcategory: subcategoryClicked});
    }


    showCategoriesHandler = (event) => {
        event.target.parentElement.classList.toggle('show-categories');
    }

    hideCategoryMenuHandler = (element) => {
       console.log(element);
       element.parentElement.parentElement.parentElement.parentElement.parentElement
       .parentElement.parentElement.classList.toggle('show-categories');
    }

    sortItemsHandler = (sortCriteria) => {
        const sortDate = sortCriteria.split('_');
        console.log(sortDate);
        this.setState({
            sort: {
                sortBy: sortDate[0],
                order: sortDate[1]
            }
        });
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
        this.setState( ( prevState ) => {
            return { showInStockOnly: !prevState.showInStockOnly };
        } );
    }






    sortAlphabetical = (items, order) => {
        items.sort((a, b) => {
            console.log(a);
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
            items = items.reverse(); 
        }
        return items;
    };
    
    sortNumbers = (items, criteria, order) => {
        items.sort((a, b) => {
            return a[criteria] - b[criteria];
        });
        if(order === 'descending'){
            items = items.reverse(); 
        }
        return items;
    };



    render(){
        console.log(this.props);
        // const categoryPageRoute = !this.props.match.params.subcategory && this.props.categoriesByIds[this.props.match.params.category] ?  (
        //     <PropsRoute path='/shop/:category'
        //         component={SubcategoryPage}
        //         clickOnCategory={this.sideBarCategoryClickHandler}
        //         onSort={this.sortItemsHandler}
        //         sort={this.state.sort}
        //         onUnmount={this.resetSort}
        //         showCategories={this.showCategoriesHandler}
        //         hideCategoryMenu={this.hideCategoryMenuHandler}
        //         onInStockClick={this.inStockClickHandler}
        //         showInStockOnly={this.state.showInStockOnly}/> 
        // ) : null;
        // const subcategoryPageRoute = this.props.categoriesByIds[this.props.match.params.category] && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory] ?
        //     <PropsRoute 
        //         path='/shop/:category/:subcategory' exact 
        //         component={SubcategoryPage}
        //         clickOnCategory={this.sideBarCategoryClickHandler}
        //         onSort={this.sortItemsHandler}
        //         sort={this.state.sort}
        //         onUnmount={this.resetSort}
        //         showCategories={this.showCategoriesHandler}
        //         hideCategoryMenu={this.hideCategoryMenuHandler}
        //         onInStockClick={this.inStockClickHandler}
        //         showInStockOnly={this.state.showInStockOnly}/> : null;
        return (
            <div className='shop'>
                <Switch>
                    {/* {categoryPageRoute}
                    {subcategoryPageRoute} */}
                <PropsRoute 
                        path='/shop/:category/:subcategory'
                        component={SubcategoryPage}
                        clickOnCategory={this.sideBarCategoryClickHandler}
                        onSort={this.sortItemsHandler}
                        sort={this.state.sort}
                        onUnmount={this.resetSort}
                        showCategories={this.showCategoriesHandler}
                        hideCategoryMenu={this.hideCategoryMenuHandler}
                        onInStockClick={this.inStockClickHandler}
                        showInStockOnly={this.state.showInStockOnly}
                        currentCategory={this.state.currentCategory}
                        currentSubcategory={this.state.currentSubcategory}
                        clickOnSubcategory={this.sideBarSubcategoryClickHandler}/>
                <PropsRoute 
                        path='/shop/:category'
                        component={SubcategoryPage}
                        clickOnCategory={this.sideBarCategoryClickHandler}
                        onSort={this.sortItemsHandler}
                        sort={this.state.sort}
                        onUnmount={this.resetSort}
                        showCategories={this.showCategoriesHandler}
                        hideCategoryMenu={this.hideCategoryMenuHandler}
                        onInStockClick={this.inStockClickHandler}
                        showInStockOnly={this.state.showInStockOnly}
                        currentCategory={this.state.currentCategory}
                        currentSubcategory={this.state.currentSubcategory}
                        clickOnSubcategory={this.sideBarSubcategoryClickHandler}/>
                <PropsRoute 
                        path='/shop'
                        component={SubcategoryPage}
                        clickOnCategory={this.sideBarCategoryClickHandler}
                        onSort={this.sortItemsHandler}
                        sort={this.state.sort}
                        onUnmount={this.resetSort}
                        showCategories={this.showCategoriesHandler}
                        hideCategoryMenu={this.hideCategoryMenuHandler}
                        onInStockClick={this.inStockClickHandler}
                        showInStockOnly={this.state.showInStockOnly}
                        currentCategory={this.state.currentCategory}
                        currentSubcategory={this.state.currentSubcategory}
                        clickOnSubcategory={this.sideBarSubcategoryClickHandler}/>
                <Route render={() => <Redirect to='/shop'/>}/> 
                </Switch>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        categoriesAndSubcat: state.categoriesAndSubcat,
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    };
};

export default connect(mapStateToProps)(Shop);
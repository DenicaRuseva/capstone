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
        }
    };


    sideBarCategoryClickHandler = (event, categoryClicked, currentCategory) => { //MUST FIX
        if(currentCategory === categoryClicked){
            // event.target.parentElement.classList.toggle('show-subcat');
            
            this.props.history.replace('/shop');
        }
        else {
            this.props.history.replace(`/shop/${categoryClicked}`);
            // event.target.parentElement.classList.add('show-subcat');
        };
        event.target.parentElement.classList.toggle('show-subcat');
    };


    showCategoriesHandler = (event) => {
        event.target.parentElement.classList.toggle('show-categories');
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

    render(){
        console.log(this.props);
        const categoryPageRoute = !this.props.match.params.subcategory && this.props.categoriesByIds[this.props.match.params.category] ?  (
            <PropsRoute path='/shop/:category'
                component={SubcategoryPage}
                clickOnCategory={this.sideBarCategoryClickHandler}
                onSort={this.sortItemsHandler}
                sort={this.state.sort}
                onUnmount={this.resetSort}
                showCategories={this.showCategoriesHandler}/> 
        ) : null;
        const subcategoryPageRoute = this.props.categoriesByIds[this.props.match.params.category] && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory] ?
            <PropsRoute 
                path='/shop/:category/:subcategory' exact 
                component={SubcategoryPage}
                clickOnCategory={this.sideBarCategoryClickHandler}
                onSort={this.sortItemsHandler}
                sort={this.state.sort}
                onUnmount={this.resetSort}
                showCategories={this.showCategoriesHandler}/> : null;
        return (
            <div className='shop'>
                <Switch>
                    {categoryPageRoute}
                    {subcategoryPageRoute}
                <PropsRoute 
                        path='/shop' exact
                        component={SubcategoryPage}
                        clickOnCategory={this.sideBarCategoryClickHandler}
                        onSort={this.sortItemsHandler}
                        sort={this.state.sort}
                        onUnmount={this.resetSort}
                        showCategories={this.showCategoriesHandler}/>
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
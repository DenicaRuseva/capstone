import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import CategoriesPage from '../../components/CategoriesPage/CategoriesPage';
import SubcategoryPage from '../../components/SubcategoryPage/SubcategoryPage';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import PropsRoute from '../../hoc/Routes/PropsRoute';
import './Shop.css';


class Shop extends Component {

    state = {
        sort: {
            sortBy: 'none',
            order: 'none'
        }
    };


    sideBarCategoryClickHandler = (event, categoryClicked, currentCategory) => { //MUST FIX
        if(currentCategory === categoryClicked){
            event.target.parentElement.classList.toggle('show-subcat');
            this.props.history.replace('/shop');
        }
        else {
            this.props.history.replace(`/shop/${categoryClicked}`);
            event.target.parentElement.classList.add('show-subcat');
        };
    };

    sideBarOnSubcategoryPageCategoryClickHandler = (event, categoryClicked, currentCategory) => { //MUST FIX
        if(currentCategory === categoryClicked){
            event.target.parentElement.classList.toggle('show-subcat');
            this.props.history.replace(`/shop/all/all`);
        }
        else {
            event.target.parentElement.classList.add('show-subcat');
            this.props.history.replace(`/shop/${categoryClicked}/all`);
        };
    };

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
                        component={CategoriesPage}
                        categoriesAndSubcat={this.props.categoriesAndSubcat}
                        clickOnCategory={this.sideBarCategoryClickHandler}/> 
        ) : null;
        const subcategoryPageRoute = this.props.categoriesByIds[this.props.match.params.category] && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory] ?
            <PropsRoute 
                path='/shop/:category/:subcategory' exact 
                component={SubcategoryPage}
                clickOnCategory={this.sideBarCategoryClickHandler}
                onSort={this.sortItemsHandler}
                sort={this.state.sort}
                onUnmount={this.resetSort}/> : null;
        return (
            <WithoutRootDiv>
                <Switch>
                {subcategoryPageRoute}
                {categoryPageRoute}
                <PropsRoute 
                        path='/shop' exact
                        component={CategoriesPage} 
                        categoriesAndSubcat={this.props.categoriesAndSubcat}
                        clickOnCategory={this.sideBarCategoryClickHandler}/>
                <Route render={() => <Redirect to='/shop'/>}/> 
                </Switch>
            </WithoutRootDiv>
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
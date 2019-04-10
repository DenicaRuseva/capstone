import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import CategoriesPage from '../../components/CategoriesPage/CategoriesPage';
import SubcategoryPage from '../../components/SubcategoryPage/SubcategoryPage';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import PropsRoute from '../../hoc/Routes/PropsRoute';
import './Shop.css';


class Shop extends Component {

    componentDidMount(){
  
    };

    sideBarCategoryClickHandler = (event, categoryClicked, currentCategory) => {
        if(currentCategory === categoryClicked){
            // this.setState({currentCategory: 'all', currentSubcategory: 'all'});
            event.target.parentElement.classList.toggle('show-subcat');
            this.props.history.replace('/shop');
        }
        else {
            // this.setState({currentCategory: category, currentSubcategory: 'all'});
            this.props.history.replace(`/shop/${categoryClicked}`);
            event.target.parentElement.classList.add('show-subcat');
        };
    };

    // categoryRoutExist = (category) => {
    //     console.log(Object.keys(this.props.categoriesAndSubcat).length);
    //     let existingRoute = false;
    //     for(let i=0; i<Object.keys(this.props.categoriesAndSubcat).length; i++){
    //         if(this.props.categoriesAndSubcat[i].category === category){
    //             existingRoute = true;
    //             i=Object.keys(this.props.categoriesAndSubcat).length;
    //         };
    //     };
    //     return existingRoute;
    // };

    render(){
        // console.log(this.categoryRoutExist(this.props.match.params.category));
        const categoryPageRoute = !this.props.match.params.subcategory && this.props.categoriesByIds[this.props.match.params.category] ?  (
            <PropsRoute path='/shop/:category'
                        component={CategoriesPage}
                        categoriesAndSubcat={this.props.categoriesAndSubcat}
                        clickOnCategory={this.sideBarCategoryClickHandler}/> 
        ) : null;
        const subcategoryPageRoute = this.props.categoriesByIds[this.props.match.params.category] && this.props.categoriesByIds[this.props.match.params.category][this.props.match.params.subcategory] ?
            <Route path='/shop/:category/:subcategory' exact 
            component={SubcategoryPage}/> : null;
        return (
            <WithoutRootDiv>
                <Switch>
                {/* <Route path='/shop/:category/:subcategory' exact component={SubcategoryPage}/>  */}
                {subcategoryPageRoute}
                {categoryPageRoute}
                {/* <PropsRoute path='/shop/:category' exact
                        component={CategoriesPage}
                        categoriesAndSubcat={this.props.categoriesAndSubcat}
                        clickOnCategory={this.sideBarCategoryClickHandler}/> */}
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
        // loading: state.loadingShop,
        categoriesAndSubcat: state.categoriesAndSubcat,
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    };
};

export default connect(mapStateToProps)(Shop);
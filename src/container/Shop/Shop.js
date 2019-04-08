import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoriesPage from '../../components/CategoriesPage/CategoriesPage';
import SubcategoryPage from '../../components/SubcategoryPage/SubcaategoryPage';
import WithoutRootDiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import PropsRoute from '../../hoc/PropsRoute/PropsRoute';
import './Shop.css';


class Shop extends Component {

    // state = {
    //     currentCategory: 'all',
    //     currentSubcategory: 'all'
    // }

    componentDidMount(){
        console.log('in cdm Shop');
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

    render(){
        console.log(this.props);
        const shop = this.props.loading ? <div>spinner</div> : (
            <WithoutRootDiv>
                <Switch>
                    <Route path='/shop/:category/:subcategory' exact component={SubcategoryPage}/>  
                    <PropsRoute 
                        path='/shop/:category' 
                        component={CategoriesPage} 
                        categoriesAndSubcat={this.props.categoriesAndSubcat}
                        clickOnCategory={this.sideBarCategoryClickHandler}/> 
                    <PropsRoute 
                        path='/shop' 
                        component={CategoriesPage} 
                        categoriesAndSubcat={this.props.categoriesAndSubcat}
                        clickOnCategory={this.sideBarCategoryClickHandler}/>    
                </Switch>
            </WithoutRootDiv>
        );
        return (
            <WithoutRootDiv>
            {shop}
            </WithoutRootDiv>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loadingShop,
        categoriesAndSubcat: state.categoriesAndSubcat,
        categoriesByIds: state.categoriesByIds, 
        subcategoriesByIds: state.subcategoriesByIds,
    };
};

export default connect(mapStateToProps)(Shop);
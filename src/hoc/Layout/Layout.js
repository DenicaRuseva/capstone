import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Carousel from '../../container/Carousel/Carousel';
import Shop from '../../container/Shop/Shop';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PropsRoute from '../Routes/PropsRoute';
import Cart from '../../components/Cart/Cart';
import { Route, Switch } from 'react-router-dom';
import './Layout.css';
import WithoutRootDiv from '../WithoutRootDiv/WithoutRootDiv';


class Layout extends React.Component {

    state = {
        showSideDrawer: false,
        productsInCart: []
    }

    componentDidMount(){
        console.log('CDM Layout');
        this.props.onFetchProducts();
    };

    toggleSideDrawerHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    addProductsInCartHandler = (product) => {
        const productsInCart = this.state.productsInCart.concat(product);
        this.setState({productsInCart: productsInCart});
    };

    render(){
        console.log('in render layout');
        const shopRoute = this.props.loadingShop ? <Route path='/shopping' render={() => <div>spiner</div>}/> : (
            <WithoutRootDiv>
                {/* rubric34 */}
                <Switch>
                    <PropsRoute path='/shopping/:category/:subcategory' component={Shop} onUnmount={this.addProductsInCartHandler}/>
                    <PropsRoute path='/shopping/:category' component={Shop} onUnmount={this.addProductsInCartHandler}/>
                    <PropsRoute path="/shopping" component={Shop} onUnmount={this.addProductsInCartHandler}/>
                </Switch>
            </WithoutRootDiv>
        );
        return(
            <div className='layout'>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer showSideDrawer={this.state.showSideDrawer}/>
                <main className='main'>
                    <Switch>
                    <PropsRoute path='/cart' component={Cart} products={this.state.productsInCart}/>

                        <Route path="/" exact component={Carousel}/>
                        {shopRoute}
                        <Route render={() => this.props.history.replace('/')}/>
                    </Switch>
                </main>
                <div style={{height: '56px', backgroundColor: 'blue'}}>footer</div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loadingShop: state.loadingShop
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => {dispatch(action.fetchProducts())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
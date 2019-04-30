import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Carousel from '../../container/Carousel/Carousel';
import Shop from '../../container/Shop/Shop';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import PropsRoute from '../Routes/PropsRoute';
import Cart from '../../container/Cart/Cart';
import ContactPage from '../../container/ContactPage/ContactPage';
import Product from '../../components/Product/Product';
import Footer from '../../components/Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import About from '../../components/About/About';
import './Layout.css';
import WithoutRootDiv from '../WithoutRootDiv/WithoutRootDiv';
import WithErrorHandler from '../WithErrorHandler/WithErrorHandler';
import axios from 'axios';


class Layout extends Component {

    state = {
        showSideDrawer: false,
        productsInCart: [],
        quantityOfEachProduct: [],
        totalPrice: 0,
        orderMade: false,
        selectedProduct: ''
    }

    componentDidMount(){
        console.log('CDM Layout');
        this.props.onFetchProducts();
    };

    toggleSideDrawerHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    };


    /* rubric44 */
    addProductToCartHandler = (productId, quantity = 1) => {
        if(quantity === 0){
            return;
        };
        const updatedTotalPrice = this.state.totalPrice + this.props.allProducts[productId].price*quantity; 
        let updatedProductsInCart = [...this.state.productsInCart];
        let updatedQuantity = [...this.state.quantityOfEachProduct];
            if (this.state.productsInCart.indexOf(this.props.allProducts[productId]) === -1) {
                updatedProductsInCart.push(this.props.allProducts[productId]);
                updatedQuantity.push(quantity*1);
            } else {
                let indexOfProduct = this.state.productsInCart.indexOf(this.props.allProducts[productId]);
                updatedQuantity[indexOfProduct] = updatedQuantity[indexOfProduct] + quantity*1;
            };
        
        this.setState({
            productsInCart: updatedProductsInCart,
            quantityOfEachProduct: updatedQuantity,
            totalPrice: updatedTotalPrice
        });
    };


    // rubric53, // rubric54, rubric55
    removeProductHandller = (index) => {
        const updatedTotalPrice = this.state.totalPrice - parseFloat(this.state.productsInCart[index].price*1)*(this.state.quantityOfEachProduct[index]*1); 
        const newProducts = this.state.productsInCart.filter((_, i) => i !== index);
        const newQuantities = this.state.quantityOfEachProduct.filter((_, i) => i !== index);
        console.log(updatedTotalPrice);

        this.setState({
            productsInCart: newProducts,
            quantityOfEachProduct: newQuantities,
            totalPrice: updatedTotalPrice
        });
    };

    // rubric53, rubric55
    changeQuantityHandler = (event, index) => {
        const updatedTotalPrice = this.state.totalPrice*1 - parseFloat(this.state.productsInCart[index].price*1)*(this.state.quantityOfEachProduct[index]*1) +
        (this.state.productsInCart[index].price*1) * parseInt(event.target.value); 
        let newQuantities = [...this.state.quantityOfEachProduct];
        newQuantities[index] = parseInt(event.target.value);
        this.setState({quantityOfEachProduct: newQuantities, totalPrice: updatedTotalPrice});
    };

    makeOrderHandler = (formIsValid) => {
       if(formIsValid){
            this.setState({
                orderMade: true
            });  
       };
       return;
    };

    resetProductsInCatrHandler = () => {
        this.props.history.replace('/');
        this.setState({productsInCart: [], quantityOfEachProduct: [], totalPrice: [], orderMade: false})
    };

    showProductPageHandler = (id) => {
        this.setState({selectedProduct: id});
        const url = "/product?name=" + this.props.allProducts[id].name;
        this.props.history.push(url);
    };

    render(){
        console.log('in render layout');
        console.log(!this.props.allProducts.length);
        const carouselRoute = this.props.loadingCarousel ? 
        <Route path="/" exact render={() => <Spinner/>}/> : 
        <PropsRoute path="/" exact 
        component={ Carousel } 
        showProductPage={(id) => this.showProductPageHandler(id)}
        addProductToCart={this.addProductToCartHandler}
        />
        const shopRoute = this.props.loadingShop ? <Route path='/shopping' render={() => <Spinner/>}/> : (
            <WithoutRootDiv>
                {/* rubric34 */}
                <Switch>
                    <PropsRoute path='/shopping/:category/:subcategory' component={Shop} addProductToCart={this.addProductToCartHandler} showProductPage={(id) => this.showProductPageHandler(id)}/>
                    <PropsRoute path='/shopping/:category' component={Shop} addProductToCart={this.addProductToCartHandler} showProductPage={(id) => this.showProductPageHandler(id)}/>
                    <PropsRoute path="/shopping"  exact component={Shop} addProductToCart={this.addProductToCartHandler} showProductPage={(id) => this.showProductPageHandler(id)}/>
                </Switch>
            </WithoutRootDiv>
        );
        const productsRoute = this.props.allProducts.length ?  
            <PropsRoute path='/product' 
            component={Product}
            addProductToCart={this.addProductToCartHandler}
            product={this.state.selectedProduct}
            /> : <Spinner/>
        return(
            <div className='layout'>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer showSideDrawer={this.state.showSideDrawer} hideSideDrawer={this.toggleSideDrawerHandler}/>
                <main className='main'>
                    <Switch>
                    {productsRoute}
                   
                    {/* rubric56 */}
                    <PropsRoute 
                        path='/cart' 
                        exact
                        component={Cart} 
                        products={this.state.productsInCart} 
                        productsQuantities={this.state.quantityOfEachProduct}
                        changeQuantity={this.changeQuantityHandler}
                        removeProduct={this.removeProductHandller}
                        orderMade={this.state.orderMade}
                        totalPrice={this.state.totalPrice}
                        makeOrder={this.makeOrderHandler}
                        cleanState={this.resetProductsInCatrHandler}/>
                    <Route path="/contact" exact component={ContactPage}/>
                    <Route path='/about' exact component={About}/>
                    {carouselRoute} 
                    {shopRoute}
                    <Route render={() => this.props.history.replace('/')}/> 
                    </Switch>
                </main>
                <Footer/>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loadingShop: state.loadingShop,
        loadingCarousel: state.loadingCarousel,
        allProducts: state.allProducts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => {dispatch(action.fetchProducts())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Layout, axios));
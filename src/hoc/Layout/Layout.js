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
import { Route, Switch, Redirect } from 'react-router-dom';
import './Layout.css';
import WithoutRootDiv from '../WithoutRootDiv/WithoutRootDiv';


class Layout extends Component {

    state = {
        showSideDrawer: false,
        productsInCart: [],
        quantityOfEachProduct: [],
        totalPrice: 0,
        orderMade: false
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

    addProductToCartHandler = (product) => {
        const updatedTotalPrice = this.state.totalPrice + product.price*1; 
        let updatedProductsInCart = [...this.state.productsInCart];
        let updatedQuantity = [...this.state.quantityOfEachProduct];
            if (this.state.productsInCart.indexOf(product) === -1) {
                updatedProductsInCart.push(product);
                updatedQuantity.push(1);
            } else {
                let indexOfProduct = this.state.productsInCart.indexOf(product);
                updatedQuantity[indexOfProduct] = updatedQuantity[indexOfProduct] + 1;
            };
            console.log(updatedTotalPrice);
        
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
        console.log(updatedTotalPrice);
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

    render(){
        console.log('in render layout');
        const shopRoute = this.props.loadingShop ? <Route path='/shopping' render={() => <div>spinner</div>}/> : (
            <WithoutRootDiv>
                {/* rubric34 */}
                <Switch>
                    <PropsRoute path='/shopping/:category/:subcategory' component={Shop} addProductToCart={this.addProductToCartHandler}/>
                    <PropsRoute path='/shopping/:category' component={Shop} addProductToCart={this.addProductToCartHandler}/>
                    <PropsRoute path="/shopping" exact component={Shop} addProductToCart={this.addProductToCartHandler}/>
                </Switch>
            </WithoutRootDiv>
        );
        const productsRout = this.props.loadingShop ? 
        <Route path='/product' render={() => <div>spinner</div>}/> : <Route path='/product' component={Shop}/>;
        return(
            <div className='layout'>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer showSideDrawer={this.state.showSideDrawer} hideSideDrawer={this.toggleSideDrawerHandler}/>
                <main className='main'>
                    <Switch>
                    {productsRout}
                    {/* rubric56 */}
                    <PropsRoute 
                    path='/cart' 
                    component={Cart} 
                    products={this.state.productsInCart} 
                    productsQuantities={this.state.quantityOfEachProduct}
                    changeQuantity={this.changeQuantityHandler}
                    removeProduct={this.removeProductHandller}
                    orderMade={this.state.orderMade}
                    totalPrice={this.state.totalPrice}
                    makeOrder={this.makeOrderHandler}
                    cleanState={this.resetProductsInCatrHandler}/>
                    <Route path="/contact" component={ContactPage}/>
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
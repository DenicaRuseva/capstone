import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Carousel from '../../container/Carousel/Carousel';
import Shop from '../../container/Shop/Shop';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { Route, Switch } from 'react-router-dom';
import './Layout.css';


class Layout extends React.Component {

    componentDidMount(){
        console.log('CDM Layout');
        this.props.onFetchProducts();
    }; 

    render(){
        console.log('in render layout');
        const shopRoute = this.props.loadingShop ? <Route path='/shop' render={() => <div>spiner</div>}/> : (
            <Switch>
                <Route path='/shop/:category/:subcategory' component={Shop}/>
                <Route path='/shop/:category' component={Shop}/>
                <Route path="/shop" component={Shop}/>
            </Switch>
        );
        return(
            <div className='layout'>
                <Toolbar/>
                <main className='main'>
                    <Switch>
                        <Route path="/" exact component={Carousel}/>
                        {shopRoute}
                    </Switch>
                </main>
                <div>footer</div>
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
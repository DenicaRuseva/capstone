import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Carousel from '../../container/Carousel/Carousel';
import Shop from '../../container/Shop/Shop';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';


class Layout extends Component {

    componentDidMount(){
        console.log('CDM Layout');
        this.props.onFetchProducts();
    }; 

    render(){
        console.log('in render layout');
        console.log(this.props);
        const shopRoutes = this.props.loadingShop ? null : (
            this.props.shopRoutes.map((route, i) => {
                return <Route key={i+route} path={route} exact component={Shop}/>
            })
        );
        return(
            <div>
                <div>header</div>
                <main>
                    <Switch>
                        <Route path="/" exact component={Carousel}/>
                        {shopRoutes}
                        <Route path='/shop' exact component={Shop}/>
                    </Switch>
                </main>
                <div>footer</div>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loadingShop: state.loadingShop,
        shopRoutes: state.shopRoutes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => {dispatch(action.fetchProducts())}
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
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
        // const shopRoutes = this.props.loadingShop ? null : (
        //     this.props.shopRoutes.map((route, i) => {
        //         return <Route key={i+route} path={route} exact component={Shop}/>
        //     })
        // );
        return(
            <div className='layout'>
                <Toolbar/>
                <main className='main'>
                    <Switch>
                        <Route path="/" exact component={Carousel}/>
                        {/* {shopRoutes} */}
                        <Route path='/shop' component={Shop}/>
                    </Switch>
                </main>
                <div>footer</div>
            </div>
        )
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => {dispatch(action.fetchProducts())}
    }
};

export default connect(null, mapDispatchToProps)(Layout);
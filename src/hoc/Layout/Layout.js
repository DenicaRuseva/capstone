import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Carousel from '../../container/Carousel/Carousel';
import Shop from '../../container/Shop/Shop';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { Route, Switch } from 'react-router-dom';
import './Layout.css';


class Layout extends React.Component {

    state = {
        showSideDrawer: false
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

    render(){
        console.log('in render layout');
        const shopRoute = this.props.loadingShop ? <Route path='/shop' render={() => <div>spiner</div>}/> : (
            <Switch>
                {/* rubric34 */}
                <Route path='/shoping/:category/:subcategory' component={Shop}/>
                <Route path='/shoping/:category' component={Shop}/>
                <Route path="/shoping" component={Shop}/>
            </Switch>
        );
        return(
            <div className='layout'>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer showSideDrawer={this.state.showSideDrawer}/>
                <main className='main'>
                    <Switch>
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
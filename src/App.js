import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Shop from './container/Shop/Shop';
import Carousel from './container/Carousel/Carousel';
// import { connect } from 'react-redux';
// import * as action from './store/actions/index';

class App extends Component {

  componentDidMount(){
    console.log('in CDM App');
  } 

  render() {
    console.log('in render app');

    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Carousel} />
          <Route path='/shop/:category/:subcategory' component={Shop}/>
          <Route path="/shop/:category" component={Shop}/>
          <Route path="/shop" component={Shop}/>
        </Switch>
      </Layout>
    );
  }
};

export default App;

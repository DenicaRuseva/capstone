import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route } from 'react-router-dom';
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
        <Route path="/" exact component={Carousel} />
        <Route path="/shop" exact component={Shop}/>
      </Layout>
    );
  }
};

export default App;

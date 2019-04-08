import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


library.add(faShoppingCart);


class App extends Component {

  componentDidMount(){
    console.log('in CDM App');
  } 

  render() {
    console.log('in render app');

    return (
      <Layout/>
    );
  }
};

export default App;

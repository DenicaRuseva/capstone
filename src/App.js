import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';


class App extends Component {

  componentDidMount(){
    console.log('in CDM App');
  } 

  render() {
    console.log('in render app');

    return (
      <Layout>
      </Layout>
    );
  }
};

export default App;

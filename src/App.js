import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route } from 'react-router-dom';
import Shop from './container/Shop/Shop';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact render={() => <div>carusel</div>} />
        <Route path="/shop" exact component={Shop}/>
      </Layout>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact render={() => <div>carusel</div>} />
        <Route path="/shop" exact render={() => <div>shop</div>}/>
      </Layout>
    );
  }
}

export default App;

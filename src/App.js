import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faStar} from '@fortawesome/free-solid-svg-icons';
import { Route, Switch } from 'react-router-dom';


library.add(faShoppingCart);
library.add(faStar);


class App extends Component {

  componentDidMount(){
    console.log('in CDM App');
  } 

  render() {
    console.log('in render app');

    return (
      <Switch>
        <Route to='/' exact component={Layout}/>
      </Switch>
      
    );
  }
};

export default App;

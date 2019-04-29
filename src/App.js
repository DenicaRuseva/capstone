import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faShoppingCart, faStar, faChevronDown, faMinusCircle, faMapMarkerAlt,faPhone, faAt, faArrowAltCircleLeft, faImage, faAngleLeft, faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import { Route } from 'react-router-dom';


library.add(faShoppingCart);
library.add(faStar);
library.add(faChevronDown);
library.add(faMinusCircle);
library.add(faMapMarkerAlt);
library.add(faPhone);
library.add(faAt);
library.add(faArrowAltCircleLeft);
library.add(faImage);
library.add(faAngleLeft);
library.add(faAngleRight);







class App extends Component {

  componentDidMount(){
    console.log('in CDM App');
  } 

  render() {
    console.log('in render app');

    return (
      <Route to='/' component={Layout}/>
    );
  }
};

export default App;

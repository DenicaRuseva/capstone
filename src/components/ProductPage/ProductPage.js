import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Product from './Product/Product';

const productPage = (props) => {
        const productUrl = props.history.location.search.split("=").pop();
        let validUrl = false;
        let product;
        for(let i = 0; i < props.allProducts.length; i++) {
            if (encodeURI(props.allProducts[i].name) == productUrl) {
                validUrl = true;
                product = props.allProducts[i];
                i = props.allProducts.length;
            };
        };
        const productPage = validUrl ? <Product product={product}/> : <Redirect to='/shopping'/>
        return <div>{productPage}</div>
};
  


const mapStateToProps = state => {
    return {
        allProducts: state.allProducts
    }
}

export default connect(mapStateToProps)(productPage);
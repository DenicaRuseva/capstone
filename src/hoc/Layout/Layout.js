import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class Layout extends Component {

    componentDidMount(){
        this.props.onFetchProducts();
    }

    render(){
        return(
            <div>
                <div>header</div>
                <div>carusel</div>
                <div>shop</div>
                <div>footer</div>
            </div>
        )
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => {dispatch(action.fetchProducts())}
    }
};

export default connect( null, mapDispatchToProps)(Layout);
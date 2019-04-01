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
                <main>
                    {this.props.children}
                </main>
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
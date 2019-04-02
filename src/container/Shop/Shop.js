import React, { Component } from 'react';
import ShopSideBar from '../../components/ShopSideBar/ShopSideBar';
import { connect } from 'react-redux';

class Shop extends Component {

    componentDidMount(){
        console.log('in cdm Shop');
    };

    render(){
        console.log('in render shop');
        console.log(this.props.categoriesAndSubcat);
        const shop = this.props.loading ? <div>spinner</div> : 
            (
                <div>
                    <ShopSideBar 
                        categoriesAndSubcat={this.props.categoriesAndSubcat}/>
                    <div>img gallery</div>
                </div>
            )
        return (
            <div>{shop}</div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loadingShop,
        allProducts: state.allProducts,
        categoriesAndSubcat: state.categoriesAndSubcat,
        subcategories: state.subcategories
    }
}

export default connect(mapStateToProps)(Shop);
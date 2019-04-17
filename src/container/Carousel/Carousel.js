import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Carousel extends Component {
    
    

    componentDidMount(){
        console.log('in cdm Carousel');
    };


    render(){
        const carousel = this.props.loading ? <div>spinner</div> : <div>carousel</div>
        return (
            <div>
                <div>{carousel}</div>
                <Link to='/shopping'><button>Shop All</button></Link>
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loadingCarousel,
        carouselProducts: state.carouselProducts
    };
};

export default connect(mapStateToProps)(Carousel);
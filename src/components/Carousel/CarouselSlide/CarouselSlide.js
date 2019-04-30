import React, {Component } from 'react';
import './CarouselSlide.css';
import { connect } from 'react-redux';



class CarouselSlide extends Component {

    render(){
        const attachedClassess = this.props.id === this.props.currentSlideId ? 'carousel-slide shown' : 'carousel-slide';
        const images = this.props.imagesIds.map((id, i) => {
            return (
                <div key={i} className='img-container-carousel' onClick={() => this.props.showProduct(id)}>
                    <img 
                        src={this.props.allProducts[id].imagelink}
                        height='200px'
                    />
                </div>
            )
        })
        
        
    return (
        <div className={attachedClassess}>
            {images}
        </div>
    );
    }
};

   

const mapStateToProps = state => {
    return {
        allProducts: state.allProducts,
        carouselProducts: state.carouselProducts
    };
};

export default connect(mapStateToProps)(CarouselSlide);
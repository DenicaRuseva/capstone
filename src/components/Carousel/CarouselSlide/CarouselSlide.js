import React from 'react';
import './CarouselSlide.css';
import { connect } from 'react-redux';



const carouselSlide = (props) => {

        const attachedClassess = props.id === props.currentSlideId ? 'carousel-slide shown' : 'carousel-slide'; //rubric11
        const images = props.imagesIds.map((id, i) => {
            return (
                <div key={i} className='img-container-carousel' onClick={() => props.showProduct(id)}>
                    <img 
                        src={props.allProducts[id].imagelink}
                    />
                </div>
            )
        })
        
        
    return (
        <div className={attachedClassess}>
            {images}
        </div>
    );
};

   

const mapStateToProps = state => {
    return {
        allProducts: state.allProducts
    };
};

export default connect(mapStateToProps)(carouselSlide);
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CarouselSlide from '../../components/Carousel/CarouselSlide/CarouselSlide';
import CarouselButton from '../../components/Carousel/CarouselButton/CarouselButton';
import CarouselRadioButtons from '../../components/Carousel/CarouselRedioButtons/CarouselRadioButtons';
import WithoutRootdiv from '../../hoc/WithoutRootDiv/WithoutRootDiv';
import Button from '../../components/UI/Button/Button';
import './Carousel.css';

class Carousel extends Component {
    
    state = {
        showSlideWithId: 0,
        unmountSlider: false,
        // selectedProduct: ''
    };

    showNextSlideHandler = () => {
        const newSlideId = (this.state.showSlideWithId + 1) % 3
        // this.state.promotionalProducts.length;
        this.setState({showSlideWithId: newSlideId, unmountSlider: true});
        this.mountSlider();
    };

    showPreviousSlideHandler = () => {
        const newSlideId = (this.state.showSlideWithId + 2) % 3
        // this.state.promotionalProducts.length;
        this.setState({showSlideWithId: newSlideId, unmountSlider: true});
        this.mountSlider();
    };

    showSlideWithIdHandler = (id) => {
        this.setState({showSlideWithId: id, unmountSlider: true});
        this.mountSlider();
    };

    mountSlider = () => {
        setTimeout(() => {this.mount()}, 300)
    }

    mount = () => {
        this.setState({unmountSlider: false})
    }

    showImgHandler = (event) => {
        event.target.style.filter = 'blur(0px)';
    };

    showProductHandler = (id) => {
        this.props.showProductPage(id);
    };


    render(){
        const carousel = this.props.loading || this.state.unmountSlider ? (
           
            <div className="carousel">
                <div className='carousel-slide'></div>
                <CarouselButton 
                left 
                clicked={this.showPreviousSlideHandler}
                disabled={this.state.showSlideWithId === 0}/>
                <CarouselButton clicked={this.showNextSlideHandler}
                disabled={this.state.showSlideWithId === 2}/>
                <CarouselRadioButtons shownProductId={this.state.showProductWithId}/>
            </div>
        ) : (
            
            <div className="carousel">
                <CarouselSlide 
                currentSlideId={this.state.showSlideWithId}
                showProduct={this.props.showProductPage}
                />
                <CarouselButton 
                left 
                clicked={this.showPreviousSlideHandler}
                disabled={this.state.showSlideWithId === 0}/>
                <CarouselButton clicked={this.showNextSlideHandler}
                disabled={this.state.showSlideWithId === 2}/>
                <CarouselRadioButtons 
                shownProductId={this.state.showSlideWithId}
                clickOnButton={this.showSlideWithIdHandler}/>
            </div>
        )
        return (
            <WithoutRootdiv>
                <div className="wellcome">Wellcome</div>
                <WithoutRootdiv>{carousel}</WithoutRootdiv>
                <Link to='/shopping'><Button class='add-button shop-all-btn'>Shop All</Button></Link>
            </WithoutRootdiv>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.loadingCarousel,
        carouselProducts: state.carouselProducts,
        allProducts: state.allProducts
    };
};

export default connect(mapStateToProps)(Carousel);
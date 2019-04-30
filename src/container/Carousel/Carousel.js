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
        showSlideWithId: 0
    };

    showNextSlideHandler = () => {
        const newSlideId = (this.state.showSlideWithId + 1) % 3
        // this.state.promotionalProducts.length;
        this.setState({showSlideWithId: newSlideId});
    };

    showPreviousSlideHandler = () => {
        const newSlideId = (this.state.showSlideWithId + 2) % 3
        // this.state.promotionalProducts.length;
        this.setState({showSlideWithId: newSlideId});
    };

    showSlideWithIdHandler = (id) => {
        this.setState({showSlideWithId: id});
    };

    showImgHandler = (event) => {
        event.target.style.filter = 'blur(0px)';
    };

    showProductHandler = (id) => {
        this.props.showProductPage(id);
    };


    render(){
        const slides = this.props.carouselProducts.map((slide, id) => {
            return (
                <CarouselSlide 
                    key={id+this.props.allProducts[id].name}
                    id={id}
                    currentSlideId={this.state.showSlideWithId}
                    showProduct={this.props.showProductPage}
                    imagesIds={this.props.carouselProducts[id]}
                />
            );
        })
        return (
            <WithoutRootdiv>
                <div className="wellcome">Wellcome</div>
                
                <div className="carousel">
                    <div className='carousel-wrapp'>
                        {slides}
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
                </div>
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
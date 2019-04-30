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
        this.setState((prevState, props) => {
            return {showSlideWithId: ((prevState.showSlideWithId + 1) % this.props.carouselProducts.length)};
        });
    };

    showPreviousSlideHandler = () => {
        this.setState((prevState, props) => {
            return {showSlideWithId: ((prevState.showSlideWithId + 2) % this.props.carouselProducts.length)};
        });
    };

    showSlideWithIdHandler = (id) => {
        this.setState({showSlideWithId: id*1});
    };

    showImgHandler = (event) => {
        event.target.style.filter = 'blur(0px)';
    };

    showProductHandler = (id) => {
        this.props.showProductPage(id*1);
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
                        />
                        <CarouselButton clicked={this.showNextSlideHandler}
                        />
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
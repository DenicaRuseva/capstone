import React, {Component } from 'react';
import './CarouselSlide.css';
import { connect } from 'react-redux';



class CarouselSlide extends Component {

    state = {
        loadedImages: [...Array(4).fill(false)],
        blour: false,
        images: this.props.carouselProducts[this.props.currentSlideId].map(id => {
            return {
                src: '',
                style: {
                    // filter: 'blour(100px)'
                    // width: '20px',
                    filter: 'blur(100px)'
                    // height: '20px'
                },
                id: id
            }
        })
    };

    componentWillMount() {
        this.state.images.forEach((image, i) => {
        const src = this.props.allProducts[this.props.carouselProducts[this.props.currentSlideId][i]].imagelink
        const primaryImage = new Image()
        primaryImage.onload = () => { 
        const images = [...this.state.images] 
        images[i].src = src
        images[i].style = {
            // filter: "blour(1px)"
            // width: "100%",
            filter: 'blur(0px)'
            // height: '50%'
        };
            this.setState({
              images
            })
          }
     
          primaryImage.src = src
        });
    };

    render(){
        const images = this.state.images.map((img, i) => {
            return (
                <div key={i} className='img-container-carousel' onClick={() => {this.props.showProduct(img.id)}}>
                    <img style={img.style}
                        src={img.src}
                        height='200px'
                    />
                </div>
            )
        })
        
        
    return (
        <div className='carousel-slide'>
            {images}
        </div>
    );
    }
};

    // onLoad = (i) => {
    //     let updatedState = [...this.state.loadedImages];
    //     updatedState[i] = true;
    //     this.setState({loadedImages: updatedState});
    //     let allImgLoaded = true;
    //     for(let i = 0; i < this.state.loadedImages.length; i++){
    //         if(this.state.loadedImages[i] === false){
    //             allImgLoaded = false;
    //             i = this.state.loadedImages.length;
    //         };
    //     };
    //     if(allImgLoaded){
    //         this.makeBlour();
    //     }
    // };

    // makeBlour = () => {
    //     this.setState({blour: true})
    //     // setTimeout (this.blour(), 5000);
    // };

    // blour = () => {
    //     this.setState({blour: true})
    // }

// class CaruselSlide extends Component {
//     state = {
//         imagesLoaded: [...Array(4).fill(false)]
//     }

//     onLoadImg = (event, i) => {
//         event.target.classList.add('loaded');
//     }
//     render(){
//         // const style = {
//         //         filter: 'blur(100px)',
//         //         display: "none"
//         // };
//         const images = this.props.carouselProducts[this.props.currentSlideId].map((id, i) => {
//             return (
//                 <div key={i} className='img-container-carousel'>
//                         <img  
//                             src={this.props.allProducts[id].imagelink} 
//                             height='400px'
//                             onLoad={(event) => this.onLoadImg(event, i)}
//                         />
//                 </div>
//             );
//         });


//         return (
//             <div className='carousel-slide'>
//                 {images}
//             </div>
//         );
//     };
// };




// = (props) => {
//     let backgrounImages = props.carouselProducts[props.currentSlideId].map(id => {
//         return "url('" + props.allProducts[id].imagelink + "')"
//     });
//     console.log(backgrounImages);
//     const images = props.carouselProducts[props.currentSlideId].map((id, i) => {
        // let style = {
        //     backgroundImage: "url('" + props.allProducts[id].imagelink + "')",
        //     display: "none"
        // }
        // let style = {
        //     filter: 'blur(100px)'
        // }
        // let background = "url('" + props.allProducts[id].imagelink + "')";
        // if((i+1) % 3 === 0 ){
        //     style = {
        //         backgroundImage: "url('" + props.allProducts[id].imagelink + "')",
        //         position: 'absolute',
        //         top: "50%",
        //         transform: "tansleteX(-50%)"
        //     }
        // }
//         return (
//             <div key={i} className='img-container-carousel'>
//                     <img  
//                     src={props.allProducts[id].imagelink} 
//                     height='400px' 
//                     style={style}
//                     onLoad={(event) => props.onLoadImg(event)}
//                     />
//             </div>
//         );
//     })

//     return (
//         <div className='carousel-slide'>
//             {images}
//         </div>
    
// );
// };

const mapStateToProps = state => {
    return {
        allProducts: state.allProducts,
        carouselProducts: state.carouselProducts
    };
};

export default connect(mapStateToProps)(CarouselSlide);
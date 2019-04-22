import React, {Component} from 'react';
import './ImageContainer.css';



class ImageContainer extends Component {


    render(){
        const image = <img src={this.props.src} alt={this.props.alt} height="126.5px"
        onLoad={(event) => {
            event.target.classList.add('image-shown');
            event.target.nextElementSibling.classList.add('hide');
        }}/>;
        return (
            <div className='img-container'>
            {image}
            <div className='img-container-spinner'>spinner</div>
            </div>
        )
    }
}

export default ImageContainer;
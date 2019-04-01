import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Carousel extends Component {
    render(){
        return (
            <div>
                <div>Carousel</div>
                <Link to='/shop'><button>Shop All</button></Link>
            </div>
        )
    };
};

export default Carousel;
import React, {Component} from 'react';
import Item from './Item/Item';
import './ItemsGallery.css';


class ItemsGallery extends Component {
   

    componentWillUnmount(){
        this.props.onUnmount();
    }


    render(){

        console.log('in render items gallery');
        let items;
        if(!this.props.productsToShow[0]){
            items = <div className='items-gallery'>No items to show</div>;
        }
        else {
            items = this.props.productsToShow.map((item, i) => {
                return <Item key={item.name+i} item={item}/>;
            });
        };

        return <div className='items-gallery'>{items}</div>
    };

};

export default ItemsGallery;
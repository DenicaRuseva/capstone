import React from 'react';
import { withRouter } from 'react-router-dom';
import ShopGalleryItem from './ShopGalleryItem/ShopGalleryItem';

const shopGallery = (props) => {
    console.log(props);
    const items = props.itemsToShow.map((item, i) => {
        return <ShopGalleryItem key={i} item={item}/>
    });
    console.log(items);

    return(
        <div>{items}</div>
    );
};

export default withRouter(shopGallery);
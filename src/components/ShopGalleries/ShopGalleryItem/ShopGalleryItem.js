import React from 'react';

const shopGalleryItem = (props) => (
    <div>
        <img style={{width: "200px"}} src={props.item.imagelink}/>
    </div>
);

export default shopGalleryItem;
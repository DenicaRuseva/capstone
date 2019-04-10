import React from 'react';

const item = (props) => (
    <div>
        <img style={{width: "200px"}} src={props.item.imagelink}/>
        <div>
            name: {props.item.name} <br/>
            price: {props.item.price} <br/>
            rating: {props.item.rating} <br/>
        </div>
    </div>
);

export default item;
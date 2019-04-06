import React from 'react';

const item = (props) => (
    <div>
        <img style={{width: "200px"}} src={props.item.imagelink}/>
    </div>
);

export default item;
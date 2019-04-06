import React from 'react';
import './Subcategory.css';

const subcategory = (props) => (
    <div className='col-el-2-12 col-l-1-5 col-m-3-12 col-es-4-12'>
        <div className='subcategory-container'>
            <div className='image-container'>
                <img className='image' src={props.item.imagelink}/>
                <div className='subcategory-name'>{props.item.name}</div>
            </div>
        </div>
    </div>
    
);

export default subcategory;
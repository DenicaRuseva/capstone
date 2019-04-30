// Spinner is taken from https://projects.lukehaas.me/css-loaders/ 
//


import React, {PureComponent} from 'react';
import './Spinner.css';

class Spinner extends PureComponent {
    render(){
        return (
            <div class="loader">Loading...</div>
        );
    };
};

export default Spinner;
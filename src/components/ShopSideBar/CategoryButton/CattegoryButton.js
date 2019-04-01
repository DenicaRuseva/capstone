import React from 'react';

const categoryButton = (props) => (
    <ul onClick={props.clicked}>{props.children}</ul>
);

export default categoryButton;
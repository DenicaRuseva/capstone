import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css';

const toolbar = () => (
    <header className={"toolbar"}>
        <nav>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
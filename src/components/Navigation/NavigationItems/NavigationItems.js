import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import '../NavigationItems/NavigationItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const navigationItems = () => (
    <ul className='navigationItems'>
        <NavigationItem link='/' exact={true}>Home</NavigationItem>
        <NavigationItem link="/shopping">Shop</NavigationItem>
        <NavigationItem link="/cart"><FontAwesomeIcon icon='shopping-cart'/></NavigationItem>
    </ul>
);

export default navigationItems;
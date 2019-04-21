import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import '../NavigationItems/NavigationItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const navigationItems = (props) => (
    <ul className='navigationItems'>
        <NavigationItem link='/' exact={true} clicked={props.hideSideDrawer}>Home</NavigationItem>
        <NavigationItem link="/shopping" clicked={props.hideSideDrawer}>Shop</NavigationItem>
        <NavigationItem link="/cart" clicked={props.hideSideDrawer}><FontAwesomeIcon icon='shopping-cart'/></NavigationItem>
    </ul>
);

export default navigationItems;
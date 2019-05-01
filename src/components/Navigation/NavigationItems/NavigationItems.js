import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import '../NavigationItems/NavigationItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const navigationItems = (props) => (
    <ul className='navigationItems'>
        <NavigationItem link='/' exact={true} clicked={props.hideSideDrawer}>Home</NavigationItem> {/*rubric66 rubric69 */}
        <NavigationItem link="/shopping" clicked={props.hideSideDrawer}>Shop</NavigationItem> {/*rubric67 rubric70*/}
        <NavigationItem link="/cart" clicked={props.hideSideDrawer}><FontAwesomeIcon icon='shopping-cart'/></NavigationItem> {/*rubric68 rubric71 */}
    </ul>
);

export default navigationItems;
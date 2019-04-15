import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
// import WithoutRootDiv from '../../../hoc/WithoutRootDiv/WithoutRootDiv';
import './Toolbar.css';

const toolbar = (props) => (
    <header className="toolbar">
    <DrawerToggle clicked={props.toggleSideDrawer}/>
        <nav className='desktop-only'>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';

const MainNavigation = (props) => {
	return(
		<MainHeader>
			<button className='main-navigation-menu-btn'>
				<span />
				<span />
				<span />
			</button>
			<h1 className='main-navigation-title'>
				<Link to='/'>Main App Title</Link>
			</h1>
			<nav>
				<NavLinks />
			</nav>
		</MainHeader>
	)
}

export default MainNavigation;
import { Link, Outlet } from 'react-router-dom';
import React, { Fragment, useContext } from 'react';
import ElevenLogo from '../../assets/eleven-logo-4.png';

import './navbar.scss';
import { UserContext } from '../../contexts/user';
import { signOutUser } from '../../utils/firebase/firebase';
import { CartIcon } from '../../components/cart-icon/cart-icon';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';
import { CartContext } from '../../contexts/cart';

export const Navbar = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<Fragment>
			<div className='navbar'>
				<Link className='logo-container' to='/'>
					<img className='logo' src={ElevenLogo} alt='Eleven Logo' />
				</Link>
				<div className='link-container'>
					<Link className='link' to='/shop'>
						SHOP
					</Link>
					{currentUser ? (
						<Link className='link' onClick={signOutUser}>
							SIGN-OUT
						</Link>
					) : (
						<Link className='link' to='/auth'>
							SIGN-IN
						</Link>
					)}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
};

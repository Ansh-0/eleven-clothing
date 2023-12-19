import React, { useContext } from 'react';
import { ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg';

import './cart-icon.scss';
import { CartContext } from '../../contexts/cart';

export const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<div onClick={toggleIsCartOpen} className='cart-icon-container'>
			<ShoppingBag className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};

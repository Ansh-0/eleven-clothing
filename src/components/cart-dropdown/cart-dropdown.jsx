import React, { useContext } from 'react';

import { Button } from '../button/button';

import './cart-dropdown.scss';
import { CartContext } from '../../contexts/cart';
import { CartItem } from '../cart-item/cart-item';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => navigate('/checkout');

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.length > 0 ? (
					cartItems.map((item) => (
						<CartItem key={item.id} cartItem={item} />
					))
				) : (
					<span id='cart-empty-message'>
						Your cart is currently empty
					</span>
				)}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;

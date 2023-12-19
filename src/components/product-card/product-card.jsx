import React, { useContext } from 'react';
import { Button } from '../button/button';
import './product-card.scss';
import { CartContext } from '../../contexts/cart';

export const ProductCard = ({ product }) => {
	const { addItemToCart } = useContext(CartContext);
	const { name, price, imageUrl } = product;

	const addProductToCart = () => addItemToCart(product);

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>${price}</span>
			</div>
			<Button onClick={addProductToCart} buttonType='inverted'>
				Add to Cart
			</Button>
		</div>
	);
};

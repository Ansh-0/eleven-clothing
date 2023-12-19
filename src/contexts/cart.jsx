import React, { createContext, useEffect, useState } from 'react';

const addItem = (product, cartItems) => {
	let itemExists = false;
	const newCartItems = cartItems.map((item) => {
		if (item.id === product.id) {
			item.quantity += 1;
			itemExists = true;
		}
		return item;
	});

	if (!itemExists) {
		const newItem = { ...product, quantity: 1 };
		newCartItems.push(newItem);
	}
	return newCartItems;
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => null,
	cartItems: [],
	addItemToCart: () => null,
	removeOneItemFromCart: () => null,
	deleteItemFromCart: () => null,
	cardCount: 0,
	setCartCount: () => null,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const count = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(count);
	}, [cartItems]);

	useEffect(() => {
		const count = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(count);
	}, [cartItems]);

	const addItemToCart = (product) => {
		setCartItems(addItem(product, cartItems));
	};

	const deleteItemFromCart = (product) => {
		let newCartItems = [];
		for (const item of cartItems) {
			if (item.id !== product.id) newCartItems.push(item);
		}
		setCartItems(newCartItems);
	};

	const removeOneItemFromCart = (product) => {
		const newCartItems = [];
		for (const item of cartItems) {
			if (item.id !== product.id) {
				newCartItems.push(item);
			} else if (product.quantity > 1) {
				newCartItems.push({ ...item, quantity: product.quantity - 1 });
			}
		}
		setCartItems(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeOneItemFromCart,
		deleteItemFromCart,
		cartCount,
		setCartCount,
		cartTotal,
	};
	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};

import './App.css';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Homepage } from './pages/homepage/homepage.jsx';
import { Navbar } from './pages/navbar/navbar.jsx';
import { Auth } from './pages/authentication/authentication.jsx';
import { Shop } from './pages/shop/shop.jsx';
import { Checkout } from './pages/checkout/checkout.jsx';
import { CategoriesContext } from './contexts/categories.jsx';

function App() {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<div>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route path='/' element={<Homepage />} />
					<Route path='/shop/*' element={<Shop />} />
					<Route path='/auth' element={<Auth />} />
					<Route path='/checkout' element={<Checkout />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

import React, { useContext } from 'react';

import { Route, Routes } from 'react-router-dom';
import { CategoriesPreview } from '../categories-preview/categories-preview';
import { Category } from '../category/category';

export const Shop = () => {
	return (
		<Routes>
			<Route path='/' element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

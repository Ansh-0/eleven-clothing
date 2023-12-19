import React, { useContext } from 'react';

import { CategoryPreview } from '../../components/category-preview/category-preview';

import { CategoriesContext } from '../../contexts/categories';

export const CategoriesPreview = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<div className='shop-container'>
			{Object.keys(categoriesMap).map((key) => {
				const products = categoriesMap[key];
				return (
					<CategoryPreview
						key={key}
						title={key}
						products={products}
					/>
				);
			})}
		</div>
	);
};

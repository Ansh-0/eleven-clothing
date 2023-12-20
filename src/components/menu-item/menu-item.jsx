import React from 'react';
import './menu-item.scss';
import { useNavigate } from 'react-router-dom';

export const MenuItem = ({ category }) => {
	const { title, size, imageUrl, linkUrl } = category;
	const className = `menu-item ${size || ''}`;
	const navigate = useNavigate();

	const navigateToCategoryPageHandler = () => navigate(linkUrl);

	return (
		<div onClick={navigateToCategoryPageHandler} className={className}>
			<div
				className='background-image'
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className='content'>
				<h1 className='title'>{title}</h1>
				<p className='subtitle'>SHOP NOW</p>
			</div>
		</div>
	);
};

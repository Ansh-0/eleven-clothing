import React from 'react';
import './menu-item.scss';
import { useNavigate } from 'react-router-dom';

export const MenuItem = ({ title, img, size }) => {
	const className = `menu-item ${size || ''}`;
	const navigate = useNavigate();

	const navigateToCategoryPageHandler = () => navigate(`/shop/${title}`);

	return (
		<div onClick={navigateToCategoryPageHandler} className={className}>
			<div
				className='background-image'
				style={{ backgroundImage: `url(${img})` }}
			></div>
			<div className='content'>
				<h1 className='title'>{title}</h1>
				<p className='subtitle'>SHOP NOW</p>
			</div>
		</div>
	);
};

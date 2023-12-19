import React from 'react';
import './button.scss';

export const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<div>
			<button
				className={`button-container ${buttonType}`}
				{...otherProps}
			>
				{children}
			</button>
		</div>
	);
};

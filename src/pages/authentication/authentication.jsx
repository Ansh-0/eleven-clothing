import React from 'react';

import { SignUpForm } from '../../components/sign-up-form/sign-up-form';
import { SignInForm } from '../../components/sign-in-form/sign-in-form';

import './authentication.scss';

export const Auth = () => {
	return (
		<div className='authentication-methods-container'>
			<SignUpForm />
			<SignInForm />
		</div>
	);
};

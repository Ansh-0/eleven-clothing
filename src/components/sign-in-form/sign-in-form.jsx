import React, { useState } from 'react';
import { FormInput } from '../form-input/form-input';
import { Button } from '../button/button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGooglePopup } from '../../utils/firebase/firebase';

import './sign-in-form.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

export const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-login-credentials':
					alert('Invalid email or password');
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const { user } = await signInWithGooglePopup();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='sign-in-container'>
			<h2>Have an account already?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					required={true}
					type='email'
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					required={true}
					type='password'
					onChange={handleChange}
					name='password'
					minlength='6'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType='google'
						onClick={handleGoogleSignIn}
					>
						Sign In With Google
					</Button>
				</div>
			</form>
		</div>
	);
};

import React, { useState } from 'react';
import { FormInput } from '../form-input/form-input';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocument,
} from '../../utils/firebase/firebase';
import { Button } from '../button/button';

import './sign-up-form.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};
export const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		if (password.length < 6) {
			alert('Password should at least be 6 characters long');
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocument(user, { displayName });
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else console.log(error);
		}
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					required={true}
					type='text'
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>
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
				<FormInput
					label='Confirm Password'
					required={true}
					type='password'
					onChange={handleChange}
					name='confirmPassword'
					minLength='6'
					value={confirmPassword}
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

	//<Input />
	//<Input />
	//<Button></Button>

const Authenticate = () => {

	const [formState, inputHandler] = useForm({
		email:{
			value: '',
			isValid: false
		},
		password:{
			value: '',
			isValid: false
		},
	}, false)

	const confirm = (event) => {
		event.preventDefault()
		console.log(formState.inputs)
	}

	return(
		<div>
			<form onSubmit={confirm}>
			<Input 
				id='email'
				element='input'
				type='text'
				placeholder='Please enter your email'
				errorText={'Please enter a valid email'}
				onInput={inputHandler}
				initialValue={formState.inputs.email.value}
				initialValid={formState.inputs.email.isValid}
				value={formState.value}
				validators={[VALIDATOR_EMAIL()]}
			/> 
			<Input 
				id='password'
				element='input'
				placeholder='Please enter your password'
				errorText={'Please enter a valid password'}
				onInput={inputHandler}
				initialValue={formState.inputs.password.value}
				initialValid={formState.inputs.password.isValid}
				value={formState.value}
				validators={[VALIDATOR_MINLENGTH(6)]}
			/> 
			<Button type='submit' disabled={!formState.isValid} >confirm</Button>
			</form>
		</div>
	)
}

export default Authenticate
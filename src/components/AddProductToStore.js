import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_STORE } from '../constants';

const AddProductToStore = () => {
	const [addToStore, { loading, error }] = useMutation(ADD_TO_STORE);

	const [productName, setProductName] = useState('')
	const [productDescription, setProductDescription] = useState('')

	const submit = () => addToStore({ vaiables: { productName, productDescription } })

	if (loading) return 'Submitting...';
	if (error) return `Submission error! ${error.message}`;

	return (
		<div>
			<input
				onChange={e => setProductName(e.target.value)}
				value={productName}
				name='product name'
			/>
			<input
				onChange={e => setProductDescription(e.target.value)}
				value={productDescription}
				name='product description'
			/>
			<button onClick={e => {
				e.preventDefault();
				submit()
			}}>Add Product</button>
		</div>
	)
}

export default AddProductToStore;
import React from 'react';
import { useMutation } from '@apollo/client';
import { GET_CART, ADD_TO_CART, GET_CART_TOTAL } from '../constants';

const AddToCartButton = ({ productId }) => {
	const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);
	let input;

	if (loading) return 'Submitting...';
	if (error) return `Submission error! ${error.message}`;

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
					addToCart({ variables: { productId } });
					input.value = '';
				}}
			>
				<input
					ref={node => {
						input = node;
					}}
				/>
				<button type="submit">Add To Cart</button>
			</form>
		</div>
	)
};

export default AddToCartButton;

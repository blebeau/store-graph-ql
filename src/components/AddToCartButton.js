import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../constants';

const AddToCartButton = ({ productId }) => {
	const [addToCart, { loading, error }] = useMutation(ADD_TO_CART);

	if (loading) return 'Submitting...';
	if (error) return `Submission error! ${error.message}`;

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
					addToCart({ variables: { productId } });
				}}
			>
				<button type="submit">Add To Cart</button>
			</form>
		</div>
	)
};

export default AddToCartButton;

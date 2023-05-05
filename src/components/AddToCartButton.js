import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../constants';
import { Button } from 'react-bootstrap';


const AddToCartButton = ({ productId }) => {
	const [addToCart, { loading, error }] = useMutation(ADD_TO_CART);

	if (loading) return 'Submitting...';
	if (error) return `Submission error! ${error.message}`;

	return (
		<div style={{ paddingRight: '5px' }}>
			<form
				onSubmit={e => {
					e.preventDefault();
					addToCart({ variables: { productId } });
				}}
			>
				<Button type="submit">Add To Cart</Button>
			</form>
		</div>
	)
};

export default AddToCartButton;

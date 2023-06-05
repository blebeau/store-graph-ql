import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PRODUCTS } from '../constants';

const productStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	border: '1px solid black',
	borderRadius: '5px',
	marginBottom: '5px',
	minWidth: '400px'
}

const UserProducts = ({ userId }) => {
	console.log('userid', userId)
	const { loading, error, data } = useQuery(GET_USER_PRODUCTS, {
		variables: { id: userId }
	});

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	if (data.cart === null) return 'No Products';

	return (
		<div>
			{data.userProducts && data.userProducts.length > 0 ?
				data.userProducts.map((userProduct) => (
					<div
						style={productStyle}
						key={userProduct.id}
						value={userProduct.title}>
						<img
							className='column'
							style={{ width: '100px' }}
							src={userProduct.thumbnail} alt={userProduct.title}
						/>
						<div className='column_description'>
							<span className='title'>
								<strong>{userProduct.title}</strong> {'  '}
								${userProduct.price > 0 ? userProduct.price : ''}
							</span>
							<span className='description'>
								{userProduct.description}
							</span>
						</div>
						<div
							className='column button_container'
						>
						</div>
					</div>
				))
				:
				<p
					style={{
						textAlign: 'center'
					}}
				>
					No Active Products For Sale
				</p>}
		</div>

	)
}

export default UserProducts;
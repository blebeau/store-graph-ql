import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_STORE, GET_PRODUCTS } from '../constants';
import { Button } from 'react-bootstrap';
import ProductCategoriesDropdown from './ProductCategoriesDropdown';
import ImageUploader from '../components/ImageUploader'
import { Auth } from 'aws-amplify'

const AddProductToStore = () => {
	const [addToStore, { loading, error }] = useMutation(ADD_TO_STORE, {
		refetchQueries: () => [{
			query: GET_PRODUCTS,
		}],
	});

	useEffect(() => {
		async function loadUser() {
			const user = await Auth.currentAuthenticatedUser({ bypassCache: true })

			setUserId(user.username)
		}

		loadUser();
	}, []);

	const [img, setImg] = useState('');
	const [productName, setProductName] = useState('')
	const [description, setDescription] = useState('')
	const [productPrice, setProductPrice] = useState(0)
	const [userId, setUserId] = useState(null)
	const [productCategory, setProductCategory] = useState(null)

	const submit = () => {
		const id = Math.floor(Math.random() * 100)

		addToStore({
			variables: {
				id: id,
				category_id: productCategory.id,
				title: productName,
				description: description,
				thumbnail: img,
				price: parseFloat(productPrice),
				user_id: userId
			}
		});
	}

	const setProductCallback = (cat) => setProductCategory(cat);

	const imageCallback = (img) => {
		setImg(img)
	}

	if (loading) return 'Adding Product...';
	if (error) return `Adding Product Error! ${error.message}`;

	return (
		<div className='row'>
			<h2 style={{ textAlign: 'center' }}>Product Details</h2>
			<div
				style={{
					float: 'left',
					width: '50%'
				}}
			>

				<ImageUploader getImage={imageCallback} />
			</div>
			<div
				style={{
					height: '80%',
					width: '40%',
					marginLeft: '10%'
				}}
			>
				<div
					style={{
						padding: '10px',
						alignItems: 'center',
						display: 'flex'
					}}
				>
					<span style={{
						paddingRight: '10px',
						width: '120px'
					}}
					>Product Name</span>

					<input
						onChange={e => setProductName(e.target.value)}
						value={productName}
						name='product name'
					/>
				</div>
				<div
					style={{
						padding: '10px',
						alignItems: 'center',
						display: 'flex'
					}}
				>
					<span
						style={{
							paddingRight: '10px',
							width: '120px'
						}}
					>Product description</span>

					<textarea
						onChange={e => setDescription(e.target.value)}
						value={description}
						name='product name'
					/>
				</div>
				<div
					style={{
						padding: '10px',
						alignItems: 'center',
						display: 'flex'
					}}
				>
					<span
						style={{
							paddingRight: '10px',
							width: '120px'
						}}
					>Product Price</span>

					<input
						type='number'
						onChange={e =>
							setProductPrice(e.target.value)
						}
						value={productPrice}
						name='Product Price'
					/>
				</div>
				<ProductCategoriesDropdown
					setProductCallback={setProductCallback}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					padding: '10px'
				}}
			>
				<Button
					disabled={productName === ''}
					onClick={submit}>
					Add Product
				</Button>
			</div>
		</div>
	)
}

export default AddProductToStore;
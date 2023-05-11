import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_STORE, GET_PRODUCTS } from '../constants';
import { Button } from 'react-bootstrap';
import ProductCategoriesDropdown from './ProductCategoriesDropdown';
import ImageUploader from '../components/ImageUploader'

const AddProductToStore = () => {
	const [addToStore, { loading, error }] = useMutation(ADD_TO_STORE, {
		refetchQueries: () => [{
			query: GET_PRODUCTS,
		}],
	});

	const [base64, setBase64] = useState('');
	const [productName, setProductName] = useState('')
	const [productPrice, setProductPrice] = useState(0)
	const [productCategory, setProductCategory] = useState(null)

	async function getBase64(file) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async function () {
			setBase64(reader.result)
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}

	const submit = () => {

		addToStore({
			variables: {
				productName,
				base64,
				productPrice,
				productCategory
			}
		});
	}

	const setProductCallback = (cat) => setProductCategory(cat);

	const imageCallback = async (img) => {
		await getBase64(img)
	}

	if (loading) return 'Adding Product...';
	if (error) return `Adding Product Error! ${error.message}`;

	return (
		<div>
			<ImageUploader getImage={imageCallback} />
			<br />
			<div
				style={{
					height: '80%'
				}}
			>
				<h2>Product Details</h2>
				<div
					style={{
						padding: '10px',
					}}
				>
					<span>Product Name</span>
					<br />
					<input
						onChange={e => setProductName(e.target.value)}
						value={productName}
						name='product name'
					/>
				</div>
				<div
					style={{
						padding: '10px',
					}}
				>
					<span>Product Price</span>
					<br />
					<input
						type='number'
						onChange={e => setProductPrice(e.target.value)}
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
					disabled={productName === '' || !productCategory}
					onClick={e => {
						e.preventDefault();
						submit()
					}}>
					Add Product
				</Button>
			</div>
		</div>
	)
}

export default AddProductToStore;
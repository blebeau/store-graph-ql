import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_STORE } from '../constants';
import { Button } from 'react-bootstrap';
import ProductCategoriesDropdown from './ProductCategoriesDropdown';
import UploadAndDisplayImage from '../components/ImageUploader'
import { faker } from '@faker-js/faker';

const AddProductToStore = () => {
	const [addToStore, { loading, error }] = useMutation(ADD_TO_STORE);

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
			vaiables: {
				id: faker.random.number,
				productName,
				base64,
				productCategory
			}
		})
	}

	const setProductCallback = (cat) => setProductCategory(cat);

	const imageCallback = async (img) => {
		await getBase64(img)
	}

	if (loading) return 'Adding Product...';
	if (error) return `Adding Product Error! ${error.message}`;

	return (
		<div>
			<UploadAndDisplayImage getImage={imageCallback} />
			<div>
				<>
					<span>Product Name</span>
					<input
						onChange={e => setProductName(e.target.value)}
						value={productName}
						name='product name'
					/>
				</>
				<>
					<span>Product Price</span>
					<input
						type='number'
						onChange={e => setProductPrice(e.target.value)}
						value={productPrice}
						name='Product Price'
					/>
				</>
				<ProductCategoriesDropdown
					setProductCallback={setProductCallback}
				/>
			</div>

			<Button
				disabled={productName === '' || !productCategory}
				onClick={e => {
					e.preventDefault();
					submit()
				}}>
				Add Product
			</Button>
		</div>
	)
}

export default AddProductToStore;
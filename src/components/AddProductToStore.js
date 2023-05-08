import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TO_STORE } from '../constants';
import { Button } from 'react-bootstrap';
import ProductCategoriesDropdown from './ProductCategoriesDropdown';
import UploadAndDisplayImage from '../components/ImageUploader'

const AddProductToStore = () => {
	const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

	const [addToStore, { loading, error }] = useMutation(ADD_TO_STORE);

	const [productName, setProductName] = useState('')
	const [productThumbnail, setProductThumbnail] = useState('')
	const [productCategory, setProductCategory] = useState(null)

	const submit = () => addToStore({ vaiables: { productName, productThumbnail, productCategory } })

	const setProductCallback = (cat) => setProductCategory(cat)

	if (loading) return 'Adding Product...';
	if (error) return `Adding Product Error! ${error.message}`;

	const disabled = productName === '' || !productThumbnail.match(expression) || !productCategory;

	return (
		<div>
			<UploadAndDisplayImage />
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
					<span>Product Thumbnail</span>
					<input
						onChange={e => setProductThumbnail(e.target.value)}
						value={productThumbnail}
						name='product Thumbnail'
					/>
				</>
				<ProductCategoriesDropdown
					setProductCallback={setProductCallback}
				/>
			</div>

			<Button
				disabled={disabled}
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
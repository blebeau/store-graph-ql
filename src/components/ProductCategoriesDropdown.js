import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../constants';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ProductCategoriesDropdown = ({ setProductCallback }) => {
	const { data, loading, error } = useQuery(GET_CATEGORIES);

	const [productCategory, setProductCategory] = useState(null)

	if (loading) return 'Getting Categories...';
	if (error) return `Error Getting Categories! ${error.message}`;

	return (
		<div
			style={{
				padding: '10px',
			}}
		>
			<DropdownButton
				title={productCategory?.title || "Select Category"}
			>
				{data?.categories && data.categories.map((cat) => (
					<Dropdown.Item key={cat.id} onClick={() => {
						setProductCategory(cat);
						setProductCallback(cat);
					}}>
						{cat.title}
					</Dropdown.Item>
				))
				}
			</DropdownButton>
		</div>
	)
}

export default ProductCategoriesDropdown;
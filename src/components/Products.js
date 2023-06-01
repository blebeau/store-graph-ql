import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PRODUCTS } from '../constants';
import AddToCartButton from './AddToCartButton'
import ProductModal from './ProductModal';
import { Button } from 'react-bootstrap';
import "../styles/product.css"

const productStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	border: '1px solid black',
	borderRadius: '5px',
	marginBottom: '5px',
	minWidth: '400px'
}

const Products = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);
	const [product, setProduct] = useState(null);
	const [showProductModal, setShowProductModal] = useState(false)

	const modalCloseCallback = () => {
		setShowProductModal(false)
	}

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	if (data.products === null) return 'No Products';

	return (
		<div>
			{data && data.products.map((product) => (
				<div
					style={productStyle}
					key={product.id}
					value={product.title}>
					<img
						className='column'
						style={{ width: '100px' }}
						src={product.thumbnail} alt={product.title}
					/>
					<div className='column_description'>
						<span className='title'>
							<strong>{product.title}</strong> {'  '}
							${product.price > 0 ? product.price : ''}
						</span>
						<span className='description'>
							{product.description}
						</span>
					</div>
					<div
						className='column button_container'
					>
						<AddToCartButton className='button' productId={product.id} />
						<Button
							className='button'
							variant='outline-primary'
							style={{
								marginRight: '5px'
							}}
							onClick={() => {
								setProduct(product)
								setShowProductModal(true)
							}}>
							Details
						</Button>
					</div>

				</div>
			))}
			{showProductModal &&
				<ProductModal
					product={product}
					show={showProductModal}
					modalCloseCallback={modalCloseCallback}
				/>
			}
		</div>
	)
}

export default Products;
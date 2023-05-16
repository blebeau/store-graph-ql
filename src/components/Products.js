import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PRODUCTS } from '../constants';
import AddToCartButton from './AddToCartButton'
import ProductModal from './ProductModal';
import { Button } from 'react-bootstrap';
import "../styles/product.css"



const productStyle = {
	display: 'flex',
	height: '150px',
	justifyContent: 'space-between',
	border: '1px solid black',
	borderRadius: '5px',
	marginBottom: '5px',
	alignItems: 'center',
	margin: '5px',
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
						style={{ marginLeft: '5px', width: '100px', justifyContent: "flex-start" }}
						src={product.thumbnail} alt={product.title}
					/>
					<div className='column'>
						<span>
							<strong>{product.title}</strong>
						</span>
						<br />
						<span>
							${product.price}
						</span>
					</div>
					<div
						className='column button_container'
					>
						<AddToCartButton productId={product.id} />
						<Button
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
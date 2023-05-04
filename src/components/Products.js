import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../constants';
import AddToCartButton from './AddToCartButton'


const productStyle = {
	display: 'flex',
	height: '100px',
	justifyContent: 'space-between',
	border: '1px solid black',
	borderRadius: '5px',
	marginBottom: '5px',
	alignItems: 'center'
}

const Products = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	if (data.products === null) return 'No Products';


	return (
		<div>
			{data && data.products.map((product) => (
				<div style={productStyle} key={product.id} value={product.title}>
					<img style={{ height: '50px', marginLeft: '5px' }} src={product.thumbnail} alt={product.title} />
					<span >{product.title}</span>
					<AddToCartButton productId={product.id} />
				</div>
			))}
		</div>
	)
}

export default Products;
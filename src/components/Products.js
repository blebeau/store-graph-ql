import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../constants';
import AddToCartButton from './AddToCartButton'

const Products = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	if (data.products === null) return 'No Products';


	return (
		<div>
			{data && data.products.map((product) => (
				<div key={product.id} value={product.title}>
					<span>{product.title}</span>
					<AddToCartButton productId={product.id} />
				</div>
			))}
		</div>
	)
}

export default Products;
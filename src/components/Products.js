import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../constants';

const Products = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<div>
			{data.products.map((product) => (
				<div key={product.id} value={product.title}>
					{product.title}
				</div>
			))}
		</div>
	)
}

export default Products;
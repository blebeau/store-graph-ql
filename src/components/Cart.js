import { useQuery } from '@apollo/client';
import { GET_CART } from '../constants';

const Cart = () => {
	const { loading, error, data } = useQuery(GET_CART);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<div>
			{data.cart.products.map((product) => (
				<div key={product.id} value={product.title}>
					<span>{product.title}</span>
				</div>
			))}
		</div>
	)
}

export default Cart;
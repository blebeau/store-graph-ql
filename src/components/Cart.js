import { useQuery } from '@apollo/client';
import { GET_CART } from '../constants';

const cartStyle = {
	display: 'flex',
	height: '100px',
	justifyContent: 'space-between',
	border: '1px solid black',
	borderRadius: '5px',
	marginBottom: '5px',
	alignItems: 'center'
}

const Cart = () => {
	const { loading, error, data } = useQuery(GET_CART);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	if (data.cart === null) return 'No Products';

	return (
		<div>
			{data.cart.products.map((product) => (
				<div style={cartStyle} key={product.id} value={product.title}>
					<img style={{ height: '50px', marginLeft: '5px' }} src={product.thumbnail} alt={product.title} />
					<span style={{ marginRight: '5px' }} >{product.title}</span>
				</div>
			))}
		</div>
	)
}

export default Cart;
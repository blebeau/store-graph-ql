import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"
import { Button } from 'react-bootstrap';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Logo from '../images/logo.png'
import { useQuery } from '@apollo/client';
import { GET_CART } from '../constants';
import '../styles/navigation.css'

const navStyles = {
	display: 'flex',
	width: '100%',
	height: '120px',
	justifyContent: 'space-between',
	position: "relative",
	alignItems: 'center',
}

const Navigation = () => {
	const { data } = useQuery(GET_CART);
	const { signOut } = useAuthenticator()

	return (
		<div className='container'>
			<div className="nav_button_container">
				<img
					style={{
						height: "120px"
					}}
					src={Logo}
					alt="logo"
				/>
				<Link to="/" >
					<Button
						className="nav_buttons"
						size="sm"
					>
						Home
					</Button>
				</Link>
				<Link to="/dashboard" >
					<Button
						className="nav_buttons"
						size="sm"
					>
						Dashboard
					</Button>
				</Link>
				{/* <Link to="/profile" >Profile</Link> TODO: design profile for customer details */}

				<Button
					className="nav_buttons"
					size="sm" onClick={() => signOut()}>Log Out
				</Button>
				<Link to="/cart">
					<Button
						className="nav_buttons"
						size="sm">
						<FaShoppingCart style={{ marginRight: '15px' }} color='white' />
						{data ? data.cart.products.length : 0}
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default Navigation;
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"
import { Button } from 'react-bootstrap';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Logo from '../images/logo.png'

const navStyles = {
	display: 'flex',
	width: '100%',
	height: '80px',
	justifyContent: 'space-between'
}

const Navigation = () => {
	const { signOut } = useAuthenticator()

	return (
		<div style={{
			border: '1px solid black', padding: '5px', borderRadius: '8px', display: 'flex',
			justifyContent: "space-evenly",
			position: "relative",
			alignItems: 'center'
		}} >
			<div style={navStyles}>
				<img
					style={{
						height: "80px"
					}}
					src={Logo}
					alt="logo"
				/>
				<Link to="/" >
					<Button
						size="sm"
					>
						Home
					</Button>
				</Link>
				<Link to="/dashboard" >
					<Button
						size="sm"
					>
						Dashboard
					</Button>
				</Link>
				{/* <Link to="/profile" >Profile</Link> TODO: design profile for customer details */}

				<Button
					style={{
						height: '30px',
						width: '75px'
					}}
					size="sm" onClick={() => signOut()}>Log Out
				</Button>
				<Link to="/cart" ><FaShoppingCart color='black' /></Link>
			</div>
		</div>
	)
}

export default Navigation;
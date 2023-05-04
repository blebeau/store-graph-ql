import { Link } from "react-router-dom";
import { FaShoppingCart, FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa"
import { useState } from "react";

const navStyles = {
	display: 'flex',
	width: '100%',
	height: '80px',
	justifyContent: 'space-between'
}

const Navigation = () => {
	const [expanded, setExpanded] = useState(true)

	return (
		<div style={{ border: '1px solid black', padding: '5px', borderRadius: '8px' }} >
			{expanded && <div style={navStyles}>
				<Link to="/" >Home</Link>
				{/* <Link to="/dashboard" >Dashboard</Link> TODO: design dashboard to add and edit products */}
				{/* <Link to="/profile" >Profile</Link> TODO: design profile for customer details */}
				<Link to="/cart" ><FaShoppingCart color='black' /></Link>
			</div>}
			<div style={{
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<button

					onClick={() => setExpanded(!expanded)}
				>
					{expanded ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
				</button>
			</div>
		</div>
	)
}

export default Navigation;
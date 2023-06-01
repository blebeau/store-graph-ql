import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/ProductModal.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const styles = {
	modal: {
		content: {
			height: '100px',
			width: '500px'
		}
	},
	header: {
		textAlign: 'center',
		height: '80px'
	},
	body: {
		height: '300px'
	},
	footer: {
		height: '80px',
		display: 'flex',
		justifyContent: 'flex-end'
	}
}

const ProductModal = ({ product, show, modalCloseCallback }) => {
	const [showProductModal, setShowProductModal] = useState(show)


	const closeModal = () => {
		setShowProductModal(false);
		modalCloseCallback();
	}

	return (
		<Modal
			onHide={closeModal}
			show={showProductModal}
		>
			<Modal.Header closeButton>
				<Modal.Title>{product.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='modal_body'>
				<div style={{ height: '50%' }} >
					<img
						className='img'
						src={product.thumbnail} alt={product.title}
					/>
				</div>

				<div className='modal_description' >
					{product.description}
				</div>
			</Modal.Body>
			<Modal.Footer
			>
				<Button
					variant='primary'
					onClick={() => {
						closeModal()

					}}
				>
					Add to cart
				</Button>
				<Button
					variant='secondary'
					onClick={closeModal}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ProductModal;
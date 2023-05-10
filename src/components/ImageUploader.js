import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUploader = ({ getImage }) => {

	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<div
			style={{
				position: 'relative'
			}}
		>
			{selectedImage && (
				<div>
					<img
						alt="not found"
						width={"250px"}
						src={URL.createObjectURL(selectedImage)}
					/>
					<br />
					<br />
					<Button
						variant="danger"
						onClick={async () => setSelectedImage(null)}>Remove</Button>
				</div>
			)}

			<br />
			<br />

			<input
				style={{
					position: 'absolute',
					bottom: 0
				}}
				type="file"
				onChange={(event) => {
					setSelectedImage(event.target.files[0]);
					getImage(event.target.files[0])
				}}
			/>
		</div>
	);
};

export default ImageUploader;
import React, { useState, useCallback } from "react";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDropzone } from 'react-dropzone';
import S3 from "react-aws-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;

const ImageUploader = ({ getImage }) => {
	const config = {
		bucketName: process.env.REACT_APP_BUCKET_NAME,
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
		secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
	}

	const ReactS3Client = new S3(config);

	const [selectedImage, setSelectedImage] = useState(null);

	const onDrop = useCallback(acceptedFiles => {
		// With success, display image and add to S3
		// TODO: Uploading right away is a waste. Change to upload with save
		try {
			ReactS3Client.uploadFile(acceptedFiles[0]).then(data => {
				if (data.status === 204) {
					const imageURL = `https://${process.env.REACT_APP_BUCKET_NAME}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/${data.key}`

					getImage(imageURL)
					setSelectedImage(imageURL)
				} else {
					console.log("Failure!")
				}
			})
		} catch (err) {
			console.log('err', err)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
						width={"80%"}
						src={selectedImage}
					/>
					<br />
					<br />
					<Button
						variant="danger"
						onClick={async () => setSelectedImage(null)}>Remove</Button>
				</div>
			)}
			{!selectedImage && <div
				style={{
					border: '1px solid black',
					height: '250px',
					textAlign: 'center',
					width: '80%',
					marginLeft: '15%'
				}}
				{...getRootProps()}>
				<input {...getInputProps()} />
				{
					isDragActive ?
						<p>Drop the files here ...</p> :
						<p>Drag 'n' drop some files here, or click to select files</p>
				}
			</div>
			}
		</div>
	);
};

export default ImageUploader;
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { Product } from '../../../entities/Product';
import { createProduct, editProduct } from '../../../api/ProductApi';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../../redux/productSlice';

interface CreateProductModalProps {
	open: boolean;
	onClose: () => void;
	initialProductData?: Product;
}

export default function CreateProductModal({ open, onClose, initialProductData }: CreateProductModalProps) {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [price, setPrice] = useState(0);
	const [rating, setRating] = useState(0);
	const [warranty, setWarranty] = useState(0);
	const [available, setAvailable] = useState(false);

	useEffect(() => {
		if (initialProductData) {
			setName(initialProductData.name || '');
			setType(initialProductData.type || '');
			setPrice(initialProductData.price || 0);
			setRating(initialProductData.rating || 0);
			setWarranty(initialProductData.warranty_years || 0);
			setAvailable(initialProductData.available || false);
		} else {
			setName('');
			setType('');
			setPrice(0);
			setRating(0);
			setWarranty(0);
			setAvailable(false);
		}
	}, [initialProductData]);

	async function handleSubmit() {
		const productData = {
			name,
			type,
			price: Number(price),
			rating: Number(rating),
			warranty_years: Number(warranty),
			available,
		};

		try {
			if (initialProductData) {
				const updatedProduct = await editProduct(initialProductData._id, productData);
				dispatch(updateProduct(updatedProduct));
			} else {
				const newProduct = await createProduct(productData);
				dispatch(addProduct(newProduct));
			}

			onClose();

		} catch (error) {
			console.error('Error submitting product:', error);
		}
	};

	return (
		<Modal open={open} onClose={onClose} aria-labelledby="create-product-modal" aria-describedby="create-product-modal-description">
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					bgcolor: 'background.paper',
					boxShadow: 24,
					padding: 4,
					width: 400,
					borderRadius: 2,
				}}
			>
				<Typography variant="h6" component="h2" gutterBottom>
					{initialProductData ? 'Edit Product' : 'Create New Product'}
				</Typography>

				<TextField
					label="Name"
					fullWidth
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Type"
					fullWidth
					variant="outlined"
					value={type}
					onChange={(e) => setType(e.target.value)}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Price"
					fullWidth
					type="number"
					variant="outlined"
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
					sx={{ marginBottom: 2 }}
				/>
				<TextField
					label="Rating"
					fullWidth
					type="number"
					variant="outlined"
					value={rating}
					onChange={(e) => setRating(Math.max(0, Math.min(Number(e.target.value), 5)))} // Limit to range 0-5
					sx={{ marginBottom: 2 }}
					inputProps={{ max: 5 }}
				/>
				<TextField
					label="Warranty (Years)"
					fullWidth
					type="number"
					variant="outlined"
					value={warranty}
					onChange={(e) => setWarranty(Math.max(0, Math.min(Number(e.target.value), 5)))} // Limit to range 0-5
					sx={{ marginBottom: 2 }}
					inputProps={{ max: 5 }}
				/>
				<FormControlLabel
					control={<Checkbox checked={available} onChange={() => setAvailable(!available)} />}
					label="Available"
					sx={{ marginBottom: 2 }}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="contained" color="primary" onClick={handleSubmit}>
						{initialProductData ? 'Update Product' : 'Add Product'}
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}

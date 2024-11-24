import React, { useState } from 'react';
import { Card, Box, Typography, IconButton, Rating, Chip, Grid } from '@mui/material';
import { Product } from '../../../entities/Product';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { deleteProduct } from '../../../api/ProductApi';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../../redux/productSlice';
import CreateProductModal from './CreateProductModal';

interface ProductItemProps {
    product: Product;
    viewType: 'table' | 'card';
}

export default function ProductItem({ product, viewType }: ProductItemProps) {
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    function handleEditClick() {
        setIsEditModalOpen(true);
    };

    function handleModalClose() {
        setIsEditModalOpen(false);
    };

    async function handleDeleteProduct() {
        const productId = product._id;

        try {

            const isDeleted = await deleteProduct(productId);
            if (!isDeleted) {
                throw new Error('Failed to delete product');
            } else {
                dispatch(removeProduct(productId));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            dispatch(addProduct(product));
        }
    }

    if (viewType === 'card') {
        return (
            <>
                <Card
                    sx={{
                        minWidth: 300,
                        padding: 2,
                        boxShadow: 2,
                        borderRadius: 2,
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 3 },
                    }}
                >
                    <Box display="flex" flexDirection="column" height="100%">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight="bold">
                                {product.name}
                            </Typography>
                            <Box>
                                <IconButton color="primary" aria-label="edit product" onClick={handleEditClick}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete product" onClick={handleDeleteProduct}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" my={1}>
                            <Rating value={product.rating} readOnly precision={0.5} size="small" />
                        </Box>

                        <Box>
                            <Chip
                                color={product.available ? 'success' : 'error'}
                                label={product.available ? 'Available' : 'Out of Stock'}
                            />
                        </Box>

                        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="textSecondary">
                                Price: ${product.price}
                            </Typography>
                        </Box>
                    </Box>
                </Card>

                <CreateProductModal
                    open={isEditModalOpen}
                    onClose={handleModalClose}
                    initialProductData={product}
                />
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 2,
                    borderRadius: 1,
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    '&:hover': {
                        backgroundColor: '#f3f3f3',
                    },
                    width: '100%',
                    height: 70,
                }}
            >
                <Grid container alignItems="center" spacing={2} sx={{ width: '100%' }}>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {product.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body2" color="textSecondary">
                            Price: ${product.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Rating value={product.rating} readOnly size="small" precision={0.5} />
                    </Grid>
                    <Grid item xs={2}>
                        <Chip
                            color={product.available ? 'success' : 'error'}
                            label={product.available ? 'Available' : 'Out of Stock'}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton color="primary" aria-label="edit product" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete product" onClick={handleDeleteProduct}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>

            <CreateProductModal
                open={isEditModalOpen}
                onClose={handleModalClose}
                initialProductData={product}
            />
        </>
    );
}
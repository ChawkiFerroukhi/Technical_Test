import React, { MouseEvent, useState } from 'react';
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography, Button } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ProductItem from './components/ProductItem';
import AddProductCard from './components/AddProductCard';
import CreateProductModal from './components/CreateProductModal';
import { useProducts } from '../../hooks/useProducts';

export default function ProductPage() {
    const products = useProducts();
    const [viewType, setViewType] = useState<'table' | 'card'>('card');
    const [openModal, setOpenModal] = useState(false);

    function handleToggle(_: MouseEvent<HTMLElement>, newView: 'table' | 'card') {
        if (newView) setViewType(newView);
    };

    function handleCreateProduct() {
        setOpenModal(true);
    };

    function handleCloseModal() {
        setOpenModal(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Products
                </Typography>

                <ToggleButtonGroup
                    value={viewType}
                    exclusive
                    onChange={handleToggle}
                    aria-label="view type"
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: 1,
                        borderRadius: 2,
                    }}
                >
                    <ToggleButton value="table" aria-label="table view">
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="card" aria-label="card view">
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    mb: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateProduct}
                >
                    Create Product
                </Button>
            </Box>

            {viewType === 'table' ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    {products.map((product) => (
                        <ProductItem key={product._id} product={product} viewType="table" />
                    ))}
                </Box>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <AddProductCard onClick={handleCreateProduct} />
                    </Grid>

                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <ProductItem product={product} viewType="card" />
                        </Grid>
                    ))}
                </Grid>
            )}

            <CreateProductModal open={openModal} onClose={handleCloseModal} />
        </Box>
    );
}
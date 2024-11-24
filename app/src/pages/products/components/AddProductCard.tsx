import React from 'react';
import { Card, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddProductCardProps {
    onClick: () => void;
}

export default function AddProductCard({ onClick }: AddProductCardProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px dashed gray',
                cursor: 'pointer',
                padding: 2,
                '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                },
                height: '100%',
            }}
            onClick={onClick}
        >
            <IconButton color="primary" size="large">
                <AddIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" color="textSecondary" align="center">
                Create Product
            </Typography>
        </Card>
    );
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../entities/Product';

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        addProduct(state, action: PayloadAction<Product>) {
            const exists = state.products.some(product => product._id === action.payload._id);
            if (!exists) {
                state.products.push(action.payload);
            }
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(product => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
    },
});

export const { setProducts, addProduct, removeProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
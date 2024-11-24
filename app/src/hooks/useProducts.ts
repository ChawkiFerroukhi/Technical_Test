import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setProducts, addProduct, removeProduct, updateProduct } from "../redux/productSlice";
import { getProducts } from "../api/ProductApi";
import socket from "../api/socket";

export function useProducts() {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                dispatch(setProducts(fetchedProducts));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();

        socket.on("productAdded", (newProduct) => {
            dispatch(addProduct(newProduct));
        });

        socket.on("productUpdated", (productId) => {
            dispatch(updateProduct(productId));
        });

        socket.on("productDeleted", (productId) => {
            dispatch(removeProduct(productId));
        });

        return () => {
            socket.off("productAdded");
            socket.off("productDeleted");
            socket.off("productUpdated");
        };
    }, [dispatch]);

    return products;
}
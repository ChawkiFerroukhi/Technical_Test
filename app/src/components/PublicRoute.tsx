import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("authToken");

    return token ? <Navigate to="/products" /> : <>{children}</>;
}

export default PublicRoute;

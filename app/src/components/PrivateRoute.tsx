import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: ReactNode }) {
    const token = localStorage.getItem("authToken");

    return token ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Register from "../pages/authentication/register";
import Home from"../layouts/layout";
import ResetPassword from "../pages/authentication/partials/reset-password";
import ProtectedRoute from "./ProtectedRoutes";

const MainRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={ <ProtectedRoute> <AdminHome /> </ProtectedRoute>} />
                    <Route path="/reset-password" element={ <ProtectedRoute> <ResetPassword/> </ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoutes
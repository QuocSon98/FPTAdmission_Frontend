import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";

const MainRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/admin" element={<AdminHome/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoutes
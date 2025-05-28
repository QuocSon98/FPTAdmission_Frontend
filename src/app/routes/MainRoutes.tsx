import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Home from"../layouts/layout";

const MainRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/admin" element={<AdminHome/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoutes
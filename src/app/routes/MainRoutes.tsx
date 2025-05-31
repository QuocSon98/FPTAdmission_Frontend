import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Register from "../pages/authentication/register";
import Layout from"../layouts/layout";
import Home from "../pages/public/homePage/home";
import Contract from "../pages/public/contract/contract";

const MainRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>} />
                        <Route path="/contract" element={<Contract/>} />
                    </Route>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/admin" element={<AdminHome/>} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoutes
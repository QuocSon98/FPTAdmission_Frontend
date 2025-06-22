import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Register from "../pages/authentication/register";
import ResetPassword from "../pages/authentication/partials/reset-password";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from"../layouts/layout";
import Home from "../pages/public/homePage/home";
import Contract from "../pages/public/contract/contract";
import Major from "../pages/public/major/major";
import InformationTechnology from "../pages/public/major/IT/informationTechnology";
// import InformationSecurity from "../pages/public/major/IT/informationSecurity";
import { 
    InformationSecurity, 
    SoftwareEngineering, 
    DigitalCarTechnology,
    ArtificialIntelligence,
    SemiconductorDesign,
    DigitalDesign,
    DigitalConversion 
} from "../pages/public/major/IT/IT";


const MainRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>} />
                        <Route path="/contract" element={<Contract/>} />
                        <Route path="/major" element={<Major/>} />
                        <Route path="/major/informationTechnology" element={<InformationTechnology/>} />
                        <Route path="/informationSecurity" element={<InformationSecurity/>} />
                        <Route path="/softwareEngineering" element={<SoftwareEngineering/>} />
                        <Route path="/digitalCarTechnology" element={<DigitalCarTechnology/>} />
                        <Route path="/artificialIntelligence" element={<ArtificialIntelligence/>} />
                        <Route path="/semiconductorDesign" element={<SemiconductorDesign/>} />
                        <Route path="/digitalDesign" element={<DigitalDesign/>} />
                        <Route path="/digitalConversion" element={<DigitalConversion/>} />
                    </Route>
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
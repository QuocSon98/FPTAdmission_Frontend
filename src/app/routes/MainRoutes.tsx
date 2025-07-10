import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Register from "../pages/authentication/register";
import ResetPassword from "../pages/authentication/partials/reset-password";
import ProtectedRoute from "./ProtectedRoutes";
import Layout from "../layouts/layout";
import Home from "../pages/public/homePage/home";
import Contract from "../pages/public/contract/contract";
import Major from "../pages/public/major/major";
// import InformationTechnology from "../pages/public/major/IT/informationTechnology";
// import InformationSecurity from "../pages/public/major/IT/informationSecurity";
// import { 
//     InformationSecurity, 
//     SoftwareEngineering, 
//     DigitalCarTechnology,
//     ArtificialIntelligence,
//     SemiconductorDesign,
//     DigitalDesign,
//     DigitalConversion 
// } from "../pages/public/major/IT/IT";
import Introduction from "../pages/public/introduction/introduction";
import StaffLayout from "../layouts/staffLayout";
import Schedule from "../pages/staff/schedule/Schedule";
import { Toaster } from "react-hot-toast";
import Consultant from "../pages/public/consultant/consultant";
import { News } from "../pages/public/news/news";
import SpecializationDetail from "../pages/public/specialization/SpecializationDetail";
import ProgramList from "../pages/public/program/Program";


const MainRoutes = () => {
    return (
        <>
        <Toaster position="top-right"  reverseOrder={false}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/contract" element={<Contract />} />
                        <Route path="/major" element={<Major />} />
                        <Route path="/introduction" element={<Introduction />} />
                        <Route path="/consultant" element={<Consultant />} />
      <Route path="/specialization/:id" element={<SpecializationDetail />} />
                        <Route path="/program" element={<ProgramList />} />
                    </Route>
                    <Route path="/tin-tuc" element={<News />} />

                    <Route path="/staff" element={<StaffLayout />}>
                        <Route index element={<Schedule />} />
                        {/* Add more staff routes here */}
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MainRoutes
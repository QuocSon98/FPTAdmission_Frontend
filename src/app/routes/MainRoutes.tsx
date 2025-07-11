import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Register from "../pages/authentication/register";
import ResetPassword from "../pages/authentication/partials/reset-password";
import PrivateRoutes from "./PrivateRoutes";
import Layout from"../layouts/layout";
import Home from "../pages/public/homePage/home";
import Contract from "../pages/public/contract/contract";
import Major from "../pages/public/major/major";
import News from "../pages/public/news/News"; // Trang danh sách tin tức
import NewsDetail from "../pages/public/news/NewsDetail"; // Trang chi tiết tin tức
import InformationTechnology from "../pages/public/major/IT/informationTechnology";
import { 
    InformationSecurity, 
    SoftwareEngineering, 
    DigitalCarTechnology,
    ArtificialIntelligence,
    SemiconductorDesign,
    DigitalDesign,
    DigitalConversion 
} from "../pages/public/major/IT/IT";
import Introduction from "../pages/public/introduction/introduction";
import StaffLayout from "../layouts/staffLayout";
import Schedule from "../pages/staff/schedule/Schedule";
import Consultant from "../pages/public/consultant/consultant";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contract" element={<Contract />} />
          <Route path="major" element={<Major />} />
          <Route path="major/informationTechnology" element={<InformationTechnology />} />
          <Route path="informationSecurity" element={<InformationSecurity />} />
          <Route path="softwareEngineering" element={<SoftwareEngineering />} />
          <Route path="digitalCarTechnology" element={<DigitalCarTechnology />} />
          <Route path="artificialIntelligence" element={<ArtificialIntelligence />} />
          <Route path="semiconductorDesign" element={<SemiconductorDesign />} />
          <Route path="digitalDesign" element={<DigitalDesign />} />
          <Route path="digitalConversion" element={<DigitalConversion />} />
          <Route path="introduction" element={<Introduction />} />
          <Route
            path="consultant"
            element={
              <PrivateRoutes>
                <Consultant />
              </PrivateRoutes>
            }
          />
          <Route path="tin-tuc" element={<News />} />
          <Route path="tin-tuc/:id" element={<NewsDetail />} />
        </Route>

        {/* Staff Pages */}
        <Route
          path="/staff"
          element={
            <PrivateRoutes>
              <StaffLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Schedule />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <AdminHome />
            </PrivateRoutes>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes
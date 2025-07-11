import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/authentication";
import AdminHome from "../pages/adminHome";
import Register from "../pages/authentication/register";
import ResetPassword from "../pages/authentication/partials/reset-password";
import PrivateRoutes from "./PrivateRoutes";
import Layout from "../layouts/layout";
import Home from "../pages/public/homePage/home";
import Contract from "../pages/public/contract/contract";
import Major from "../pages/public/major/major";
import News from "../pages/public/news/News"; // Trang danh sách tin tức
import NewsDetail from "../pages/public/news/NewsDetail"; // Trang chi tiết tin tức
import Introduction from "../pages/public/introduction/introduction";
import StaffLayout from "../layouts/staffLayout";
import Schedule from "../pages/staff/schedule/Schedule";
import Consultant from "../pages/public/consultant/consultant";
import SpecializationDetail from "../pages/public/specialization/specializationDetail";
import ProgramList from "../pages/public/program/Program";
import { Toaster } from "react-hot-toast";

export const MainRoutes = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* Public Pages with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contract" element={<Contract />} />
            <Route path="major" element={<Major />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="specialization/:id" element={<SpecializationDetail />} />
            <Route path="program" element={<ProgramList />} />
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
    </>
  );
};
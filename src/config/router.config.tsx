import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "../pages/landing"
import NotFound from "../pages/errors/not-found.page"
import CategoryDetailPage from "../pages/category/category-detail.page"

import { HomePageLayout, AdminPageLayout } from "../pages/layouts"
import AdminDashboard from "../pages/dashboard/admin-dashboard.component"
import {  RegisterPage,  LoginPage, ActivationPage  } from "../pages/auth"

import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "../context/auth.context"
import AllowUser from "./permission-config"

import { AdminBannerList, AdminBannerCreate, AdminBannerEdit } from "../pages/banner"
import { AdminBrandList, AdminBrandCreate, AdminBrandEdit } from "../pages/brand"
import { useDispatch } from "react-redux"
import { getLoggedInUserFromReducer } from "../reducer/auth.reducer"
import { useEffect, useState } from "react"
import LoadingComponent from "../components/common/loading/loading.component"


const RouterConfig = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // setLoggedInUser()
    
    useEffect(() => {
        const token = localStorage.getItem("_act") || null;
        if(token) {
            dispatch(getLoggedInUserFromReducer())
            
        }
        setLoading(false)
    }, [])
    return (<>
        {
            loading ? <LoadingComponent /> : <>
            <GoogleOAuthProvider clientId="681887147442-5fbb5g01aopcrd62rlvttjkdj24k1kp3.apps.googleusercontent.com">
                <AuthProvider>
                    <>
                        <ToastContainer 
                            theme="colored"
                        />
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomePageLayout />}>
                                    <Route index element={<LandingPage />}></Route>
                                    
                                    <Route path="register" element={<RegisterPage />}></Route>
                                    <Route path='login' element={<LoginPage />}></Route>
                                    <Route path="/activate/:token" element={<ActivationPage />}></Route>
                                    
                                    <Route path="category/:slug" element={<CategoryDetailPage />}></Route>


                                    <Route path="*" element={<NotFound url="/" redirectTxt="Go back to HOME Page"  />}></Route>
                                </Route>

                                <Route path="/admin" element={<AllowUser allowUser="admin">
                                        <AdminPageLayout />
                                    </AllowUser>}>
                                    <Route index element={<AdminDashboard />}></Route>

                                    <Route path="banner" element={<AdminBannerList />}></Route>
                                    <Route path="banner/create" element={<AdminBannerCreate />}></Route>
                                    <Route path="banner/:id/edit" element={<AdminBannerEdit />}></Route>

                                    <Route path="brand" element={<AdminBrandList />}></Route>
                                    <Route path="brand/create" element={<AdminBrandCreate />}></Route>
                                    <Route path="brand/:id/edit" element={<AdminBrandEdit />}></Route>

                                    <Route path="*" element={<NotFound url="/admin" redirectTxt="Go back to Dashboard"  />}></Route>
                                </Route>

                                <Route path="/seller" element={<AllowUser allowUser="seller">
                                        <AdminPageLayout />
                                    </AllowUser>}>
                                    <Route index element={<AdminDashboard />}></Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </>
                </AuthProvider>
        </GoogleOAuthProvider>
            </>
        }
    </>)
}

export default RouterConfig
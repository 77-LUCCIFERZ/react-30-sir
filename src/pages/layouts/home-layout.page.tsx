import { Outlet } from "react-router-dom"
import HomeHeader from "../../components/header/home-header.component"

const HomePageLayout = () => {
    return (<>
        <div className="py-3 bg-cyan-100">
            <p className=" mx-0 md:mx-6 lg:mx-10 xl:mx-16">
                Over the purchase of Npr.10,000, <span className="text-cyan-800 font-bold">Free Delivery</span>
            </p>
        </div>
        <HomeHeader />

        <Outlet />
    

        <footer className="mt-5 h-52 bg-slate-100">
            &copy; All Rights Reserved
        </footer>
    </>)
}

export default HomePageLayout
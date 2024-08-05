import "flowbite";
import AdminHeaderComponent from "../../components/header/admin-header.component";
import AdminSidebarComponent from "../../components/sidebar/admin-sidebar.component";
import { Outlet } from "react-router-dom";

const AdminPageLayout = () => {
    
    return (<>
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <AdminHeaderComponent />
            <AdminSidebarComponent />

            <main className="p-4 md:ml-64 h-auto pt-20">
                <Outlet />
            </main>
        </div>
    </>)
}

export default AdminPageLayout;
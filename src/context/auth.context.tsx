import { createContext, useEffect, useState } from "react";
import LoadingComponent from "../components/common/loading/loading.component";
import authSvc from "../pages/auth/auth.service";

let AuthContext = createContext({});


export const AuthProvider = ({children}: {children: any}) => {
    let [loggedInUser, setLoggedInUser] = useState();
    let [loading, setLoading] = useState<boolean>();
    // 
    const getLoggedInUser = async() => {
        setLoading(true);
        try {
            const response: any = await authSvc.getRequest("/auth/me", {auth: true});
            setLoggedInUser(response.result)
            setLoading(false)
        } catch(exception: any) {
            // error 
            if(exception.status === 401) {
                if(exception.data.message === "jwt expired") {
                    // refesh token call => 
                        // success locastorage _act => update, ref
                            // reload => navigate(0)
                }

                localStorage.removeItem("_act")
                localStorage.removeItem("_rft")
                // 
            }
            setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("_act")

        if(token) {
            getLoggedInUser()
        } else {
            setLoading(false)
        }
    }, [])
    return (
        <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {
                loading ? <> 
                    <LoadingComponent />
                </> : <>{children}</>
            }
        </AuthContext.Provider>
    )
}

export default AuthContext;
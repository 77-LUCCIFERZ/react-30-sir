import { useContext, useEffect, useState } from "react";
import HomePageTitle from "../../../components/common/title/home-title.component";
import LoadingComponent from "../../../components/common/loading/loading.component";
import { useNavigate, useParams } from "react-router-dom";
import authSvc from "../auth.service";
import { Button } from "flowbite-react";
import AuthContext from "../../../context/auth.context";
import { toast } from "react-toastify";

const ActivationPage = () => {
    const [loading, setLoading] = useState(true)
    let [msg, setMsg] = useState("");
    let [isExpired, setIsExpired] = useState(false);
    const navigate= useNavigate();

    const auth: any = useContext(AuthContext);

    const params = useParams()

    const getVerified = async() => {
        try {
            const token = params.token;
            await  authSvc.getRequest('/auth/activate/'+token);
            setMsg("Your account has been activated successfully. Please login to continue..")
        } catch(exception: any) {
            // handling
            if(+exception.status === 400 && exception.data.result && exception.data.result.hasOwnProperty('token') && exception.data.result.token === 'expired'){
                setMsg("Your token has been expired. Please cconfirm resending the token.");
                setIsExpired(true)
            } else {
                setMsg("Your account has been already activated. Please continue with login")
            }
        } finally {
            setLoading(false)
        }
    }

    const resendToken = async() => {
        try {
            setLoading(true);
            await authSvc.getRequest("/auth/resend-token/"+params.token);
            setMsg("A new activation email has been sent to your registered email. Please check for the further process.")
            // setIsExpired(false);
        } catch(exception) {
            setMsg("There was a problem while sending you the activation email again. Please contact our admin for activating your account.")
            // setIsExpired(false)
        } finally{
            setLoading(false)
            setIsExpired(false)
        }
    }
    
    useEffect(() => {
        getVerified()
    }, [])
    

    useEffect(() => {
        if(auth.loggedInUser) {
            toast.info("You are already loggedIn.")
            navigate("/"+auth.loggedInUser.role)
        }
    }, [auth])
    
    return (<>
        <HomePageTitle title="Activate Your Account" />
        <div className="mx-3 md:mx-20 py-5 gap-2 mt-5 min-h-screen">
            {
                loading ? <>
                
                <div className="text-center items-center justify-center">
                    <LoadingComponent size="xl" />
                </div>
            
                </> : <>
                <div className="text-center items-center justify-center">
                    {
                        msg ? msg : <></>
                    }
                    {
                        isExpired ? <>
                        <div className="flex">
                            <Button onClick={resendToken} className="w-[50%] bg-teal-800 mt-5 ">
                                Confirm Resending Activation Link
                            </Button>
                        </div>
                        </> : <></>
                    }
                </div>
                </>
            }
        </div>

    </>)
}

export default ActivationPage;
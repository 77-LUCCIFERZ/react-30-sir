import HttpService from "../../services/http.service";
import * as Yup from "yup"

class AuthService extends HttpService{
    
    regsiterUserDto = () => {
        const regsitrationDTO = Yup.object({
            name: Yup.string().matches(/^[a-zA-Z ]+$/, "Name can contain only alphabets and space").min(2).max(50).required(),
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,25}$/, "Password must contain one lowercase, one uppercase, one special character and a digit and must be of length 8 to 16 characters.").required(),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')]).required(),
            address: Yup.string().nullable().optional(),
            phone: Yup.string().matches(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/, "Invalid phone format"),
            image: Yup.mixed(),
            role: Yup.string().matches(/^(admin|seller|customer)$/, "Role can be admin or seller or customer").required()
        });  
        return regsitrationDTO
    }
}

const authSvc = new AuthService()
export default authSvc;
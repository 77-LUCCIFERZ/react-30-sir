import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { InputLabel } from "../../components/common/form/lable.component";
import { CancelButton, SingleImageUpload, StatusSelector, SubmitButton, TextInputComponent } from "../../components/common/form/input.component";
import { toast } from "react-toastify";
import brandSvc from "./brand.service";
import { useNavigate } from "react-router-dom";
import { ToggleSwitch } from "flowbite-react";

const AdminBrandCreate = () => {
    const [isFeatured, setIsFeatured] = useState<boolean>(false);

    const brandDTO = Yup.object({
        name: Yup.string().min(2).required(), 
        status: Yup.object({
            label: Yup.string().required(),
            value: Yup.string().required()
        }).required(),
        isFeatured: Yup.boolean().default(false),
        image: Yup.mixed().required()
    })

    const [loading, setLoading] = useState<boolean>(false)

    const {control, setValue, handleSubmit,setError, formState: {errors}} = useForm({
        resolver: yupResolver(brandDTO)
    })
    const navigate = useNavigate();

    const submitEvent = async (data: any) => {
        setLoading(true);
        try{
            const submitData = {
                ...data,
                status: data.status.value,
                isFeatured: isFeatured
            }
            // console.log(submitData)
            await brandSvc.postRequest('/brand', submitData, {auth: true, file: true})
            toast.success("Brand created successfully.")
            navigate("/admin/brand")
        } catch(exception: any) {
            if(+exception.status === 422) {
                const msgs = exception.data.result;
                Object.keys(msgs).map((field: any) => {
                    setError(field, {message: msgs[field]});
                })
            }
            toast.error("Brand cannot be added at this moment.")
        } finally{
            setLoading(false)
        }
    }
    return (<>
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto lg:py-12">
                <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">Add a new Brand</h2>
                <form onSubmit={handleSubmit(submitEvent)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="name">Name: </InputLabel>
                            <TextInputComponent 
                                name="name"
                                control={control}
                                msg={errors?.name?.message}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="Feaatured">Feature Brand: </InputLabel>
                            <ToggleSwitch checked={isFeatured} label="" onChange={setIsFeatured} />
                        </div>

                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="status">Status: </InputLabel>
                            <StatusSelector 
                                name="status"
                                control={control}
                                msg={errors?.status?.message}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="image">Image: </InputLabel>
                            <SingleImageUpload 
                                name="image"
                                msg={errors?.image?.message}
                                setValue={setValue}
                            />
                        </div>
                    </div>

                    <CancelButton loading={loading as boolean} btnTxt="Cancel"></CancelButton>
                    <SubmitButton loading={loading as boolean} btnTxt="Add Brand"></SubmitButton>
                    
                </form>
            </div>
        </section>
    </>)
}

export default AdminBrandCreate
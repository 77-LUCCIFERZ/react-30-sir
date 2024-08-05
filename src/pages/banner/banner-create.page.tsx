import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { InputLabel } from "../../components/common/form/lable.component";
import { CancelButton, SingleImageUpload, StatusSelector, SubmitButton, TextInputComponent } from "../../components/common/form/input.component";
import { INPUT_TYPE } from "../../components/common/form/input.contract";
import { toast } from "react-toastify";
import bannerSvc from "./banner.service";
import { useNavigate } from "react-router-dom";

const AdminBannerCreate = () => {
    const bannerDTO = Yup.object({
        name: Yup.string().min(2).required(), 
        status: Yup.object({
            label: Yup.string().required(),
            value: Yup.string().required()
        }).required(),
        link: Yup.string().url(),
        image: Yup.mixed().required()
    })

    const [loading, setLoading] = useState<boolean>(false)

    const {control, setValue, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(bannerDTO)
    })
    const navigate = useNavigate();

    const submitEvent = async (data: any) => {
        setLoading(true);
        try{
            const submitData = {
                ...data,
                status: data.status.value
            }
            await bannerSvc.postRequest('/banner', submitData, {auth: true, file: true})
            toast.success("Banner created successfully.")
            navigate("/admin/banner")
        } catch(exception) {
            console.log(exception);
            toast.error("Banner cannot be added at this moment.")
        } finally{
            setLoading(false)
        }
    }
    return (<>
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto lg:py-12">
                <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">Add a new Banner</h2>
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
                            <InputLabel htmlFor="link">Link: </InputLabel>
                            <TextInputComponent 
                                name="link"
                                type={INPUT_TYPE.URL}
                                control={control}
                                msg={errors?.link?.message}
                            />
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
                    <SubmitButton loading={loading as boolean} btnTxt="Add Banner"></SubmitButton>
                    
                </form>
            </div>
        </section>
    </>)
}

export default AdminBannerCreate
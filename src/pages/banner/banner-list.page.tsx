import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Table, Pagination, TextInput, Badge } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { TableRowSkeleton } from "../../components/common/table/skeleton.component";
import { toast } from "react-toastify";
import bannerSvc from "./banner.service";
import TableActionButtons from "../../components/common/table/action-buttons.component";

const AdminBannerList = () => {
    const [paginationData, setPaginationData] = useState({
        currentPage: 1, 
        totalpages: 1
    });

    const [banner, setBanner] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>();


    const onPageChange = (page: number) => {
        setPaginationData({
            ...paginationData,
            currentPage: page
        })
        loadAllBanners({
            currentPage: page, 
            limit: 10, 
            search: null
        })
    }

    const loadAllBanners = useCallback(async({currentPage=1, limit=10, search=''}: {currentPage?: number, limit?: number, search?: string | null}) => {
        setLoading(true);
        try {
            const response:any = await bannerSvc.getRequest("/banner", {auth: true, params: {limit: limit, page: currentPage, search: search}})
            setBanner(response.result)
            setPaginationData({
                ...paginationData,
                currentPage: response.meta.currentPage, 
                totalpages: response.meta.totalPages
            })
        } catch(exception) {
            console.error(exception)
            toast.error("Cannot load Banner. Please reload the page again")
        } finally {
            setLoading(false)
        }
    }, [paginationData, keyword])

    useEffect(() => {
        loadAllBanners({
            currentPage: 1, 
            limit: 10
        })
    }, [])

    // debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            loadAllBanners({
                currentPage: 1, 
                limit: 10, 
                search: keyword
            })    
        }, 1000)
        return () => {
            clearTimeout(handler);
        }
    }, [keyword])



    const deleteData = useCallback(async(id: string) => {
        try{
            setLoading(true)
            await bannerSvc.deleteRequest('/banner/'+id, {auth: true})
            toast.success("Banner Deleted successfully")
            loadAllBanners({
                currentPage: 1, 
                limit: 10
            })
            setLoading(false);
        } catch(exception) {
            console.log(exception)
            toast.error("Banner cannot be deleted at this moment")
        }
    }, [])

    return (<>
        <div className="my-5 border-b border-spacing-10 border-gray-700 flex justify-between">
            <h1 className="text-3xl font-semibold py-3">
                Banner List Page
            </h1>
            <NavLink to={'/admin/banner/create'} className={"flex bg-teal-700 px-5 text-center text-white py-3 rounded-md mb-3"}>
                <FaPlus /> Add Banner
            </NavLink>
        </div>

        <div className="overflow-x-auto my-5">
            <div className="flex overflow-x-auto sm:justify-end my-5">
                <TextInput onChange={(e) => {
                    e.preventDefault();
                    setKeyword(e.target.value)
                }} id="email4" type="email" rightIcon={FaSearch} placeholder="search" required className="w-1/4"/>
            </div>

            <Table hoverable>
                
                <Table.Head>
                    <Table.HeadCell className="bg-slate-800 text-white py-4">Title</Table.HeadCell>
                    <Table.HeadCell className="bg-slate-800 text-white py-4">Link</Table.HeadCell>
                    <Table.HeadCell className="bg-slate-800 text-white py-4">Status</Table.HeadCell>
                    <Table.HeadCell className="bg-slate-800 text-white py-4">Image</Table.HeadCell>
                    <Table.HeadCell className="bg-slate-800 text-white py-4">
                        Actions
                    </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    
                    {
                        loading ? <>
                        <TableRowSkeleton rows={5} cols={5} />
                        </> : (
                            banner ? <>
                            {
                                banner.map((row: any, indx: number) => (
                                    <Table.Row key={indx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{row.name}</Table.Cell>
                                        <Table.Cell>
                                            <a href={row.link} className="font-medium text-teal-600 hover:underline hover:text-teal-800" target="_banner">
                                                {row.link}
                                            </a>
                                        </Table.Cell>
                                        <Table.Cell className="flex flex-wrap">
                                            <Badge color={row.status === 'active' ? "green" : "red"} size={"sm"}>
                                                {row.status === 'active' ? "Publish" : "UnPublish"}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <img src={import.meta.env.VITE_IMAGE_URL+'banner/'+row.image} className="max-w-24"/>
                                        </Table.Cell>
                                        <Table.Cell className="flex">
                                            <TableActionButtons 
                                                deleteAction={deleteData}
                                                id={row._id}
                                                editUrl={'/admin/banner/'+row._id+'/edit'}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                            </> : <>
                                Add some data
                            </>
                        )
                    }

                </Table.Body>
            </Table>

            <div className="flex overflow-x-auto sm:justify-end">
                <Pagination currentPage={paginationData.currentPage} totalPages={paginationData.totalpages} onPageChange={onPageChange} />
            </div>
        </div>
    </>)
}

export default AdminBannerList;
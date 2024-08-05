import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Table, Pagination, TextInput, Badge } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { TableRowSkeleton } from "../../components/common/table/skeleton.component";
import { toast } from "react-toastify";
import brandSvc from "./brand.service";
import TableActionButtons from "../../components/common/table/action-buttons.component";

const AdminBrandList = () => {
    const [paginationData, setPaginationData] = useState({
        currentPage: 1, 
        totalpages: 1
    });

    const [brand, setBrand] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>();


    const onPageChange = (page: number) => {
        setPaginationData({
            ...paginationData,
            currentPage: page
        })
        loadAllBrands({
            currentPage: page, 
            limit: 10, 
            search: null
        })
    }

    const loadAllBrands = useCallback(async({currentPage=1, limit=10, search=''}: {currentPage?: number, limit?: number, search?: string | null}) => {
        setLoading(true);
        try {
            const response:any = await brandSvc.getRequest("/brand", {auth: true, params: {limit: limit, page: currentPage, search: search}})
            setBrand(response.result)
            setPaginationData({
                ...paginationData,
                currentPage: response.meta.currentPage, 
                totalpages: response.meta.totalPages
            })
        } catch(exception) {
            console.error(exception)
            toast.error("Cannot load Brand. Please reload the page again")
        } finally {
            setLoading(false)
        }
    }, [paginationData, keyword])

    useEffect(() => {
        loadAllBrands({
            currentPage: 1, 
            limit: 10
        })
    }, [])

    // debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            loadAllBrands({
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
            await brandSvc.deleteRequest('/brand/'+id, {auth: true})
            toast.success("Brand Deleted successfully")
            loadAllBrands({
                currentPage: 1, 
                limit: 10
            })
            setLoading(false);
        } catch(exception) {
            console.log(exception)
            toast.error("Brand cannot be deleted at this moment")
        }
    }, [])

    return (<>
        <div className="my-5 border-b border-spacing-10 border-gray-700 flex justify-between">
            <h1 className="text-3xl font-semibold py-3">
                Brand List Page
            </h1>
            <NavLink to={'/admin/brand/create'} className={"flex bg-teal-700 px-5 text-center text-white py-3 rounded-md mb-3"}>
                <FaPlus /> Add Brand
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
                    <Table.HeadCell className="bg-slate-800 text-white py-4">Name</Table.HeadCell>
                    <Table.HeadCell className="bg-slate-800 text-white py-4">Featured</Table.HeadCell>
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
                            brand ? <>
                            {
                                brand.map((row: any, indx: number) => (
                                    <Table.Row key={indx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{row.name}</Table.Cell>
                                        <Table.Cell>
                                            {row.isFeatured ? "Yes" : "No"}
                                        </Table.Cell>
                                        <Table.Cell className="flex flex-wrap">
                                            <Badge color={row.status === 'active' ? "green" : "red"} size={"sm"}>
                                                {row.status === 'active' ? "Publish" : "UnPublish"}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <img src={import.meta.env.VITE_IMAGE_URL+'brand/'+row.image} className="max-w-24"/>
                                        </Table.Cell>
                                        <Table.Cell className="flex">
                                            <TableActionButtons 
                                                deleteAction={deleteData}
                                                id={row._id}
                                                editUrl={'/admin/brand/'+row._id+'/edit'}
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

export default AdminBrandList;
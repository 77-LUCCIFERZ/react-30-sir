import { FaPen, FaTrash } from "react-icons/fa6"
import Swal from "sweetalert2"
import { NavLink } from "react-router-dom"

const TableActionButtons = ({deleteAction, id, editUrl}: {deleteAction: any, id: string, editUrl: string}) => {
    const handleDelete = async(e: any) => {
        e.preventDefault()
        try{
            const result =await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if(result.isConfirmed) {
                //
                deleteAction(id);
            }
        } catch(exception) {
            console.log(exception)
        }
    }
    return (<>
        <NavLink to={editUrl} className="me-3 font-medium rounded-full h-8 w-8 bg-teal-600 text-white text-center p-2">
            <FaPen></FaPen>
        </NavLink>
        <a onClick={handleDelete} href="#" className="me-3 font-medium rounded-full h-8 w-8 bg-red-600 text-white text-center p-2">
            <FaTrash />
        </a>
    </>)
}

export default TableActionButtons
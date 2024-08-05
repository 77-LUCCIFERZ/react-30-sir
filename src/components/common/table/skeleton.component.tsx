import { Table } from "flowbite-react"
export const TableRowSkeleton = ({rows, cols}: {rows: number, cols: number}) => {

    return (<>
        {
            [...Array(rows)].map((_, i:number) => (
                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    
                    {
                        [...Array(cols)].map((_, j:number) =>(
                            <Table.Cell key={j} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div role="status" className="max-w-sm animate-pulse">
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                                </div>
                            </Table.Cell>
                        ))
                    }
                </Table.Row>
            ))
        }
    
        
    </>)
}
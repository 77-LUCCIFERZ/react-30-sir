// component argumnets/parameter data pass => props
// children

import { ReactElement } from "react"

// props are read only data 
interface HeadingProps {
    value?: string | ReactElement,
    className?: string | null | undefined,
    children?: any 
}
export const Heading1 = ({value,className, children}: HeadingProps) => {
// export const Heading1 = (props: HeadingProps) => {
    // receive 
    // prepare
    return (<>
        <h1 className={`font-extrabold text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] xl:text-[48px] ${className}`}>
            {value ? value : children}
        </h1>
    </>)
}
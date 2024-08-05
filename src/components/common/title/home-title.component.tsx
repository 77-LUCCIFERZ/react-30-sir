import { Heading1 } from "../typography/typography.component"
export interface HomePageTitleProps {
    title: string, 
    url?: string | null |undefined
}
const HomePageTitle = ({title, url}: HomePageTitleProps) => {
    return (<>
    
        <div className="flex justify-between mx-3 md:mx-20 mt-5 border-b border-solid border-gray-400 bg-slate-100 p-3">
            <Heading1>{title}</Heading1>
            {
                url ? <><a href={url} className="text-teal-800 text-xl font-bold py-5 hover:cursor-pointer">
                View All &rarr;
            </a></> : <></>
            }
        </div>
    </>)
}

export default HomePageTitle
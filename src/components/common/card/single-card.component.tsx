import { Card } from "flowbite-react"
export interface CardWithImageProps {
    image: string, 
    title: string, 
    url: string
}
export const CardWithImage = ({image,title,url }: CardWithImageProps) => {
    return (<>
        <Card
            className="mb-3 sm:w-full"
            imgAlt={title}
            imgSrc={image}
        >
            <a href={url} className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </a>
        </Card>
    </>)
}
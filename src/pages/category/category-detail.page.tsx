
import HomePageTitle from "../../components/common/title/home-title.component"
import SingleProductComponent from "../../components/product/single-product.component"
import { useParams, useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const CategoryDetailPage = () => {
    // slug 
    const params = useParams()
    const [query, setQuery] =useSearchParams();

    // TODO: API CALL to populate
    const handleFilterClick = (price: string) => {
        setQuery({
            price: price
        })
    }

    useEffect(() => {
        console.log(query.get('price'))
    }, [query])

    return (<>
        <HomePageTitle title={`Category Detail of ${params.slug}`} />
        
        <button className="me-3" onClick={(e) => {
            e.preventDefault()
            handleFilterClick('1000-10000')
        }}>1000-10000</button>
        <button className="me-3" onClick={(e) => {
            e.preventDefault()
            handleFilterClick('10000-30000')
        }}>10000-30000</button>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-3 md:mx-20 py-5 gap-2 mt-5">
            
            {
                [...Array(25)].map((_, i: number) => (
                    <SingleProductComponent key={i} />
                ))
            }

        </div>
    </>)
}

export default CategoryDetailPage
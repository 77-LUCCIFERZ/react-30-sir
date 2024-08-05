import { HomePageBanner } from "../../components/banner/banner.componet";
import { CardWithImage } from "../../components/common/card/single-card.component";
import HomePageTitle from "../../components/common/title/home-title.component";

import SingleProductComponent from "../../components/product/single-product.component";
import "./index.css"



const LandingPage = () => {

    return (
        <>
            <HomePageBanner />


            <HomePageTitle title="Categories" url="/categories"/>
            <div className="md:flex lg:flex sm:grid-cols-1 mx-3 md:mx-20 py-5 gap-2 mt-5">
                {
                    [...Array(6)].map((_,i:number) => (
                        <CardWithImage 
                            key={i}
                            title="Gaming Chairs"
                            image="https://static-01.daraz.com.np/p/111d35ecd247836a611a67b62d724590.jpg"
                            url="/category/gaming-chairs"
                        />
                    ))
                }
            </div>


            <HomePageTitle title="Just For You" url="/all-products"/>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-3 md:mx-20 py-5 gap-2 mt-5">
                
                {
                    [...Array(25)].map((_, i: number) => (
                        <SingleProductComponent key={i} />
                    ))
                }

            </div>


            <footer className="bg-slate-300 h-40 mt-10 py-3 content-center">
                <p className="text-center">
                    <span className="mx-3">&copy; All rights reserverd.</span>
                    <span className="px-2">
                        Design and Developed by 
                        <a className="ms-2 text-teal-800 hover:cursor-pointer" target="_blank" href="https://broadwayinfosys.com">Broadway Infosys MERN Team</a>
                    </span>
                    
                </p>
            </footer>

        </>
    )
}

export default LandingPage
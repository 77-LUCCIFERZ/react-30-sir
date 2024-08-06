import { Navbar, MegaMenu } from "flowbite-react";
import { LinkComponent } from "../common/link/navbar-link.component";
import { useContext } from "react";
import AuthContext from "../../context/auth.context";
import { useSelector } from "react-redux";
import { useGetLoggedInUserQuery } from "../../pages/auth/authApi";
import { FaMessage } from "react-icons/fa6";
const HomeHeader = () => {
    // const auth: any = useContext(AuthContext);
    const {data, isLoading, isError} = useGetLoggedInUserQuery();

    if(isLoading) return <>Loading</>
    // if(isError) return <>Error </>

    let auth = data?.result;
    // const auth: any = useSelector((root: any) => {
    //     return root.auth.loggedInUser || null;
    // })
    
    return (<>
        <Navbar fluid rounded className="bg-gray-200 h-20 py-5 border-gray-200">
            <Navbar.Brand href="/" className="mx-0 md:mx-6 lg:mx-10 xl:mx-16">
                {/* <img src="" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <div className="flex md:order-2 mx-0 md:mx-6 lg:mx-10 xl:mx-16">
                <Navbar.Collapse>
                    
                    {
                        auth && auth ? <>
                            <LinkComponent link={"/chat"} icon={<FaMessage className="ms-3" />} text={"Chat"}/>
                            <LinkComponent link={"/"+auth.role} icon="&rarr;" text={auth.name}/>
                            <LinkComponent link="/logout" icon="&rarr;" text="Logout"/>
                        </> : <>
                            <LinkComponent link="/register" icon="&rarr;" text="Register"/>
                            <LinkComponent link="/login" icon="&rarr;" text="login"/>
                        </>
                    }
                </Navbar.Collapse>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse >
                <LinkComponent link="/" text="Home" />

                <Navbar.Link href="#">About</Navbar.Link>
                <MegaMenu.Dropdown toggle={<>Company</>}>
                    <ul className="grid grid-cols-3">
                        <div className="space-y-4 p-4">
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Library
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Resources
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Pro Version
                                </a>
                            </li>
                        </div>
                        <div className="space-y-4 p-4">
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Support Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Blog
                                </a>
                            </li>
                        </div>
                        <div className="space-y-4 p-4">
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Newsletter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    Playground
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                                    License
                                </a>
                            </li>
                        </div>
                    </ul>
                </MegaMenu.Dropdown>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>


    </>)
}

export default HomeHeader;
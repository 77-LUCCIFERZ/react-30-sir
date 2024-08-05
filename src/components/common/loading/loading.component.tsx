import { Spinner } from "flowbite-react";

const LoadingComponent = ({size='md'}: any) => {
    return (<>
        
        <Spinner size={size} aria-label="Center-aligned spinner example" />
    
    </>)
}

export default LoadingComponent;
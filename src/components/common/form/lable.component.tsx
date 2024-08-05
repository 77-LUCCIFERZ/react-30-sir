export interface IInputLabel{
    htmlFor?: string,
    children: any
}
export const InputLabel = ({htmlFor, children}: IInputLabel) => {
    return (<>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700"> {children} </label>
    </>)
}
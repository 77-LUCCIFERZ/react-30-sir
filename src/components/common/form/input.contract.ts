import { BaseSyntheticEvent } from "react"

// tel, range, ...
export enum INPUT_TYPE {
    TEXT= 'text',
    NUMBER='number',
    EMAIL="email",
    PASSWORD="password",
    TEL="tel",
    URL="url"
}
export type handleChangeType = (e: BaseSyntheticEvent)=>{}

export interface ITextInputComponent {
    type?: INPUT_TYPE,
    name: string, 
    defaultValue?: string,
    control: any,
    msg?:string | undefined | null
}

export interface IFileInputComponent {
    name: string, 
    setValue: any,
    msg?:string | undefined | null,
    imageUrl?: string | undefined | null
}

export interface SelectOption {
    label: string, 
    value: string
}

export interface ISelectProps {
    options: Array<SelectOption>,
    name: string, 
    control: any, 
    msg?: string | undefined | null, 
    defaultValue?: string,
    multiple?: boolean
}
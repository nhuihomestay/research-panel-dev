declare interface IValidateParameter<EFormat> {
    keyName: string
    keyValue: any
    format: EFormat
    regex: RegExp
}
declare interface IvalidateQueryParameter<EFormat> {
    keyName: string
    keyValue: any
    mapping: any[]
    format: EFormat
    regex: RegExp
}
declare interface IvalidateHeadersParameter<EFormat> {
    keyName: string
    keyValue: any
    mapping: any[]
    format: EFormat
    regex: RegExp
}
declare interface IValidateForm {
    isValidFormat: boolean
    isValidRequire: boolean
    isValidReg: boolean
}
declare interface IUniversalRequest {
    error?: string | undefined
    validateParameter?(parameter: IValidateParameter<any>[]): (string | undefined)
    validateQueryParameter?(parameter: IvalidateQueryParameter<any>[], keysList: string[]): (string | undefined)
    validateHeadersParameter?(parameter: IvalidateHeadersParameter<any>[]): (string | undefined)
}

declare module 'url-unshorten'
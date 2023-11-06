import { isEmpty, isUndefined } from 'lodash'
import { UNIVERSAL_REQUEST } from 'src/constant/UniversalRequest'

class UniversalRequest implements IUniversalRequest {
    error: string | undefined
    private errAry: string[] = []

    constructor() {
        this.error = undefined
    }

    validateParameter(parameter: IValidateParameter<UNIVERSAL_REQUEST>[] = []): (string | undefined) {
        if (parameter.length === 0) return

        const lenOfParameter = parameter.length
        for (let i = 0; i < lenOfParameter; i++) {
            const validateParam: IValidateParameter<UNIVERSAL_REQUEST> = parameter[i]
            const { format, keyName, keyValue, regex } = validateParam
            const validateForm: IValidateForm = {
                isValidFormat: true,
                isValidRequire: true,
                isValidReg: true
            }

            validateForm.isValidRequire = (!isEmpty(keyValue) || !isUndefined(keyValue))
            if (!validateForm.isValidRequire) {
                this.genErrorMessage(keyName, validateForm)
                continue
            }
            validateForm.isValidFormat = this.checkValidFormat(format, keyValue)
            if (!validateForm.isValidFormat) {
                this.genErrorMessage(keyName, validateForm)
                continue
            }
            validateForm.isValidReg = regex.test(keyValue)
            if (!validateForm.isValidReg) {
                this.genErrorMessage(keyName, validateForm)
                continue
            }
        }
        if (this.errAry.length > 1) {
            return this.errAry.join(', ')
        } else if (this.errAry.length === 1) {
            return this.errAry[0]
        } else {
            return
        }
    }

    validateQueryParameter(parameter: IvalidateQueryParameter<UNIVERSAL_REQUEST>[] = [], keyList: string[]): (string | undefined) {
        if (parameter.length === 0) return
        let isValueEmpty = false
        let isKeyNotMatch = false
        const lenOfParameter = parameter.length
        const originkeysList = []
        for (let i = 0; i < lenOfParameter; i++) {
            const validateParam: IvalidateQueryParameter<UNIVERSAL_REQUEST> = parameter[i]
            const { format, keyName, mapping, keyValue, regex } = validateParam
            const validateForm: IValidateForm = {
                isValidFormat: true,
                isValidRequire: true,
                isValidReg: true
            }

            originkeysList.push(keyName)

            if (keyName === 'token') {
                if (!keyValue) {
                    validateForm.isValidRequire = (!isEmpty(keyValue) || !isUndefined(keyValue))
                    this.genErrorMessage(keyName, validateForm)
                }
                continue
            }

            if (format !== 'not') {
                validateForm.isValidFormat = this.checkValidFormat(format, keyValue)
                if (!validateForm.isValidFormat) {
                    this.genErrorMessage(keyName, validateForm)
                    continue
                }
            }

            if (mapping.length > 0) {
                if (mapping.filter((data: any) => data === keyValue).length === 0) {
                    this.errAry.push(`${keyName} not match condition`)
                }
                continue
            }

            validateForm.isValidReg = regex.test(keyValue)
            if (!validateForm.isValidReg) {
                this.genErrorMessage(keyName, validateForm)
                continue
            }

            if (keyName) {
                if (String(keyValue).trim().length === 0) {
                    isValueEmpty = true
                }
                continue
            }
        }

        for (const item of keyList) {
            const compare = originkeysList.filter((data: string) => {
                return data === item
            })

            if (compare.length === 0) {
                isKeyNotMatch = true
            }
        }

        if (isKeyNotMatch) {
            this.errAry.push(`key not match condition`)
        }

        if (isValueEmpty) {
            this.errAry.push(`can't enter the value empty`)
        }

        if (this.errAry.length > 1) {
            return this.errAry.join(', ')
        } else if (this.errAry.length === 1) {
            return this.errAry[0]
        } else {
            return
        }
    }

    validateHeadersParameter(parameter: IvalidateQueryParameter<UNIVERSAL_REQUEST>[] = []): (string | undefined) {
        if (parameter.length === 0) return

        const lenOfParameter = parameter.length
        for (let i = 0; i < lenOfParameter; i++) {
            const validateParam: IvalidateQueryParameter<UNIVERSAL_REQUEST> = parameter[i]
            const { format, keyName, mapping, keyValue, regex } = validateParam
            const validateForm: IValidateForm = {
                isValidFormat: true,
                isValidRequire: true,
                isValidReg: true
            }

            if (keyName === 'token') {
                if (!keyValue) {
                    validateForm.isValidRequire = (!isEmpty(keyValue) || !isUndefined(keyValue))
                    this.genErrorMessage(keyName, validateForm)
                }
                continue
            }

            if (format !== 'not') {
                validateForm.isValidFormat = this.checkValidFormat(format, keyValue)
                if (!validateForm.isValidFormat) {
                    this.genErrorMessage(keyName, validateForm)
                    continue
                }
            }

            if (mapping.length > 0) {
                if (mapping.filter((data: any) => data === keyValue).length === 0) {
                    this.errAry.push(`${keyName} invalid match condition`)
                }
                continue
            }

            validateForm.isValidReg = regex.test(keyValue)
            if (!validateForm.isValidReg) {
                this.genErrorMessage(keyName, validateForm)
                continue
            }
        }

        if (this.errAry.length > 1) {
            return this.errAry.join(', ')
        } else if (this.errAry.length === 1) {
            return this.errAry[0]
        } else {
            return
        }
    }

    private checkValidFormat(format: UNIVERSAL_REQUEST, value: any): boolean {
        if (typeof value === format) {
            return true
        } else {
            return false
        }
    }

    private genErrorMessage(keyName: string, validateForm: IValidateForm): void {
        const {
            isValidFormat,
            isValidRequire,
            isValidReg
        } = validateForm

        if (!isValidRequire) { this.errAry.push(`require ${keyName} field`); return }
        if (!isValidFormat) { this.errAry.push(`${keyName} invalid format`); return }
        if (!isValidReg) { this.errAry.push(`${keyName} invalid pattern`); return }
    }
}

export { UNIVERSAL_REQUEST as UNIVERSAL_REQUEST }
export default UniversalRequest
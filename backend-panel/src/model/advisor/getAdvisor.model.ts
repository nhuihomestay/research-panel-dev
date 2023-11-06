import UniversalRequest from '../UniversalRequest.model';
import { UNIVERSAL_REQUEST } from 'src/constant/UniversalRequest'

class GetAdvisorRequest extends UniversalRequest {
    public advisorName: string
    public error: string | undefined

    constructor(
        query: {
            advisor_name: string
        }
    ) {
        super()
        this.advisorName = query.advisor_name
        this.error = undefined

        const validateForm: IValidateParameter<UNIVERSAL_REQUEST>[] = []
        validateForm.push(
            {
                keyName: 'advisor_name',
                keyValue: this.advisorName,
                format: UNIVERSAL_REQUEST.STRING,
                regex: new RegExp(/.{1,}/)
            }
        )


        this.error = super.validateParameter(validateForm)
    }
}

export {
    GetAdvisorRequest,
}
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import Ajv from 'ajv'
const ajv = new Ajv()

const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'production',
        type: String,
    }
])

const result = dotenv.config({
    path: `./env/dev.env`,
})

const schema = {
    type: "object",
    properties: {
        DATABASE_ENV: { type: "string" }
    },
    required: ['DATABASE_ENV']
}

const validate: any = ajv.compile(schema)
const valid = validate(result.parsed)

if (!valid) {
    const verifyENVFail = validate.errors[0].message
    throw new Error(verifyENVFail)
}

if (result.error) {
    throw result.error
}
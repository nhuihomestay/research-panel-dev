import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import Ajv from 'ajv'
const ajv = new Ajv()

const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'prod',
        type: String,
    }
])

const result = dotenv.config({
    path: `./env/${options.env}.env`,
})

const schema = {
    type: "object",
    properties: {
        DATABASE_ENV: { type: "string" },
        ENDPOINT_ENV: { type: "string" },
        PORT: { type: "string" }
    },
    required: ['DATABASE_ENV', 'ENDPOINT_ENV', 'PORT']
}

const validate: any = ajv.compile(schema)
const valid = validate(result.parsed)

if (!valid) {
    const verifyENVFail = validate.errors[0].message
    throw new Error(verifyENVFail)
}

console.log(`Validate env file Success`)

if (result.error) {
    throw result.error
}
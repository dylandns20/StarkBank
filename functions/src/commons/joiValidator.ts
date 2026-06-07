import Joi from 'joi';
import * as logger from "firebase-functions/logger";

const defaultOptions: Joi.ValidationOptions = {
    abortEarly: false, // return all errors
    allowUnknown: true, // allow unknown keys that are not defined in the schema
    stripUnknown: true // remove unknown keys from the validated data
};

export const joiValidator = (schema: Joi.Schema, data: any, options?: Joi.ValidationOptions) => {
    const {error, value} = schema.validate(data, { ...defaultOptions, ...options});

    if (error) {
        logger.error(`Validation error: `, {error});
        throw new Error(`Validation error: ${error.message}`);
    }

    return value;
}
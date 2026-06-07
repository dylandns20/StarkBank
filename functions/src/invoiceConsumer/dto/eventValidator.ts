import Joi from 'joi';
import { IEventPayload } from './event.interface';
import { joiValidator } from '../../commons/joiValidator';
import * as logger from "firebase-functions/logger";

const userSchema = Joi.object<IEventPayload, true>({
    id: Joi.string().required(),
    isDelivered: Joi.boolean().required(),
    subscription: Joi.string().required(),
    created: Joi.string().isoDate().required(),
    log: Joi.object({
        id: Joi.string().required(),
        errors: Joi.array().items(Joi.string()).required(),
        type: Joi.string().required(),
        created: Joi.string().isoDate().required(),
        transfer: Joi.object({
            id: Joi.string().required(),
            status: Joi.string().required(),
            amount: Joi.number().required(),
            name: Joi.string().required(),
            bankCode: Joi.string().required(),
            branchCode: Joi.string().required(),
            accountNumber: Joi.string().required(),
            taxId: Joi.string().required(),
            tags: Joi.array().items(Joi.string()).required(),
            created: Joi.string().isoDate().required(),
            updated: Joi.string().isoDate().required(),
            transactionIds: Joi.array().items(Joi.string()).required(),
            fee: Joi.number().required()
        }).required()
    }).required()
});

export const validateEventPayload = (data: any): IEventPayload => {
    try {
        
        const event = joiValidator(userSchema, data);

        return event;

    } catch (error) {

        logger.error("Error on EventValidator.validateEventPayload", {error});
        throw error;
    }
}
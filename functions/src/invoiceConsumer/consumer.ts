import * as logger from "firebase-functions/logger";
import * as express from "express";
import {Request} from "firebase-functions/https";
import { validateEventPayload } from "./dto/eventValidator";
import { IEventPayload } from "./dto/event.interface";
import * as starkbankService from "../service/starkbank/starkbank.service";
import { ITransferRequestBody, ITransferRequest } from "../service/starkbank/interfaces/transfer.interface";

const transferTargetAccount = {
    bankCode: "20018183",
    branch: "0001",
    account: "6341320293482496",
    name: "Stark Bank S.A.",
    taxId: "20.018.183/0001-80",
    accountType: "payment" as const,
}

const validateRequest = (request: Request) => {
    try {

        const payload = request.body as any;

        logger.info("Validating request", {payload});

        const event = validateEventPayload(payload?.event);

        return {event, isValid: true};

    }catch (error) {
        logger.warn( "Error validating request", { error });
        return { event: null, isValid: false };
    }
};

const calculateTransferAmount = (event: IEventPayload): number => {

    const { log } = event;
    const { invoice } = log;

    const amount = invoice.amount;

    return amount;
}

const makeTransaction = async (event: IEventPayload) => {
    try {

        // calculate the transaction payload
        const amount = calculateTransferAmount(event);

        const transfer: ITransferRequest = {
            amount,
            taxId: transferTargetAccount.taxId,
            name: transferTargetAccount.name,
            bankCode: transferTargetAccount.bankCode,
            branchCode: transferTargetAccount.branch,
            accountNumber: transferTargetAccount.account,
            accountType: transferTargetAccount.accountType,
        }

        const payload: ITransferRequestBody = {
            transfers: [transfer],
        };

        // request the transaction to the bank API
        const transfers  = await starkbankService.requestTransfer(payload);
        logger.info("Transaction successful", {transfers});

    }catch (error) {
        logger.error("Error making transaction", {error});
        throw new Error("Transaction failed");
    }
};

export const invoiceConsumer = async (request: Request, response: express.Response) => {
    try{

        // validate the request input
        const { event, isValid } = validateRequest(request);

        if(isValid && event) {

            // make the transaction
            await makeTransaction(event);

        }

        response.status(200).send("OK");

    } catch (error) {
        logger.error("Error processing invoice", {error});
        response.status(500).send("Error processing invoice");
    }
};
import * as logger from "firebase-functions/logger";
import { defineSecret, defineString } from "firebase-functions/params";
import { onInit } from "firebase-functions/v2/core";
import * as starkbank from 'starkbank';
import { ITransferRequestBody } from "./interfaces/transfer.interface";
import { IInvoiceRequest } from "./interfaces/invoice.interface";

const starkBankEnvironment = defineString('STARK_BANK_ENVIRONMENT', {
    default: "sandbox",
    description: "The environment to use for Stark Bank API calls. Can be 'sandbox' or 'production'."
});
const starkBankProjectId = defineString('STARK_BANK_PROJECT_ID', {
    description: "The project ID for Stark Bank API calls."
});
const apiKey = defineSecret('STARK_BANK_API_KEY');

onInit(() => {

    const project = new starkbank.Project({
        environment: starkBankEnvironment.value(),
        id: starkBankProjectId.value(),
        privateKey: apiKey.value(),
    });

    starkbank.setUser(project);
});

export async function requestTransfer(payload: ITransferRequestBody){
    try{

        const transfers = payload.transfers.map((transfer)=> new starkbank.Transfer({
            amount: transfer.amount,
            taxId: transfer.taxId,
            name: transfer.name,
            bankCode: transfer.bankCode,
            branchCode: transfer.branchCode,
            accountNumber: transfer.accountNumber,
            accountType: transfer.accountType, 
            description: transfer.description,
            externalId: transfer.externalId,
            scheduled: transfer.scheduled,
            tags: transfer.tags,
            rules: transfer.rules,
        }));

        const response = await starkbank.transfer.create(transfers);

        return response;

    } catch (error) {
        
        logger.error("Error on Starkbank.requestTransfer", {error});

        throw new Error("Transfer request failed");
    }
}

export async function requestInvoice(payload: IInvoiceRequest){
        try{

        const invoices = payload.invoices.map((invoice) => new starkbank.Invoice({
            amount: invoice.amount,
            taxId: invoice.taxId,
            name: invoice.name,
            due: invoice.due,
            fine: invoice.fine,
            interest: invoice.interest,
            expiration: invoice.expiration,
            splits: invoice.splits?.map((split) => new starkbank.Split({
                receiverId: split.receiverId,
                amount: split.amount,
            })),
            discounts: invoice.discounts,
            descriptions: invoice.descriptions,
            tags: invoice.tags,
            rules: invoice.rules,
        }));

        const response = await starkbank.invoice.create(invoices);

        return response;

    } catch (error) {
        
        logger.error("Error on Starkbank.requestInvoice", {error});

        throw new Error("Invoice request failed");
    }
}
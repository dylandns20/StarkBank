import * as logger from "firebase-functions/logger";
import * as starkbankService from "../service/starkbank/starkbank.service";
import { IInvoiceRequest } from "../service/starkbank/interfaces/invoice.interface";

export const generateInvoices = async ()=> {
  try {

    logger.info("Generating invoices...");
    
    const payload: IInvoiceRequest = {
        invoices: [
            {
                amount: 1000,
                taxId: "12345678900",
                name: "John Doe",
            }
        ]
    };

    const invoices = await starkbankService.requestInvoice(payload);

    logger.info("Invoices generated successfully:", invoices);

  } catch (error) {
    logger.error("Error generating invoices:", error);
  }
}
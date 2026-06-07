import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import { invoiceConsumer } from "./invoiceConsumer/consumer";
import { onSchedule } from "firebase-functions/scheduler";
import { generateInvoices } from "./invoiceGenerator/generator";

setGlobalOptions({ maxInstances: 2 });

export const invoiceGenerator = onSchedule(
  "0 * * * *",
  generateInvoices,
);

export const invoiceWebhook = onRequest(invoiceConsumer);

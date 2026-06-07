import { IInvoiceRequest } from "../../service/starkbank/interfaces/invoice.interface";

export interface IRequestEventPayload {
  event: IEventPayload;
}

export interface IEventPayload {
  id: string;
  isDelivered: boolean;
  subscription: string;
  created: string; // ISO timestamp
  log: IEventLog;
}

interface IEventLog {
  id: string;
  errors: string[];
  type: string;
  created: string; // ISO timestamp
  invoice: IInvoiceRequest['invoices'][0];
}


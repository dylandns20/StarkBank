/**
 * ITransferRequestBody
 *
 * - amount (required): Positive integer amount in cents. Example: 100 (R$1.00)
 * - name (required): Receiver full name. Example: "Joana da Silva"
 * - taxId (required): Receiver CPF (11 digits) or CNPJ (14 digits), formatted or not.
 * - bankCode (required): Bank ISPB (8 digits) for Pix or usual bank code (1-3 digits) for TED.
 * - branchCode (required): Bank branch, use '-' if a validation digit exists. Example: 1234-5
 * - accountNumber (required): Account number, include '-' before validation digit. Example: 876543-2
 * - accountType (optional): One of "checking" | "payment" | "savings" | "salary" (default: "checking").
 * - description (optional): Description for bank statement.
 * - externalId (optional): Unique id to prevent duplicate transfers.
 * - scheduled (optional): ISO date/time or date string. Example: "2020-08-14T15:23:26+00:00" or "2020-08-14"
 * - tags (optional): Array of strings to tag the transfer; tags are lowercased.
 * - rules (optional): Array of key/value rules to modify transfer behavior.
 * 
 * Reference: https://starkbank.com/docs/api#transfer
 */

export interface ITransferRequestBody {
  transfers: ITransferRequest[];
}

interface IRule {
  key: string;
  value: number;
}

export interface ITransferRequest {
  amount: number;
  taxId: string;
  name: string;
  bankCode: string;
  branchCode: string;
  accountNumber: string;
  accountType?: 'checking' | 'payment' | 'savings' | 'salary';
  description?: string;
  externalId?: string;
  scheduled?: string; // ISO date or datetime
  tags?: string[];
  rules?: IRule[];
}

/**
 * ITransferResponseBody
 *
 * Response example converted to types.
 */
export interface ITransferResponseBody {
  message: string;
  transfers: ITransferResponse[];
}

interface ITransferResponse {
  accountNumber: string;
  accountType?: 'checking' | 'payment' | 'savings' | 'salary';
  amount: number;
  bankCode: string;
  branchCode: string;
  created: string; // ISO timestamp
  description?: string;
  externalId?: string;
  fee: number;
  id: string;
  name: string;
  displayDescription?: string;
  rules?: IRule[];
  scheduled?: string; // ISO datetime
  status: string;
  tags: string[];
  taxId: string;
  transactionIds: string[];
  updated?: string; // ISO timestamp
}

export interface ITransfer {
  id: string;
  status: string;
  amount: number;
  name: string;
  bankCode: string;
  branchCode: string;
  accountNumber: string;
  taxId: string;
  tags: string[];
  created: string; // ISO timestamp
  updated: string; // ISO timestamp
  transactionIds: string[];
  fee: number;
}

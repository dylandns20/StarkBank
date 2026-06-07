/**
 * IInvoiceRequest
 *
 * Fields
 * - amount (required): Non-negative integer amount in cents. When paid, updated to actual paid amount. Example: 100 (R$1.00)
 * - taxId (required): Payer CPF (11 digits) or CNPJ (14 digits), formatted or unformatted.
 * - name (required): Payer full name. Example: "Anthony Edward Stark"
 * - due (optional): Requested payment due datetime in ISO format. Default: 2 days after creation.
 * - fine (optional): Percentage fee applied after due date. Default: 2.00 (2%).
 * - interest (optional): Monthly interest percentage after due date. Default: 1.00 (1%).
 * - expiration (optional): Seconds from due datetime until invoice expires. Default: 5097600 (59 days).
 * - splits (optional): Array of `Split` to indicate payment receivers.
 * - discounts (optional): Up to 5 discounts with `percentage` and `due` (ISO datetime).
 * - descriptions (optional): Up to 15 `Description` items with `key` and `value`.
 * - tags (optional): Array of strings; tags are lowercased.
 * - rules (optional): Array of `Rule` for modifying invoice behavior.
 */
export interface IInvoiceRequest {
  invoices: {
    amount: number;
    taxId: string;
    name: string;
    due?: string; // ISO datetime
    fine?: number; // percentage
    interest?: number; // monthly percentage
    expiration?: number; // seconds
    splits?: ISplit[];
    discounts?: IDiscount[];
    descriptions?: IDescription[];
    tags?: string[];
    rules?: IRule[];
  }[];
}

interface ISplit {
  receiverId: string;
  amount: number;
}

interface IDiscount {
  percentage: number;
  due: string; // ISO datetime
}

interface IDescription {
  key: string;
  value: string;
}

interface IRule {
  key: string;
  value: any;
}
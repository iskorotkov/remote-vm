/**
 * The InvoicePreview model module.
 * @module model/InvoicePreview
 * @version 2.0
 */
export class InvoicePreview {
    /**
     * Constructs a <code>InvoicePreview</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvoicePreview} obj Optional instance to populate.
     * @return {module:model/InvoicePreview} The populated <code>InvoicePreview</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The UUID of the invoice. The canonical reference for the invoice.
     * @member {String} invoiceUuid
     */
    invoiceUuid: any;
    /**
     * Total amount of the invoice, in USD.  This will reflect month-to-date usage in the invoice preview.
     * @member {String} amount
     */
    amount: any;
    /**
     * Billing period of usage for which the invoice is issued, in `YYYY-MM`  format.
     * @member {String} invoicePeriod
     */
    invoicePeriod: any;
    /**
     * Time the invoice was last updated.  This is only included with the invoice preview.
     * @member {String} updatedAt
     */
    updatedAt: any;
}

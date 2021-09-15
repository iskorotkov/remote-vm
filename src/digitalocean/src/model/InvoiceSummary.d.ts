/**
 * The InvoiceSummary model module.
 * @module model/InvoiceSummary
 * @version 2.0
 */
export class InvoiceSummary {
    /**
     * Constructs a <code>InvoiceSummary</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvoiceSummary} obj Optional instance to populate.
     * @return {module:model/InvoiceSummary} The populated <code>InvoiceSummary</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * UUID of the invoice
     * @member {String} invoiceUuid
     */
    invoiceUuid: any;
    /**
     * Billing period of usage for which the invoice is issued, in `YYYY-MM`  format.
     * @member {String} billingPeriod
     */
    billingPeriod: any;
    /**
     * Total amount of the invoice, in USD.  This will reflect month-to-date usage in the invoice preview.
     * @member {String} amount
     */
    amount: any;
    /**
     * Name of the DigitalOcean customer being invoiced.
     * @member {String} userName
     */
    userName: any;
    /**
     * @member {Object} userBillingAddress
     */
    userBillingAddress: any;
    /**
     * Company of the DigitalOcean customer being invoiced, if set.
     * @member {String} userCompany
     */
    userCompany: any;
    /**
     * Email of the DigitalOcean customer being invoiced.
     * @member {String} userEmail
     */
    userEmail: any;
    /**
     * @member {Object} productCharges
     */
    productCharges: any;
    /**
     * @member {Object} overages
     */
    overages: any;
    /**
     * @member {Object} taxes
     */
    taxes: any;
    /**
     * @member {Object} creditsAndAdjustments
     */
    creditsAndAdjustments: any;
}

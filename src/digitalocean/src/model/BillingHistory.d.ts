/**
 * The BillingHistory model module.
 * @module model/BillingHistory
 * @version 2.0
 */
export class BillingHistory {
    /**
     * Constructs a <code>BillingHistory</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BillingHistory} obj Optional instance to populate.
     * @return {module:model/BillingHistory} The populated <code>BillingHistory</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Description of the billing history entry.
     * @member {String} description
     */
    description: any;
    /**
     * Amount of the billing history entry.
     * @member {String} amount
     */
    amount: any;
    /**
     * ID of the invoice associated with the billing history entry, if  applicable.
     * @member {String} invoiceId
     */
    invoiceId: any;
    /**
     * UUID of the invoice associated with the billing history entry, if  applicable.
     * @member {String} invoiceUuid
     */
    invoiceUuid: any;
    /**
     * Time the billing history entry occured.
     * @member {Date} _date
     */
    _date: any;
    /**
     * Type of billing history entry.
     * @member {module:model/BillingHistory.TypeEnum} type
     */
    type: any;
}
export namespace BillingHistory {
    namespace TypeEnum {
        const aCHFailure: string;
        const adjustment: string;
        const attemptFailed: string;
        const chargeback: string;
        const credit: string;
        const creditExpiration: string;
        const invoice: string;
        const payment: string;
        const refund: string;
        const reversal: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

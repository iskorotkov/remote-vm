/**
 * The AllOfinvoiceSummaryCreditsAndAdjustments model module.
 * @module model/AllOfinvoiceSummaryCreditsAndAdjustments
 * @version 2.0
 */
export class AllOfinvoiceSummaryCreditsAndAdjustments {
    /**
     * Constructs a <code>AllOfinvoiceSummaryCreditsAndAdjustments</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AllOfinvoiceSummaryCreditsAndAdjustments} obj Optional instance to populate.
     * @return {module:model/AllOfinvoiceSummaryCreditsAndAdjustments} The populated <code>AllOfinvoiceSummaryCreditsAndAdjustments</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Name of the charge
     * @member {String} name
     */
    name: any;
    /**
     * Total amount charged in USD
     * @member {String} amount
     */
    amount: any;
}

/**
 * The AllOfinvoiceSummaryProductCharges model module.
 * @module model/AllOfinvoiceSummaryProductCharges
 * @version 2.0
 */
export class AllOfinvoiceSummaryProductCharges {
    /**
     * Constructs a <code>AllOfinvoiceSummaryProductCharges</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AllOfinvoiceSummaryProductCharges} obj Optional instance to populate.
     * @return {module:model/AllOfinvoiceSummaryProductCharges} The populated <code>AllOfinvoiceSummaryProductCharges</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Description of usage charges
     * @member {String} name
     */
    name: any;
    /**
     * Total amount charged
     * @member {String} amount
     */
    amount: any;
    /**
     * List of amount, and grouped aggregates by resource type.
     * @member {Array.<module:model/ProductChargeItem>} items
     */
    items: any;
}

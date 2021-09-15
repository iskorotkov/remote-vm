/**
 * The ProductChargeItem model module.
 * @module model/ProductChargeItem
 * @version 2.0
 */
export class ProductChargeItem {
    /**
     * Constructs a <code>ProductChargeItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProductChargeItem} obj Optional instance to populate.
     * @return {module:model/ProductChargeItem} The populated <code>ProductChargeItem</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Amount of the charge
     * @member {String} amount
     */
    amount: any;
    /**
     * Description of the charge
     * @member {String} name
     */
    name: any;
    /**
     * Number of times the charge was applied
     * @member {String} count
     */
    count: any;
}

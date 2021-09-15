/**
 * The SimpleCharge model module.
 * @module model/SimpleCharge
 * @version 2.0
 */
export class SimpleCharge {
    /**
     * Constructs a <code>SimpleCharge</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SimpleCharge} obj Optional instance to populate.
     * @return {module:model/SimpleCharge} The populated <code>SimpleCharge</code> instance.
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

/**
 * The LbIdDropletsBody1 model module.
 * @module model/LbIdDropletsBody1
 * @version 2.0
 */
export class LbIdDropletsBody1 {
    /**
     * Constructs a <code>LbIdDropletsBody1</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LbIdDropletsBody1} obj Optional instance to populate.
     * @return {module:model/LbIdDropletsBody1} The populated <code>LbIdDropletsBody1</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LbIdDropletsBody1</code>.
     * @alias module:model/LbIdDropletsBody1
     * @class
     * @param dropletIds {Array.<Number>} An array containing the IDs of the Droplets assigned to the load balancer.
     */
    constructor(dropletIds: Array<number>);
    dropletIds: number[];
}

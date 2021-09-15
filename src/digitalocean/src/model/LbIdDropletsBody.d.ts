/**
 * The LbIdDropletsBody model module.
 * @module model/LbIdDropletsBody
 * @version 2.0
 */
export class LbIdDropletsBody {
    /**
     * Constructs a <code>LbIdDropletsBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LbIdDropletsBody} obj Optional instance to populate.
     * @return {module:model/LbIdDropletsBody} The populated <code>LbIdDropletsBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LbIdDropletsBody</code>.
     * @alias module:model/LbIdDropletsBody
     * @class
     * @param dropletIds {Array.<Number>} An array containing the IDs of the Droplets assigned to the load balancer.
     */
    constructor(dropletIds: Array<number>);
    dropletIds: number[];
}

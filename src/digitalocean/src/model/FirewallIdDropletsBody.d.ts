/**
 * The FirewallIdDropletsBody model module.
 * @module model/FirewallIdDropletsBody
 * @version 2.0
 */
export class FirewallIdDropletsBody {
    /**
     * Constructs a <code>FirewallIdDropletsBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallIdDropletsBody} obj Optional instance to populate.
     * @return {module:model/FirewallIdDropletsBody} The populated <code>FirewallIdDropletsBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FirewallIdDropletsBody</code>.
     * @alias module:model/FirewallIdDropletsBody
     * @class
     * @param dropletIds {Array.<Number>} An array containing the IDs of the Droplets to be assigned to the firewall.
     */
    constructor(dropletIds: Array<number>);
    dropletIds: number[];
}

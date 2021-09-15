/**
 * The FirewallIdDropletsBody1 model module.
 * @module model/FirewallIdDropletsBody1
 * @version 2.0
 */
export class FirewallIdDropletsBody1 {
    /**
     * Constructs a <code>FirewallIdDropletsBody1</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallIdDropletsBody1} obj Optional instance to populate.
     * @return {module:model/FirewallIdDropletsBody1} The populated <code>FirewallIdDropletsBody1</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FirewallIdDropletsBody1</code>.
     * @alias module:model/FirewallIdDropletsBody1
     * @class
     * @param dropletIds {Array.<Number>} An array containing the IDs of the Droplets to be removed from the firewall.
     */
    constructor(dropletIds: Array<number>);
    dropletIds: number[];
}

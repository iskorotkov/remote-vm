/**
 * The FirewallRules model module.
 * @module model/FirewallRules
 * @version 2.0
 */
export class FirewallRules {
    /**
     * Constructs a <code>FirewallRules</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallRules} obj Optional instance to populate.
     * @return {module:model/FirewallRules} The populated <code>FirewallRules</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<Object>} inboundRules
     */
    inboundRules: any;
    /**
     * @member {Array.<Object>} outboundRules
     */
    outboundRules: any;
}

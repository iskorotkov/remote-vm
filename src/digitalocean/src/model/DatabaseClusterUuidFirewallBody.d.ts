/**
 * The DatabaseClusterUuidFirewallBody model module.
 * @module model/DatabaseClusterUuidFirewallBody
 * @version 2.0
 */
export class DatabaseClusterUuidFirewallBody {
    /**
     * Constructs a <code>DatabaseClusterUuidFirewallBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseClusterUuidFirewallBody} obj Optional instance to populate.
     * @return {module:model/DatabaseClusterUuidFirewallBody} The populated <code>DatabaseClusterUuidFirewallBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/FirewallRule>} rules
     */
    rules: any;
}

/**
 * The FirewallRuleTarget model module.
 * @module model/FirewallRuleTarget
 * @version 2.0
 */
export class FirewallRuleTarget {
    /**
     * Constructs a <code>FirewallRuleTarget</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallRuleTarget} obj Optional instance to populate.
     * @return {module:model/FirewallRuleTarget} The populated <code>FirewallRuleTarget</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An array of strings containing the IPv4 addresses, IPv6 addresses, IPv4 CIDRs, and/or IPv6 CIDRs to which the firewall will allow traffic.
     * @member {Array.<String>} addresses
     */
    addresses: any;
    /**
     * An array containing the IDs of the Droplets to which the firewall will allow traffic.
     * @member {Array.<Number>} dropletIds
     */
    dropletIds: any;
    /**
     * An array containing the IDs of the load balancers to which the firewall will allow traffic.
     * @member {Array.<String>} loadBalancerUids
     */
    loadBalancerUids: any;
    /**
     * An array containing the IDs of the Kubernetes clusters to which the firewall will allow traffic.
     * @member {Array.<String>} kubernetesIds
     */
    kubernetesIds: any;
    /**
     * @member {Object} tags
     */
    tags: any;
}

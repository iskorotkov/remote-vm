/**
 * The LoadBalancer model module.
 * @module model/LoadBalancer
 * @version 2.0
 */
export class LoadBalancer extends LoadBalancerBase {
    /**
     * Constructs a new <code>LoadBalancer</code>.
     * @alias module:model/LoadBalancer
     * @class
     * @extends module:model/LoadBalancerBase
     * @param forwardingRules {} An array of objects specifying the forwarding rules for a load balancer.
     */
    constructor(forwardingRules: any);
    /**
     * @member {Object} region
     */
    region: any;
    /**
     * An array containing the IDs of the Droplets assigned to the load balancer.
     * @member {Array.<Number>} dropletIds
     */
    dropletIds: any;
    /**
     * The name of a Droplet tag corresponding to Droplets assigned to the load balancer.
     * @member {String} tag
     */
    tag: any;
}
import { LoadBalancerBase } from "./LoadBalancerBase";

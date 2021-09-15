/**
 * The LoadBalancerBase model module.
 * @module model/LoadBalancerBase
 * @version 2.0
 */
export class LoadBalancerBase {
    /**
     * Constructs a <code>LoadBalancerBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadBalancerBase} obj Optional instance to populate.
     * @return {module:model/LoadBalancerBase} The populated <code>LoadBalancerBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LoadBalancerBase</code>.
     * @alias module:model/LoadBalancerBase
     * @class
     * @param forwardingRules {Array.<module:model/ForwardingRule>} An array of objects specifying the forwarding rules for a load balancer.
     */
    constructor(forwardingRules: Array<NodeModule>);
    forwardingRules: NodeModule[];
    /**
     * A unique ID that can be used to identify and reference a load balancer.
     * @member {String} id
     */
    id: any;
    /**
     * A human-readable name for a load balancer instance.
     * @member {String} name
     */
    name: any;
    /**
     * An attribute containing the public-facing IP address of the load balancer.
     * @member {String} ip
     */
    ip: any;
    /**
     * The size of the load balancer. The available sizes are `lb-small`, `lb-medium`, or `lb-large`. You can resize load balancers after creation up to once per hour. You cannot resize a load balancer within the first hour of its creation.
     * @member {module:model/LoadBalancerBase.SizeEnum} size
     * @default 'lb-small'
     */
    size: string;
    /**
     * The load balancing algorithm used to determine which backend Droplet will be selected by a client. It must be either `round_robin` or `least_connections`.
     * @member {module:model/LoadBalancerBase.AlgorithmEnum} algorithm
     * @default 'round_robin'
     */
    algorithm: string;
    /**
     * A status string indicating the current state of the load balancer. This can be `new`, `active`, or `errored`.
     * @member {module:model/LoadBalancerBase.StatusEnum} status
     */
    status: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the load balancer was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * @member {module:model/HealthCheck} healthCheck
     */
    healthCheck: any;
    /**
     * @member {module:model/StickySessions} stickySessions
     */
    stickySessions: any;
    /**
     * A boolean value indicating whether HTTP requests to the load balancer on port 80 will be redirected to HTTPS on port 443.
     * @member {Boolean} redirectHttpToHttps
     * @default false
     */
    redirectHttpToHttps: boolean;
    /**
     * A boolean value indicating whether PROXY Protocol is in use.
     * @member {Boolean} enableProxyProtocol
     * @default false
     */
    enableProxyProtocol: boolean;
    /**
     * A boolean value indicating whether HTTP keepalive connections are maintained to target Droplets.
     * @member {Boolean} enableBackendKeepalive
     * @default false
     */
    enableBackendKeepalive: boolean;
    /**
     * A string specifying the UUID of the VPC to which the load balancer is assigned.
     * @member {String} vpcUuid
     */
    vpcUuid: any;
}
export namespace LoadBalancerBase {
    namespace SizeEnum {
        const small: string;
        const medium: string;
        const large: string;
    }
    /**
     * *
     */
    type SizeEnum = string;
    namespace AlgorithmEnum {
        const roundRobin: string;
        const leastConnections: string;
    }
    /**
     * *
     */
    type AlgorithmEnum = string;
    namespace StatusEnum {
        const _new: string;
        const active: string;
        const errored: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}

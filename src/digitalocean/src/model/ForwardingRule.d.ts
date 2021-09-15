/**
 * The ForwardingRule model module.
 * @module model/ForwardingRule
 * @version 2.0
 */
export class ForwardingRule {
    /**
     * Constructs a <code>ForwardingRule</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ForwardingRule} obj Optional instance to populate.
     * @return {module:model/ForwardingRule} The populated <code>ForwardingRule</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ForwardingRule</code>.
     * An object specifying a forwarding rule for a load balancer.
     * @alias module:model/ForwardingRule
     * @class
     * @param entryProtocol {module:model/ForwardingRule.EntryProtocolEnum} The protocol used for traffic to the load balancer. The possible values are: `http`, `https`, `http2`, or `tcp`.
     * @param entryPort {Number} An integer representing the port on which the load balancer instance will listen.
     * @param targetProtocol {module:model/ForwardingRule.TargetProtocolEnum} The protocol used for traffic from the load balancer to the backend Droplets. The possible values are: `http`, `https`, `http2`, or `tcp`.
     * @param targetPort {Number} An integer representing the port on the backend Droplets to which the load balancer will send traffic.
     */
    constructor(entryProtocol: any, entryPort: number, targetProtocol: any, targetPort: number);
    entryProtocol: any;
    entryPort: number;
    targetProtocol: any;
    targetPort: number;
    /**
     * The ID of the TLS certificate used for SSL termination if enabled.
     * @member {String} certificateId
     */
    certificateId: any;
    /**
     * A boolean value indicating whether SSL encrypted traffic will be passed through to the backend Droplets.
     * @member {Boolean} tlsPassthrough
     */
    tlsPassthrough: any;
}
export namespace ForwardingRule {
    namespace EntryProtocolEnum {
        const http: string;
        const https: string;
        const http2: string;
        const tcp: string;
    }
    /**
     * *
     */
    type EntryProtocolEnum = string;
    namespace TargetProtocolEnum {
        const http_1: string;
        export { http_1 as http };
        const https_1: string;
        export { https_1 as https };
        const http2_1: string;
        export { http2_1 as http2 };
        const tcp_1: string;
        export { tcp_1 as tcp };
    }
    /**
     * *
     */
    type TargetProtocolEnum = string;
}

/**
 * The FirewallRuleBase model module.
 * @module model/FirewallRuleBase
 * @version 2.0
 */
export class FirewallRuleBase {
    /**
     * Constructs a <code>FirewallRuleBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FirewallRuleBase} obj Optional instance to populate.
     * @return {module:model/FirewallRuleBase} The populated <code>FirewallRuleBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FirewallRuleBase</code>.
     * @alias module:model/FirewallRuleBase
     * @class
     * @param protocol {module:model/FirewallRuleBase.ProtocolEnum} The type of traffic to be allowed. This may be one of `tcp`, `udp`, or `icmp`.
     * @param ports {String} The ports on which traffic will be allowed specified as a string containing a single port, a range (e.g. \"8000-9000\"), or \"0\" when all ports are open for a protocol. For ICMP rules this parameter will always return \"0\".
     */
    constructor(protocol: any, ports: string);
    protocol: any;
    ports: string;
}
export namespace FirewallRuleBase {
    namespace ProtocolEnum {
        const tcp: string;
        const udp: string;
        const icmp: string;
    }
    /**
     * *
     */
    type ProtocolEnum = string;
}

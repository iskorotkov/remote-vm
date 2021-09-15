/**
 * The AllOffirewallRulesInboundRulesItems model module.
 * @module model/AllOffirewallRulesInboundRulesItems
 * @version 2.0
 */
export class AllOffirewallRulesInboundRulesItems extends FirewallRuleBase {
    /**
     * Constructs a new <code>AllOffirewallRulesInboundRulesItems</code>.
     * @alias module:model/AllOffirewallRulesInboundRulesItems
     * @class
     * @extends module:model/FirewallRuleBase
     * @param protocol {} The type of traffic to be allowed. This may be one of `tcp`, `udp`, or `icmp`.
     * @param ports {} The ports on which traffic will be allowed specified as a string containing a single port, a range (e.g. \"8000-9000\"), or \"0\" when all ports are open for a protocol. For ICMP rules this parameter will always return \"0\".
     * @param sources {}
     */
    constructor(protocol: any, ports: any, sources: any);
    sources: any;
}
import { FirewallRuleBase } from "./FirewallRuleBase";

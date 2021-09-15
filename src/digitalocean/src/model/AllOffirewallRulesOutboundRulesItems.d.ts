/**
 * The AllOffirewallRulesOutboundRulesItems model module.
 * @module model/AllOffirewallRulesOutboundRulesItems
 * @version 2.0
 */
export class AllOffirewallRulesOutboundRulesItems extends FirewallRuleBase {
    /**
     * Constructs a new <code>AllOffirewallRulesOutboundRulesItems</code>.
     * @alias module:model/AllOffirewallRulesOutboundRulesItems
     * @class
     * @extends module:model/FirewallRuleBase
     * @param protocol {} The type of traffic to be allowed. This may be one of `tcp`, `udp`, or `icmp`.
     * @param ports {} The ports on which traffic will be allowed specified as a string containing a single port, a range (e.g. \"8000-9000\"), or \"0\" when all ports are open for a protocol. For ICMP rules this parameter will always return \"0\".
     * @param destinations {}
     */
    constructor(protocol: any, ports: any, destinations: any);
    destinations: any;
}
import { FirewallRuleBase } from "./FirewallRuleBase";

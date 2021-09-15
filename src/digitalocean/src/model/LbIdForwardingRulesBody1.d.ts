/**
 * The LbIdForwardingRulesBody1 model module.
 * @module model/LbIdForwardingRulesBody1
 * @version 2.0
 */
export class LbIdForwardingRulesBody1 {
    /**
     * Constructs a <code>LbIdForwardingRulesBody1</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LbIdForwardingRulesBody1} obj Optional instance to populate.
     * @return {module:model/LbIdForwardingRulesBody1} The populated <code>LbIdForwardingRulesBody1</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LbIdForwardingRulesBody1</code>.
     * @alias module:model/LbIdForwardingRulesBody1
     * @class
     * @param forwardingRules {Array.<module:model/ForwardingRule>}
     */
    constructor(forwardingRules: Array<NodeModule>);
    forwardingRules: NodeModule[];
}

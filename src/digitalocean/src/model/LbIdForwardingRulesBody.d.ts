/**
 * The LbIdForwardingRulesBody model module.
 * @module model/LbIdForwardingRulesBody
 * @version 2.0
 */
export class LbIdForwardingRulesBody {
    /**
     * Constructs a <code>LbIdForwardingRulesBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LbIdForwardingRulesBody} obj Optional instance to populate.
     * @return {module:model/LbIdForwardingRulesBody} The populated <code>LbIdForwardingRulesBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>LbIdForwardingRulesBody</code>.
     * @alias module:model/LbIdForwardingRulesBody
     * @class
     * @param forwardingRules {Array.<module:model/ForwardingRule>}
     */
    constructor(forwardingRules: Array<NodeModule>);
    forwardingRules: NodeModule[];
}

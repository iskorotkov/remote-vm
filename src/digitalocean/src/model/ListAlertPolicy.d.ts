/**
 * The ListAlertPolicy model module.
 * @module model/ListAlertPolicy
 * @version 2.0
 */
export class ListAlertPolicy {
    /**
     * Constructs a <code>ListAlertPolicy</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListAlertPolicy} obj Optional instance to populate.
     * @return {module:model/ListAlertPolicy} The populated <code>ListAlertPolicy</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ListAlertPolicy</code>.
     * @alias module:model/ListAlertPolicy
     * @class
     * @param policies {Array.<module:model/AlertPolicy>}
     */
    constructor(policies: Array<NodeModule>);
    policies: NodeModule[];
}

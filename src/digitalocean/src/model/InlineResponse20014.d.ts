/**
 * The InlineResponse20014 model module.
 * @module model/InlineResponse20014
 * @version 2.0
 */
export class InlineResponse20014 {
    /**
     * Constructs a <code>InlineResponse20014</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20014} obj Optional instance to populate.
     * @return {module:model/InlineResponse20014} The populated <code>InlineResponse20014</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse20014</code>.
     * @alias module:model/InlineResponse20014
     * @class
     * @param backups {Array.<module:model/Backup>}
     */
    constructor(backups: Array<NodeModule>);
    backups: NodeModule[];
}

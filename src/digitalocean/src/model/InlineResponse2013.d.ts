/**
 * The InlineResponse2013 model module.
 * @module model/InlineResponse2013
 * @version 2.0
 */
export class InlineResponse2013 {
    /**
     * Constructs a <code>InlineResponse2013</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse2013} obj Optional instance to populate.
     * @return {module:model/InlineResponse2013} The populated <code>InlineResponse2013</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse2013</code>.
     * @alias module:model/InlineResponse2013
     * @class
     * @param database {module:model/DatabaseCluster}
     */
    constructor(database: any);
    database: any;
}

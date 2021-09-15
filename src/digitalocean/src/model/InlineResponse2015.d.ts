/**
 * The InlineResponse2015 model module.
 * @module model/InlineResponse2015
 * @version 2.0
 */
export class InlineResponse2015 {
    /**
     * Constructs a <code>InlineResponse2015</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse2015} obj Optional instance to populate.
     * @return {module:model/InlineResponse2015} The populated <code>InlineResponse2015</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse2015</code>.
     * @alias module:model/InlineResponse2015
     * @class
     * @param user {module:model/DatabaseUser}
     */
    constructor(user: any);
    user: any;
}

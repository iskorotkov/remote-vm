/**
 * The InlineResponse2006 model module.
 * @module model/InlineResponse2006
 * @version 2.0
 */
export class InlineResponse2006 {
    /**
     * Constructs a <code>InlineResponse2006</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse2006} obj Optional instance to populate.
     * @return {module:model/InlineResponse2006} The populated <code>InlineResponse2006</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse2006</code>.
     * @alias module:model/InlineResponse2006
     * @class
     * @param meta {}
     */
    constructor(meta: any);
    meta: any;
    /**
     * @member {module:model/PageLinks} links
     */
    links: any;
}

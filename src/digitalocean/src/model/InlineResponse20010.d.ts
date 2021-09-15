/**
 * The InlineResponse20010 model module.
 * @module model/InlineResponse20010
 * @version 2.0
 */
export class InlineResponse20010 {
    /**
     * Constructs a <code>InlineResponse20010</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20010} obj Optional instance to populate.
     * @return {module:model/InlineResponse20010} The populated <code>InlineResponse20010</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse20010</code>.
     * @alias module:model/InlineResponse20010
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

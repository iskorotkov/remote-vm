/**
 * The InlineResponse20033 model module.
 * @module model/InlineResponse20033
 * @version 2.0
 */
export class InlineResponse20033 {
    /**
     * Constructs a <code>InlineResponse20033</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20033} obj Optional instance to populate.
     * @return {module:model/InlineResponse20033} The populated <code>InlineResponse20033</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse20033</code>.
     * @alias module:model/InlineResponse20033
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

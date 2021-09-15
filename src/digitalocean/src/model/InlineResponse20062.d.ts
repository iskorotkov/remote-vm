/**
 * The InlineResponse20062 model module.
 * @module model/InlineResponse20062
 * @version 2.0
 */
export class InlineResponse20062 {
    /**
     * Constructs a <code>InlineResponse20062</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20062} obj Optional instance to populate.
     * @return {module:model/InlineResponse20062} The populated <code>InlineResponse20062</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse20062</code>.
     * @alias module:model/InlineResponse20062
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

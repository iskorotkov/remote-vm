/**
 * The InlineResponse20022 model module.
 * @module model/InlineResponse20022
 * @version 2.0
 */
export class InlineResponse20022 {
    /**
     * Constructs a <code>InlineResponse20022</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20022} obj Optional instance to populate.
     * @return {module:model/InlineResponse20022} The populated <code>InlineResponse20022</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>InlineResponse20022</code>.
     * @alias module:model/InlineResponse20022
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

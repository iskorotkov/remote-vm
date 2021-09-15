/**
 * The InlineResponse2022Links model module.
 * @module model/InlineResponse2022Links
 * @version 2.0
 */
export class InlineResponse2022Links {
    /**
     * Constructs a <code>InlineResponse2022Links</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse2022Links} obj Optional instance to populate.
     * @return {module:model/InlineResponse2022Links} The populated <code>InlineResponse2022Links</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/ActionLink>} droplets
     */
    droplets: any;
    /**
     * @member {Array.<module:model/ActionLink>} actions
     */
    actions: any;
}

/**
 * The InlineResponse2022 model module.
 * @module model/InlineResponse2022
 * @version 2.0
 */
export class InlineResponse2022 {
    /**
     * Constructs a <code>InlineResponse2022</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse2022} obj Optional instance to populate.
     * @return {module:model/InlineResponse2022} The populated <code>InlineResponse2022</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/FloatingIp} floatingIp
     */
    floatingIp: any;
    /**
     * @member {module:model/InlineResponse2022Links} links
     */
    links: any;
}

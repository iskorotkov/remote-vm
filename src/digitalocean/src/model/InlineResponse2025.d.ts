/**
 * The InlineResponse2025 model module.
 * @module model/InlineResponse2025
 * @version 2.0
 */
export class InlineResponse2025 {
    /**
     * Constructs a <code>InlineResponse2025</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse2025} obj Optional instance to populate.
     * @return {module:model/InlineResponse2025} The populated <code>InlineResponse2025</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * ID of the clusterlint run that can be used later to fetch the diagnostics.
     * @member {String} runId
     */
    runId: any;
}

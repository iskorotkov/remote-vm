/**
 * The InlineResponse20036 model module.
 * @module model/InlineResponse20036
 * @version 2.0
 */
export class InlineResponse20036 {
    /**
     * Constructs a <code>InlineResponse20036</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20036} obj Optional instance to populate.
     * @return {module:model/InlineResponse20036} The populated <code>InlineResponse20036</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/KubernetesVersion>} availableUpgradeVersions
     */
    availableUpgradeVersions: any;
}

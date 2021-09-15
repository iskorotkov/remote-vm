/**
 * The InlineResponse20037 model module.
 * @module model/InlineResponse20037
 * @version 2.0
 */
export class InlineResponse20037 {
    /**
     * Constructs a <code>InlineResponse20037</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InlineResponse20037} obj Optional instance to populate.
     * @return {module:model/InlineResponse20037} The populated <code>InlineResponse20037</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/KubernetesNodePool>} nodePools
     */
    nodePools: any;
}

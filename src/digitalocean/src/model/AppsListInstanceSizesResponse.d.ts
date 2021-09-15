/**
 * The AppsListInstanceSizesResponse model module.
 * @module model/AppsListInstanceSizesResponse
 * @version 2.0
 */
export class AppsListInstanceSizesResponse {
    /**
     * Constructs a <code>AppsListInstanceSizesResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsListInstanceSizesResponse} obj Optional instance to populate.
     * @return {module:model/AppsListInstanceSizesResponse} The populated <code>AppsListInstanceSizesResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Number} discountPercent
     */
    discountPercent: any;
    /**
     * @member {Array.<module:model/AppsInstanceSize>} instanceSizes
     */
    instanceSizes: any;
}

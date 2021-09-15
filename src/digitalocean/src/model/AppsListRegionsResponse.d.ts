/**
 * The AppsListRegionsResponse model module.
 * @module model/AppsListRegionsResponse
 * @version 2.0
 */
export class AppsListRegionsResponse {
    /**
     * Constructs a <code>AppsListRegionsResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsListRegionsResponse} obj Optional instance to populate.
     * @return {module:model/AppsListRegionsResponse} The populated <code>AppsListRegionsResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/AppsRegion>} regions
     */
    regions: any;
}

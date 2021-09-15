/**
 * The AppsListTiersResponse model module.
 * @module model/AppsListTiersResponse
 * @version 2.0
 */
export class AppsListTiersResponse {
    /**
     * Constructs a <code>AppsListTiersResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsListTiersResponse} obj Optional instance to populate.
     * @return {module:model/AppsListTiersResponse} The populated <code>AppsListTiersResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/AppsTier>} tiers
     */
    tiers: any;
}

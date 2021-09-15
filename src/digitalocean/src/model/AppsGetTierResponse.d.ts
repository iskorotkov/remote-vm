/**
 * The AppsGetTierResponse model module.
 * @module model/AppsGetTierResponse
 * @version 2.0
 */
export class AppsGetTierResponse {
    /**
     * Constructs a <code>AppsGetTierResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsGetTierResponse} obj Optional instance to populate.
     * @return {module:model/AppsGetTierResponse} The populated <code>AppsGetTierResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/AppsTier} tier
     */
    tier: any;
}

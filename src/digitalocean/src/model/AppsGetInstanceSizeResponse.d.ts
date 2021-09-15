/**
 * The AppsGetInstanceSizeResponse model module.
 * @module model/AppsGetInstanceSizeResponse
 * @version 2.0
 */
export class AppsGetInstanceSizeResponse {
    /**
     * Constructs a <code>AppsGetInstanceSizeResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsGetInstanceSizeResponse} obj Optional instance to populate.
     * @return {module:model/AppsGetInstanceSizeResponse} The populated <code>AppsGetInstanceSizeResponse</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {module:model/AppsInstanceSize} instanceSize
     */
    instanceSize: any;
}

/**
 * The AppsCreateAppRequest model module.
 * @module model/AppsCreateAppRequest
 * @version 2.0
 */
export class AppsCreateAppRequest {
    /**
     * Constructs a <code>AppsCreateAppRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsCreateAppRequest} obj Optional instance to populate.
     * @return {module:model/AppsCreateAppRequest} The populated <code>AppsCreateAppRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppsCreateAppRequest</code>.
     * @alias module:model/AppsCreateAppRequest
     * @class
     * @param spec {module:model/AppSpec}
     */
    constructor(spec: any);
    spec: any;
}

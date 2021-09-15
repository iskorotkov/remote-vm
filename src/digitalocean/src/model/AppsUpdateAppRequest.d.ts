/**
 * The AppsUpdateAppRequest model module.
 * @module model/AppsUpdateAppRequest
 * @version 2.0
 */
export class AppsUpdateAppRequest {
    /**
     * Constructs a <code>AppsUpdateAppRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsUpdateAppRequest} obj Optional instance to populate.
     * @return {module:model/AppsUpdateAppRequest} The populated <code>AppsUpdateAppRequest</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppsUpdateAppRequest</code>.
     * @alias module:model/AppsUpdateAppRequest
     * @class
     * @param spec {module:model/AppSpec}
     */
    constructor(spec: any);
    spec: any;
}

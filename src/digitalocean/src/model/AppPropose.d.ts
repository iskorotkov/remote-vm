/**
 * The AppPropose model module.
 * @module model/AppPropose
 * @version 2.0
 */
export class AppPropose {
    /**
     * Constructs a <code>AppPropose</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppPropose} obj Optional instance to populate.
     * @return {module:model/AppPropose} The populated <code>AppPropose</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppPropose</code>.
     * @alias module:model/AppPropose
     * @class
     * @param spec {module:model/AppSpec}
     */
    constructor(spec: any);
    spec: any;
    /**
     * An optional ID of an existing app. If set, the spec will be treated as a proposed update to the specified app. The existing app is not modified using this method.
     * @member {String} appId
     */
    appId: any;
}

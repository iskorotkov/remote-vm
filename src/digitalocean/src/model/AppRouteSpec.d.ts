/**
 * The AppRouteSpec model module.
 * @module model/AppRouteSpec
 * @version 2.0
 */
export class AppRouteSpec {
    /**
     * Constructs a <code>AppRouteSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppRouteSpec} obj Optional instance to populate.
     * @return {module:model/AppRouteSpec} The populated <code>AppRouteSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An HTTP path prefix. Paths must start with / and must be unique across all components within an app.
     * @member {String} path
     */
    path: any;
}

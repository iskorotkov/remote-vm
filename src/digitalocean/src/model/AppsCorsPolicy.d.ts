/**
 * The AppsCorsPolicy model module.
 * @module model/AppsCorsPolicy
 * @version 2.0
 */
export class AppsCorsPolicy {
    /**
     * Constructs a <code>AppsCorsPolicy</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsCorsPolicy} obj Optional instance to populate.
     * @return {module:model/AppsCorsPolicy} The populated <code>AppsCorsPolicy</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The set of allowed CORS origins.
     * @member {Array.<module:model/AppsStringMatch>} allowOrigins
     */
    allowOrigins: any;
    /**
     * The set of allowed HTTP methods. This configures the `Access-Control-Allow-Methods` header.
     * @member {Array.<String>} allowMethods
     */
    allowMethods: any;
    /**
     * The set of allowed HTTP request headers. This configures the `Access-Control-Allow-Headers` header.
     * @member {Array.<String>} allowHeaders
     */
    allowHeaders: any;
    /**
     * The set of HTTP response headers that browsers are allowed to access. This configures the `Access-Control-Expose-Headers` header.
     * @member {Array.<String>} exposeHeaders
     */
    exposeHeaders: any;
    /**
     * An optional duration specifying how long browsers can cache the results of a preflight request. This configures the `Access-Control-Max-Age` header.
     * @member {String} maxAge
     */
    maxAge: any;
    /**
     * Whether browsers should expose the response to the client-side JavaScript code when the request’s credentials mode is include. This configures the `Access-Control-Allow-Credentials` header.
     * @member {Boolean} allowCredentials
     */
    allowCredentials: any;
}

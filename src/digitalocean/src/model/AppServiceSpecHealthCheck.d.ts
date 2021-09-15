/**
 * The AppServiceSpecHealthCheck model module.
 * @module model/AppServiceSpecHealthCheck
 * @version 2.0
 */
export class AppServiceSpecHealthCheck {
    /**
     * Constructs a <code>AppServiceSpecHealthCheck</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppServiceSpecHealthCheck} obj Optional instance to populate.
     * @return {module:model/AppServiceSpecHealthCheck} The populated <code>AppServiceSpecHealthCheck</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The number of failed health checks before considered unhealthy.
     * @member {Number} failureThreshold
     */
    failureThreshold: any;
    /**
     * The route path used for the HTTP health check ping. If not set, the HTTP health check will be disabled and a TCP health check used instead.
     * @member {String} httpPath
     */
    httpPath: any;
    /**
     * The number of seconds to wait before beginning health checks.
     * @member {Number} initialDelaySeconds
     */
    initialDelaySeconds: any;
    /**
     * The number of seconds to wait between health checks.
     * @member {Number} periodSeconds
     */
    periodSeconds: any;
    /**
     * The number of successful health checks before considered healthy.
     * @member {Number} successThreshold
     */
    successThreshold: any;
    /**
     * The number of seconds after which the check times out.
     * @member {Number} timeoutSeconds
     */
    timeoutSeconds: any;
}

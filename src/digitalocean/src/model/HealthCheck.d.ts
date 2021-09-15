/**
 * The HealthCheck model module.
 * @module model/HealthCheck
 * @version 2.0
 */
export class HealthCheck {
    /**
     * Constructs a <code>HealthCheck</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/HealthCheck} obj Optional instance to populate.
     * @return {module:model/HealthCheck} The populated <code>HealthCheck</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The protocol used for health checks sent to the backend Droplets. The possible values are `http`, `https`, or `tcp`.
     * @member {module:model/HealthCheck.ProtocolEnum} protocol
     * @default 'http'
     */
    protocol: string;
    /**
     * An integer representing the port on the backend Droplets on which the health check will attempt a connection.
     * @member {Number} port
     * @default 80
     */
    port: number;
    /**
     * The path on the backend Droplets to which the load balancer instance will send a request.
     * @member {String} path
     * @default '/'
     */
    path: string;
    /**
     * The number of seconds between between two consecutive health checks.
     * @member {Number} checkIntervalSeconds
     * @default 10
     */
    checkIntervalSeconds: number;
    /**
     * The number of seconds the load balancer instance will wait for a response until marking a health check as failed.
     * @member {Number} responseTimeoutSeconds
     * @default 5
     */
    responseTimeoutSeconds: number;
    /**
     * The number of times a health check must fail for a backend Droplet to be marked \"unhealthy\" and be removed from the pool.
     * @member {Number} unhealthyThreshold
     * @default 5
     */
    unhealthyThreshold: number;
    /**
     * The number of times a health check must pass for a backend Droplet to be marked \"healthy\" and be re-added to the pool.
     * @member {Number} healthyThreshold
     * @default 3
     */
    healthyThreshold: number;
}
export namespace HealthCheck {
    namespace ProtocolEnum {
        const http: string;
        const https: string;
        const tcp: string;
    }
    /**
     * *
     */
    type ProtocolEnum = string;
}

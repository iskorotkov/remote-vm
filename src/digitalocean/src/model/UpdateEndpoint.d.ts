/**
 * The UpdateEndpoint model module.
 * @module model/UpdateEndpoint
 * @version 2.0
 */
export class UpdateEndpoint {
    /**
     * Constructs a <code>UpdateEndpoint</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateEndpoint} obj Optional instance to populate.
     * @return {module:model/UpdateEndpoint} The populated <code>UpdateEndpoint</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The amount of time the content is cached by the CDN's edge servers in seconds. TTL must be one of 60, 600, 3600, 86400, or 604800. Defaults to 3600 (one hour) when excluded.
     * @member {module:model/UpdateEndpoint.TtlEnum} ttl
     * @default TtlEnum._3600
     */
    ttl: any;
    /**
     * The ID of a DigitalOcean managed TLS certificate used for SSL when a custom subdomain is provided.
     * @member {String} certificateId
     */
    certificateId: any;
    /**
     * The fully qualified domain name (FQDN) of the custom subdomain used with the CDN endpoint.
     * @member {String} customDomain
     */
    customDomain: any;
}
export namespace UpdateEndpoint {
    namespace TtlEnum {
        const _60: number;
        const _600: number;
        const _3600: number;
        const _86400: number;
        const _604800: number;
    }
    /**
     * *
     */
    type TtlEnum = number;
}

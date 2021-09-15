/**
 * The CdnEndpoint model module.
 * @module model/CdnEndpoint
 * @version 2.0
 */
export class CdnEndpoint {
    /**
     * Constructs a <code>CdnEndpoint</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CdnEndpoint} obj Optional instance to populate.
     * @return {module:model/CdnEndpoint} The populated <code>CdnEndpoint</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>CdnEndpoint</code>.
     * @alias module:model/CdnEndpoint
     * @class
     * @param origin {String} The fully qualified domain name (FQDN) for the origin server which provides the content for the CDN. This is currently restricted to a Space.
     */
    constructor(origin: string);
    origin: string;
    /**
     * A unique ID that can be used to identify and reference a CDN endpoint.
     * @member {String} id
     */
    id: any;
    /**
     * The fully qualified domain name (FQDN) from which the CDN-backed content is served.
     * @member {String} endpoint
     */
    endpoint: any;
    /**
     * The amount of time the content is cached by the CDN's edge servers in seconds. TTL must be one of 60, 600, 3600, 86400, or 604800. Defaults to 3600 (one hour) when excluded.
     * @member {module:model/CdnEndpoint.TtlEnum} ttl
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
    /**
     * A time value given in ISO8601 combined date and time format that represents when the CDN endpoint was created.
     * @member {Date} createdAt
     */
    createdAt: any;
}
export namespace CdnEndpoint {
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

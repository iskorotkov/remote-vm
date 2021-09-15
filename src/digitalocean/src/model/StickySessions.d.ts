/**
 * The StickySessions model module.
 * @module model/StickySessions
 * @version 2.0
 */
export class StickySessions {
    /**
     * Constructs a <code>StickySessions</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StickySessions} obj Optional instance to populate.
     * @return {module:model/StickySessions} The populated <code>StickySessions</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * An attribute indicating how and if requests from a client will be persistently served by the same backend Droplet. The possible values are `cookies` or `none`.
     * @member {module:model/StickySessions.TypeEnum} type
     * @default 'none'
     */
    type: string;
    /**
     * The name of the cookie sent to the client. This attribute is only returned when using `cookies` for the sticky sessions type.
     * @member {String} cookieName
     */
    cookieName: any;
    /**
     * The number of seconds until the cookie set by the load balancer expires. This attribute is only returned when using `cookies` for the sticky sessions type.
     * @member {Number} cookieTtlSeconds
     */
    cookieTtlSeconds: any;
}
export namespace StickySessions {
    namespace TypeEnum {
        const cookies: string;
        const none: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

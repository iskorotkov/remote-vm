/**
 * The AppDomainSpec model module.
 * @module model/AppDomainSpec
 * @version 2.0
 */
export class AppDomainSpec {
    /**
     * Constructs a <code>AppDomainSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppDomainSpec} obj Optional instance to populate.
     * @return {module:model/AppDomainSpec} The populated <code>AppDomainSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppDomainSpec</code>.
     * @alias module:model/AppDomainSpec
     * @class
     * @param domain {String} The hostname for the domain
     */
    constructor(domain: string);
    domain: string;
    /**
     * - DEFAULT: The default `.ondigitalocean.app` domain assigned to this app - PRIMARY: The primary domain for this app that is displayed as the default in the control panel, used in bindable environment variables, and any other places that reference an app's live URL. Only one domain may be set as primary. - ALIAS: A non-primary domain
     * @member {module:model/AppDomainSpec.TypeEnum} type
     * @default 'UNSPECIFIED'
     */
    type: string;
    /**
     * Indicates whether the domain includes all sub-domains, in addition to the given domain
     * @member {Boolean} wildcard
     */
    wildcard: any;
    /**
     * Optional. If the domain uses DigitalOcean DNS and you would like App Platform to automatically manage it for you, set this to the name of the domain on your account.  For example, If the domain you are adding is `app.domain.com`, the zone could be `domain.com`.
     * @member {String} zone
     */
    zone: any;
}
export namespace AppDomainSpec {
    namespace TypeEnum {
        const UNSPECIFIED: string;
        const DEFAULT: string;
        const PRIMARY: string;
        const ALIAS: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

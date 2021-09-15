/**
 * The Domain model module.
 * @module model/Domain
 * @version 2.0
 */
export class Domain {
    /**
     * Constructs a <code>Domain</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Domain} obj Optional instance to populate.
     * @return {module:model/Domain} The populated <code>Domain</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The name of the domain itself. This should follow the standard domain format of domain.TLD. For instance, `example.com` is a valid domain name.
     * @member {String} name
     */
    name: any;
    /**
     * This optional attribute may contain an IP address. When provided, an A record will be automatically created pointing to the apex domain.
     * @member {String} ipAddress
     */
    ipAddress: any;
    /**
     * This value is the time to live for the records on this domain, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.
     * @member {Number} ttl
     */
    ttl: any;
    /**
     * This attribute contains the complete contents of the zone file for the selected domain. Individual domain record resources should be used to get more granular control over records. However, this attribute can also be used to get information about the SOA record, which is created automatically and is not accessible as an individual record resource.
     * @member {String} zoneFile
     */
    zoneFile: any;
}

/**
 * The DomainRecord model module.
 * @module model/DomainRecord
 * @version 2.0
 */
export class DomainRecord {
    /**
     * Constructs a <code>DomainRecord</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DomainRecord} obj Optional instance to populate.
     * @return {module:model/DomainRecord} The populated <code>DomainRecord</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DomainRecord</code>.
     * @alias module:model/DomainRecord
     * @class
     * @param type {String} The type of the DNS record. For example: A, CNAME, TXT, ...
     */
    constructor(type: string);
    type: string;
    /**
     * A unique identifier for each domain record.
     * @member {Number} id
     */
    id: any;
    /**
     * The host name, alias, or service being defined by the record.
     * @member {String} name
     */
    name: any;
    /**
     * Variable data depending on record type. For example, the \"data\" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.
     * @member {String} data
     */
    data: any;
    /**
     * The priority for SRV and MX records.
     * @member {Number} priority
     */
    priority: any;
    /**
     * The port for SRV records.
     * @member {Number} port
     */
    port: any;
    /**
     * This value is the time to live for the record, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.
     * @member {Number} ttl
     */
    ttl: any;
    /**
     * The weight for SRV records.
     * @member {Number} weight
     */
    weight: any;
    /**
     * An unsigned integer between 0-255 used for CAA records.
     * @member {Number} flags
     */
    flags: any;
    /**
     * The parameter tag for CAA records. Valid values are \"issue\", \"issuewild\", or \"iodef\"
     * @member {String} tag
     */
    tag: any;
}

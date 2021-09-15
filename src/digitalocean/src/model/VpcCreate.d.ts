/**
 * The VpcCreate model module.
 * @module model/VpcCreate
 * @version 2.0
 */
export class VpcCreate {
    /**
     * Constructs a <code>VpcCreate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VpcCreate} obj Optional instance to populate.
     * @return {module:model/VpcCreate} The populated <code>VpcCreate</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The slug identifier for the region where the VPC will be created.
     * @member {String} region
     */
    region: any;
    /**
     * The range of IP addresses in the VPC in CIDR notation. Network ranges cannot overlap with other networks in the same account and must be in range of private addresses as defined in RFC1918. It may not be smaller than `/24` nor larger than `/16`. If no IP range is specified, a `/20` network range is generated that won't conflict with other VPC networks in your account.
     * @member {String} ipRange
     */
    ipRange: any;
}

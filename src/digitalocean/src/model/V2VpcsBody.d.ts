/**
 * The V2VpcsBody model module.
 * @module model/V2VpcsBody
 * @version 2.0
 */
export class V2VpcsBody extends VpcUpdatable {
    /**
     * Constructs a new <code>V2VpcsBody</code>.
     * @alias module:model/V2VpcsBody
     * @class
     * @extends module:model/VpcUpdatable
     * @param region {} The slug identifier for the region where the VPC will be created.
     * @param name {} The name of the VPC. Must be unique and may only contain alphanumeric characters, dashes, and periods.
     */
    constructor(region: any, name: any);
    region: any;
    /**
     * The range of IP addresses in the VPC in CIDR notation. Network ranges cannot overlap with other networks in the same account and must be in range of private addresses as defined in RFC1918. It may not be smaller than `/24` nor larger than `/16`. If no IP range is specified, a `/20` network range is generated that won't conflict with other VPC networks in your account.
     * @member {String} ipRange
     */
    ipRange: any;
}
import { VpcUpdatable } from "./VpcUpdatable";

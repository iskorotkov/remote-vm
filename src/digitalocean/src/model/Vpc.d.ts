/**
 * The Vpc model module.
 * @module model/Vpc
 * @version 2.0
 */
export class Vpc extends VpcUpdatable {
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
    /**
     * A boolean value indicating whether or not the VPC is the default network for the region. All applicable resources are placed into the default VPC network unless otherwise specified during their creation. The `default` field cannot be unset from `true`. If you want to set a new default VPC network, update the `default` field of another VPC network in the same region. The previous network's `default` field will be set to `false` when a new default VPC has been defined.
     * @member {Boolean} _default
     */
    _default: any;
    /**
     * A unique ID that can be used to identify and reference the VPC.
     * @member {String} id
     */
    id: any;
    /**
     * @member {module:model/Urn} urn
     */
    urn: any;
    /**
     * A time value given in ISO8601 combined date and time format.
     * @member {Date} createdAt
     */
    createdAt: any;
}
import { VpcUpdatable } from "./VpcUpdatable";

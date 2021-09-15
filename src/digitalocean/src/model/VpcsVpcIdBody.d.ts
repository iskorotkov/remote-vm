/**
 * The VpcsVpcIdBody model module.
 * @module model/VpcsVpcIdBody
 * @version 2.0
 */
export class VpcsVpcIdBody extends VpcUpdatable {
    /**
     * Constructs a new <code>VpcsVpcIdBody</code>.
     * @alias module:model/VpcsVpcIdBody
     * @class
     * @extends module:model/VpcUpdatable
     * @param name {} The name of the VPC. Must be unique and may only contain alphanumeric characters, dashes, and periods.
     */
    constructor(name: any);
    /**
     * A boolean value indicating whether or not the VPC is the default network for the region. All applicable resources are placed into the default VPC network unless otherwise specified during their creation. The `default` field cannot be unset from `true`. If you want to set a new default VPC network, update the `default` field of another VPC network in the same region. The previous network's `default` field will be set to `false` when a new default VPC has been defined.
     * @member {Boolean} _default
     */
    _default: any;
}
import { VpcUpdatable } from "./VpcUpdatable";

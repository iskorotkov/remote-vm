/**
 * The VpcsVpcIdBody1 model module.
 * @module model/VpcsVpcIdBody1
 * @version 2.0
 */
export class VpcsVpcIdBody1 extends VpcUpdatable {
    /**
     * A boolean value indicating whether or not the VPC is the default network for the region. All applicable resources are placed into the default VPC network unless otherwise specified during their creation. The `default` field cannot be unset from `true`. If you want to set a new default VPC network, update the `default` field of another VPC network in the same region. The previous network's `default` field will be set to `false` when a new default VPC has been defined.
     * @member {Boolean} _default
     */
    _default: any;
}
import { VpcUpdatable } from "./VpcUpdatable";

/**
 * The VpcDefault model module.
 * @module model/VpcDefault
 * @version 2.0
 */
export class VpcDefault {
    /**
     * Constructs a <code>VpcDefault</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VpcDefault} obj Optional instance to populate.
     * @return {module:model/VpcDefault} The populated <code>VpcDefault</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A boolean value indicating whether or not the VPC is the default network for the region. All applicable resources are placed into the default VPC network unless otherwise specified during their creation. The `default` field cannot be unset from `true`. If you want to set a new default VPC network, update the `default` field of another VPC network in the same region. The previous network's `default` field will be set to `false` when a new default VPC has been defined.
     * @member {Boolean} _default
     */
    _default: any;
}

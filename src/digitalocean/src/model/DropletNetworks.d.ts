/**
 * The DropletNetworks model module.
 * @module model/DropletNetworks
 * @version 2.0
 */
export class DropletNetworks {
    /**
     * Constructs a <code>DropletNetworks</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DropletNetworks} obj Optional instance to populate.
     * @return {module:model/DropletNetworks} The populated <code>DropletNetworks</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {Array.<module:model/NetworkV4>} v4
     */
    v4: any;
    /**
     * @member {Array.<module:model/NetworkV6>} v6
     */
    v6: any;
}

/**
 * The AppsTier model module.
 * @module model/AppsTier
 * @version 2.0
 */
export class AppsTier {
    /**
     * Constructs a <code>AppsTier</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppsTier} obj Optional instance to populate.
     * @return {module:model/AppsTier} The populated <code>AppsTier</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * @member {String} buildSeconds
     */
    buildSeconds: any;
    /**
     * @member {String} egressBandwidthBytes
     */
    egressBandwidthBytes: any;
    /**
     * @member {String} name
     */
    name: any;
    /**
     * @member {String} slug
     */
    slug: any;
    /**
     * @member {String} storageBytes
     */
    storageBytes: any;
}

/**
 * The FloatingIp model module.
 * @module model/FloatingIp
 * @version 2.0
 */
export class FloatingIp {
    /**
     * Constructs a <code>FloatingIp</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FloatingIp} obj Optional instance to populate.
     * @return {module:model/FloatingIp} The populated <code>FloatingIp</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The public IP address of the floating IP. It also serves as its identifier.
     * @member {String} ip
     */
    ip: any;
    /**
     * @member {Object} region
     */
    region: any;
    /**
     * The Droplet that the floating IP has been assigned to. When you query a floating IP, if it is assigned to a Droplet, the entire Droplet object will be returned. If it is not assigned, the value will be null.
     * @member {Object} droplet
     */
    droplet: any;
    /**
     * A boolean value indicating whether or not the floating IP has pending actions preventing new ones from being submitted.
     * @member {Boolean} locked
     */
    locked: any;
}

/**
 * The NetworkV6 model module.
 * @module model/NetworkV6
 * @version 2.0
 */
export class NetworkV6 {
    /**
     * Constructs a <code>NetworkV6</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NetworkV6} obj Optional instance to populate.
     * @return {module:model/NetworkV6} The populated <code>NetworkV6</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The IP address of the IPv6 network interface.
     * @member {String} ipAddress
     */
    ipAddress: any;
    /**
     * The netmask of the IPv6 network interface.
     * @member {Number} netmask
     */
    netmask: any;
    /**
     * The gateway of the specified IPv6 network interface.
     * @member {String} gateway
     */
    gateway: any;
    /**
     * The type of the IPv6 network interface.  **Note**: IPv6 private  networking is not currently supported.
     * @member {module:model/NetworkV6.TypeEnum} type
     */
    type: any;
}
export namespace NetworkV6 {
    namespace TypeEnum {
        const _public: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

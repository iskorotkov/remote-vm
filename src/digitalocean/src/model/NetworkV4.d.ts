/**
 * The NetworkV4 model module.
 * @module model/NetworkV4
 * @version 2.0
 */
export class NetworkV4 {
    /**
     * Constructs a <code>NetworkV4</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NetworkV4} obj Optional instance to populate.
     * @return {module:model/NetworkV4} The populated <code>NetworkV4</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The IP address of the IPv4 network interface.
     * @member {String} ipAddress
     */
    ipAddress: any;
    /**
     * The netmask of the IPv4 network interface.
     * @member {String} netmask
     */
    netmask: any;
    /**
     * The gateway of the specified IPv4 network interface.  For private interfaces, a gateway is not provided. This is denoted by returning `nil` as its value.
     * @member {String} gateway
     */
    gateway: any;
    /**
     * The type of the IPv4 network interface.
     * @member {module:model/NetworkV4.TypeEnum} type
     */
    type: any;
}
export namespace NetworkV4 {
    namespace TypeEnum {
        const _public: string;
        const _private: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

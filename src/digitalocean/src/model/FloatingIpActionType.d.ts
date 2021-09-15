/**
 * The FloatingIpActionType model module.
 * @module model/FloatingIpActionType
 * @version 2.0
 */
export class FloatingIpActionType {
    /**
     * Constructs a <code>FloatingIpActionType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FloatingIpActionType} obj Optional instance to populate.
     * @return {module:model/FloatingIpActionType} The populated <code>FloatingIpActionType</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>FloatingIpActionType</code>.
     * @alias module:model/FloatingIpActionType
     * @class
     * @param type {module:model/FloatingIpActionType.TypeEnum} The type of action to initiate for the floating IP.
     */
    constructor(type: any);
    type: any;
}
export namespace FloatingIpActionType {
    namespace TypeEnum {
        const assign: string;
        const unassign: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

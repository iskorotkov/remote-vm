/**
 * The DropletActionType model module.
 * @module model/DropletActionType
 * @version 2.0
 */
export class DropletActionType {
    /**
     * Constructs a <code>DropletActionType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DropletActionType} obj Optional instance to populate.
     * @return {module:model/DropletActionType} The populated <code>DropletActionType</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DropletActionType</code>.
     * Specifies the action that will be taken on the Droplet.
     * @alias module:model/DropletActionType
     * @class
     * @param type {module:model/DropletActionType.TypeEnum} The type of action to initiate for the Droplet.
     */
    constructor(type: any);
    type: any;
}
export namespace DropletActionType {
    namespace TypeEnum {
        const enableBackups: string;
        const disableBackups: string;
        const reboot: string;
        const powerCycle: string;
        const shutdown: string;
        const powerOff: string;
        const powerOn: string;
        const restore: string;
        const passwordReset: string;
        const resize: string;
        const rebuild: string;
        const rename: string;
        const changeKernel: string;
        const enableIpv6: string;
        const snapshot: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

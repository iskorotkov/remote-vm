/**
 * The FloatingIpActionAssign model module.
 * @module model/FloatingIpActionAssign
 * @version 2.0
 */
export class FloatingIpActionAssign extends FloatingIpActionType {
    /**
     * Constructs a new <code>FloatingIpActionAssign</code>.
     * @alias module:model/FloatingIpActionAssign
     * @class
     * @extends module:model/FloatingIpActionType
     * @param type {} The type of action to initiate for the floating IP.
     * @param dropletId {} The ID of the Droplet that the floating IP will be assigned to.
     */
    constructor(type: any, dropletId: any);
    dropletId: any;
}
import { FloatingIpActionType } from "./FloatingIpActionType";

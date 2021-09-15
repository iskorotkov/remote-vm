/**
 * The DropletActionResize model module.
 * @module model/DropletActionResize
 * @version 2.0
 */
export class DropletActionResize extends DropletActionType {
    /**
     * When `true`, the Droplet's disk will be resized in addition to its RAM and CPU. This is a permanent change and cannot be reversed as a Droplet's disk size cannot be decreased.
     * @member {Boolean} disk
     */
    disk: any;
    /**
     * The slug identifier for the size to which you wish to resize the Droplet.
     * @member {String} size
     */
    size: any;
}
import { DropletActionType } from "./DropletActionType";

/**
 * The VolumeActionPostResize model module.
 * @module model/VolumeActionPostResize
 * @version 2.0
 */
export class VolumeActionPostResize extends VolumeActionPostBase {
    /**
     * Constructs a new <code>VolumeActionPostResize</code>.
     * @alias module:model/VolumeActionPostResize
     * @class
     * @extends module:model/VolumeActionPostBase
     * @param type {} The volume action to initiate.
     * @param sizeGigabytes {} The new size of the block storage volume in GiB (1024^3).
     */
    constructor(type: any, sizeGigabytes: any);
    sizeGigabytes: any;
}
import { VolumeActionPostBase } from "./VolumeActionPostBase";

/**
 * The VolumeFull model module.
 * @module model/VolumeFull
 * @version 2.0
 */
export class VolumeFull extends VolumeBase {
    /**
     * @member {Object} region
     */
    region: any;
    /**
     * The type of filesystem currently in-use on the volume.
     * @member {String} filesystemType
     */
    filesystemType: any;
    /**
     * The label currently applied to the filesystem.
     * @member {String} filesystemLabel
     */
    filesystemLabel: any;
}
import { VolumeBase } from "./VolumeBase";

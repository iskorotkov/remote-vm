/**
 * The NewVolumeXfs model module.
 * @module model/NewVolumeXfs
 * @version 2.0
 */
export class NewVolumeXfs extends VolumeBase {
    /**
     * Constructs a new <code>NewVolumeXfs</code>.
     * @alias module:model/NewVolumeXfs
     * @class
     * @extends module:model/VolumeBase
     * @param filesystemType {} The name of the filesystem type to be used on the volume. When provided, the volume will automatically be formatted to the specified filesystem type. Currently, the available options are `ext4` and `xfs`. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to other Droplets is not recommended.
     * @param name {} A human-readable name for the block storage volume. Must be lowercase and be composed only of numbers, letters and \"-\", up to a limit of 64 characters. The name must begin with a letter.
     * @param sizeGigabytes {} The size of the block storage volume in GiB (1024^3).
     * @param region {}
     */
    constructor(filesystemType: any, name: any, sizeGigabytes: any, region: any);
    filesystemType: any;
    region: any;
    /**
     * The unique identifier for the volume snapshot from which to create the volume.
     * @member {String} snapshotId
     */
    snapshotId: any;
    /**
     * @member {Object} filesystemLabel
     */
    filesystemLabel: any;
}
import { VolumeBase } from "./VolumeBase";

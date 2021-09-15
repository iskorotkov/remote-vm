/**
 * The VolumeWriteFileSystemType model module.
 * @module model/VolumeWriteFileSystemType
 * @version 2.0
 */
export class VolumeWriteFileSystemType {
    /**
     * Constructs a <code>VolumeWriteFileSystemType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VolumeWriteFileSystemType} obj Optional instance to populate.
     * @return {module:model/VolumeWriteFileSystemType} The populated <code>VolumeWriteFileSystemType</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>VolumeWriteFileSystemType</code>.
     * @alias module:model/VolumeWriteFileSystemType
     * @class
     * @param filesystemType {String} The name of the filesystem type to be used on the volume. When provided, the volume will automatically be formatted to the specified filesystem type. Currently, the available options are `ext4` and `xfs`. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to other Droplets is not recommended.
     */
    constructor(filesystemType: string);
    filesystemType: string;
}

/**
 * The VolumeSnapshotId model module.
 * @module model/VolumeSnapshotId
 * @version 2.0
 */
export class VolumeSnapshotId {
    /**
     * Constructs a <code>VolumeSnapshotId</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VolumeSnapshotId} obj Optional instance to populate.
     * @return {module:model/VolumeSnapshotId} The populated <code>VolumeSnapshotId</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The unique identifier for the volume snapshot from which to create the volume.
     * @member {String} snapshotId
     */
    snapshotId: any;
}

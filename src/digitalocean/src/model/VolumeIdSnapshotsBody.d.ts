/**
 * The VolumeIdSnapshotsBody model module.
 * @module model/VolumeIdSnapshotsBody
 * @version 2.0
 */
export class VolumeIdSnapshotsBody {
    /**
     * Constructs a <code>VolumeIdSnapshotsBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VolumeIdSnapshotsBody} obj Optional instance to populate.
     * @return {module:model/VolumeIdSnapshotsBody} The populated <code>VolumeIdSnapshotsBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>VolumeIdSnapshotsBody</code>.
     * @alias module:model/VolumeIdSnapshotsBody
     * @class
     * @param name {String} A human-readable name for the volume snapshot.
     */
    constructor(name: string);
    name: string;
    /**
     * @member {module:model/TagsArray} tags
     */
    tags: any;
}

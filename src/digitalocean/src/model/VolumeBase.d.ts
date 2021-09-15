/**
 * The VolumeBase model module.
 * @module model/VolumeBase
 * @version 2.0
 */
export class VolumeBase {
    /**
     * Constructs a <code>VolumeBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VolumeBase} obj Optional instance to populate.
     * @return {module:model/VolumeBase} The populated <code>VolumeBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The unique identifier for the block storage volume.
     * @member {String} id
     */
    id: any;
    /**
     * An array containing the IDs of the Droplets the volume is attached to. Note that at this time, a volume can only be attached to a single Droplet.
     * @member {Array.<Number>} dropletIds
     */
    dropletIds: any;
    /**
     * A human-readable name for the block storage volume. Must be lowercase and be composed only of numbers, letters and \"-\", up to a limit of 64 characters. The name must begin with a letter.
     * @member {String} name
     */
    name: any;
    /**
     * An optional free-form text field to describe a block storage volume.
     * @member {String} description
     */
    description: any;
    /**
     * The size of the block storage volume in GiB (1024^3).
     * @member {Number} sizeGigabytes
     */
    sizeGigabytes: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the block storage volume was created.
     * @member {String} createdAt
     */
    createdAt: any;
    /**
     * @member {module:model/TagsArray} tags
     */
    tags: any;
}

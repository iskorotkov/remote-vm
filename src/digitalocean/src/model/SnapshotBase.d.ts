/**
 * The SnapshotBase model module.
 * @module model/SnapshotBase
 * @version 2.0
 */
export class SnapshotBase {
    /**
     * Constructs a <code>SnapshotBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SnapshotBase} obj Optional instance to populate.
     * @return {module:model/SnapshotBase} The populated <code>SnapshotBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>SnapshotBase</code>.
     * @alias module:model/SnapshotBase
     * @class
     * @param name {String} A human-readable name for the snapshot.
     * @param createdAt {Date} A time value given in ISO8601 combined date and time format that represents when the snapshot was created.
     * @param regions {Array.<String>} An array of the regions that the snapshot is available in. The regions are represented by their identifying slug values.
     * @param minDiskSize {Number} The minimum size in GB required for a volume or Droplet to use this snapshot.
     * @param sizeGigabytes {Number} The billable size of the snapshot in gigabytes.
     */
    constructor(name: string, createdAt: Date, regions: Array<string>, minDiskSize: number, sizeGigabytes: number);
    name: string;
    createdAt: Date;
    regions: string[];
    minDiskSize: number;
    sizeGigabytes: number;
}

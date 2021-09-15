/**
 * The DropletSnapshot model module.
 * @module model/DropletSnapshot
 * @version 2.0
 */
export class DropletSnapshot {
    /**
     * Constructs a <code>DropletSnapshot</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DropletSnapshot} obj Optional instance to populate.
     * @return {module:model/DropletSnapshot} The populated <code>DropletSnapshot</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DropletSnapshot</code>.
     * @alias module:model/DropletSnapshot
     * @class
     * @param name {} A human-readable name for the snapshot.
     * @param createdAt {} A time value given in ISO8601 combined date and time format that represents when the snapshot was created.
     * @param regions {} An array of the regions that the snapshot is available in. The regions are represented by their identifying slug values.
     * @param minDiskSize {} The minimum size in GB required for a volume or Droplet to use this snapshot.
     * @param sizeGigabytes {} The billable size of the snapshot in gigabytes.
     * @param type {} Describes the kind of image. It may be one of `snapshot` or `backup`. This specifies whether an image is a user-generated Droplet snapshot or automatically created Droplet backup.
     */
    constructor(name: any, createdAt: any, regions: any, minDiskSize: any, sizeGigabytes: any, type: any);
    name: any;
    createdAt: any;
    regions: any;
    minDiskSize: any;
    sizeGigabytes: any;
    type: any;
}
export namespace DropletSnapshot {
    namespace TypeEnum {
        const snapshot: string;
        const backup: string;
    }
    /**
     * *
     */
    type TypeEnum = string;
}

/**
 * The Snapshot model module.
 * @module model/Snapshot
 * @version 2.0
 */
export class Snapshot {
    /**
     * Constructs a <code>Snapshot</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Snapshot} obj Optional instance to populate.
     * @return {module:model/Snapshot} The populated <code>Snapshot</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Snapshot</code>.
     * @alias module:model/Snapshot
     * @class
     * @param name {} A human-readable name for the snapshot.
     * @param createdAt {} A time value given in ISO8601 combined date and time format that represents when the snapshot was created.
     * @param regions {} An array of the regions that the snapshot is available in. The regions are represented by their identifying slug values.
     * @param minDiskSize {} The minimum size in GB required for a volume or Droplet to use this snapshot.
     * @param sizeGigabytes {} The billable size of the snapshot in gigabytes.
     * @param resourceId {} The unique identifier for the resource that the snapshot originated from.
     * @param resourceType {} The type of resource that the snapshot originated from.
     * @param tags {} An array of Tags the snapshot has been tagged with.
     */
    constructor(name: any, createdAt: any, regions: any, minDiskSize: any, sizeGigabytes: any, resourceId: any, resourceType: any, tags: any);
    name: any;
    createdAt: any;
    regions: any;
    minDiskSize: any;
    sizeGigabytes: any;
    resourceId: any;
    resourceType: any;
    tags: any;
}
export namespace Snapshot {
    namespace ResourceTypeEnum {
        const droplet: string;
        const volume: string;
    }
    /**
     * *
     */
    type ResourceTypeEnum = string;
}

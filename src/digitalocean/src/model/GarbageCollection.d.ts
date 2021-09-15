/**
 * The GarbageCollection model module.
 * @module model/GarbageCollection
 * @version 2.0
 */
export class GarbageCollection {
    /**
     * Constructs a <code>GarbageCollection</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GarbageCollection} obj Optional instance to populate.
     * @return {module:model/GarbageCollection} The populated <code>GarbageCollection</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A string specifying the UUID of the garbage collection.
     * @member {String} uuid
     */
    uuid: any;
    /**
     * The name of the container registry.
     * @member {String} registryName
     */
    registryName: any;
    /**
     * The current status of this garbage collection.
     * @member {module:model/GarbageCollection.StatusEnum} status
     */
    status: any;
    /**
     * The time the garbage collection was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * The time the garbage collection was last updated.
     * @member {Date} updatedAt
     */
    updatedAt: any;
    /**
     * The number of blobs deleted as a result of this garbage collection.
     * @member {Number} blobsDeleted
     */
    blobsDeleted: any;
    /**
     * The number of bytes freed as a result of this garbage collection.
     * @member {Number} freedBytes
     */
    freedBytes: any;
}
export namespace GarbageCollection {
    namespace StatusEnum {
        const requested: string;
        const waitingForWriteJWTsToExpire: string;
        const scanningManifests: string;
        const deletingUnreferencedBlobs: string;
        const cancelling: string;
        const failed: string;
        const succeeded: string;
        const cancelled: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}

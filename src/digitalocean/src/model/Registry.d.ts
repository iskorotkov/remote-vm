/**
 * The Registry model module.
 * @module model/Registry
 * @version 2.0
 */
export class Registry {
    /**
     * Constructs a <code>Registry</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Registry} obj Optional instance to populate.
     * @return {module:model/Registry} The populated <code>Registry</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A globally unique name for the container registry. Must be lowercase and be composed only of numbers, letters and `-`, up to a limit of 63 characters.
     * @member {String} name
     */
    name: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the registry was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * The amount of storage used in the registry in bytes.
     * @member {Number} storageUsageBytes
     */
    storageUsageBytes: any;
    /**
     * The time at which the storage usage was updated. Storage usage is calculated asynchronously, and may not immediately reflect pushes to the registry.
     * @member {Date} storageUsageBytesUpdatedAt
     */
    storageUsageBytesUpdatedAt: any;
    /**
     * @member {Object} subscription
     */
    subscription: any;
}

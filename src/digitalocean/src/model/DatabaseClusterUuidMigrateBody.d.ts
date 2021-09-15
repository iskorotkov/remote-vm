/**
 * The DatabaseClusterUuidMigrateBody model module.
 * @module model/DatabaseClusterUuidMigrateBody
 * @version 2.0
 */
export class DatabaseClusterUuidMigrateBody {
    /**
     * Constructs a <code>DatabaseClusterUuidMigrateBody</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseClusterUuidMigrateBody} obj Optional instance to populate.
     * @return {module:model/DatabaseClusterUuidMigrateBody} The populated <code>DatabaseClusterUuidMigrateBody</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseClusterUuidMigrateBody</code>.
     * @alias module:model/DatabaseClusterUuidMigrateBody
     * @class
     * @param region {String} A slug identifier for the region to which the database cluster will be migrated.
     */
    constructor(region: string);
    region: string;
}

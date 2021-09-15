/**
 * The DatabaseBackup model module.
 * @module model/DatabaseBackup
 * @version 2.0
 */
export class DatabaseBackup {
    /**
     * Constructs a <code>DatabaseBackup</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseBackup} obj Optional instance to populate.
     * @return {module:model/DatabaseBackup} The populated <code>DatabaseBackup</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseBackup</code>.
     * @alias module:model/DatabaseBackup
     * @class
     * @param databaseName {String} The name of an existing database cluster from which the backup will be restored.
     */
    constructor(databaseName: string);
    databaseName: string;
    /**
     * The timestamp of an existing database cluster backup in ISO8601 combined date and time format. The most recent backup will be used if excluded.
     * @member {Date} backupCreatedAt
     */
    backupCreatedAt: any;
}

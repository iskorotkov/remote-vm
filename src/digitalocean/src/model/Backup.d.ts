/**
 * The Backup model module.
 * @module model/Backup
 * @version 2.0
 */
export class Backup {
    /**
     * Constructs a <code>Backup</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Backup} obj Optional instance to populate.
     * @return {module:model/Backup} The populated <code>Backup</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Backup</code>.
     * @alias module:model/Backup
     * @class
     * @param createdAt {Date} A time value given in ISO8601 combined date and time format at which the backup was created.
     * @param sizeGigabytes {Number} The size of the database backup in GBs.
     */
    constructor(createdAt: Date, sizeGigabytes: number);
    createdAt: Date;
    sizeGigabytes: number;
}

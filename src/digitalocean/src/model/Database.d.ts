/**
 * The Database model module.
 * @module model/Database
 * @version 2.0
 */
export class Database {
    /**
     * Constructs a <code>Database</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Database} obj Optional instance to populate.
     * @return {module:model/Database} The populated <code>Database</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>Database</code>.
     * @alias module:model/Database
     * @class
     * @param name {String} The name of the database.
     */
    constructor(name: string);
    name: string;
}

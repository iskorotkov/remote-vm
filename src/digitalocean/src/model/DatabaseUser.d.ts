/**
 * The DatabaseUser model module.
 * @module model/DatabaseUser
 * @version 2.0
 */
export class DatabaseUser {
    /**
     * Constructs a <code>DatabaseUser</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseUser} obj Optional instance to populate.
     * @return {module:model/DatabaseUser} The populated <code>DatabaseUser</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseUser</code>.
     * @alias module:model/DatabaseUser
     * @class
     * @param name {String} The name of a database user.
     */
    constructor(name: string);
    name: string;
    /**
     * A string representing the database user's role. The value will be either \"primary\" or \"normal\".
     * @member {module:model/DatabaseUser.RoleEnum} role
     */
    role: any;
    /**
     * A randomly generated password for the database user.
     * @member {String} password
     */
    password: any;
    /**
     * @member {module:model/MysqlSettings} mysqlSettings
     */
    mysqlSettings: any;
}
export namespace DatabaseUser {
    namespace RoleEnum {
        const primary: string;
        const normal: string;
    }
    /**
     * *
     */
    type RoleEnum = string;
}

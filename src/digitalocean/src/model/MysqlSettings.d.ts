/**
 * The MysqlSettings model module.
 * @module model/MysqlSettings
 * @version 2.0
 */
export class MysqlSettings {
    /**
     * Constructs a <code>MysqlSettings</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MysqlSettings} obj Optional instance to populate.
     * @return {module:model/MysqlSettings} The populated <code>MysqlSettings</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>MysqlSettings</code>.
     * @alias module:model/MysqlSettings
     * @class
     * @param authPlugin {module:model/MysqlSettings.AuthPluginEnum} A string specifying the authentication method to be used for connections to the MySQL user account. The valid values are `mysql_native_password` or `caching_sha2_password`. If excluded when creating a new user, the default for the version of MySQL in use will be used. As of MySQL 8.0, the default is `caching_sha2_password`.
     */
    constructor(authPlugin: any);
    authPlugin: any;
}
export namespace MysqlSettings {
    namespace AuthPluginEnum {
        const mysqlNativePassword: string;
        const cachingSha2Password: string;
    }
    /**
     * *
     */
    type AuthPluginEnum = string;
}

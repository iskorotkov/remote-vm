/**
 * The AppDatabaseSpec model module.
 * @module model/AppDatabaseSpec
 * @version 2.0
 */
export class AppDatabaseSpec {
    /**
     * Constructs a <code>AppDatabaseSpec</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AppDatabaseSpec} obj Optional instance to populate.
     * @return {module:model/AppDatabaseSpec} The populated <code>AppDatabaseSpec</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>AppDatabaseSpec</code>.
     * @alias module:model/AppDatabaseSpec
     * @class
     * @param name {String} The name. Must be unique across all components within the same app.
     */
    constructor(name: string);
    name: string;
    /**
     * The name of the underlying DigitalOcean DBaaS cluster. This is required for production databases. For dev databases, if cluster_name is not set, a new cluster will be provisioned.
     * @member {String} clusterName
     */
    clusterName: any;
    /**
     * The name of the MySQL or PostgreSQL database to configure.
     * @member {String} dbName
     */
    dbName: any;
    /**
     * The name of the MySQL or PostgreSQL user to configure.
     * @member {String} dbUser
     */
    dbUser: any;
    /**
     * - MYSQL: MySQL - PG: PostgreSQL - REDIS: Redis
     * @member {module:model/AppDatabaseSpec.EngineEnum} engine
     * @default 'UNSET'
     */
    engine: string;
    /**
     * Whether this is a production or dev database.
     * @member {Boolean} production
     */
    production: any;
    /**
     * The version of the database engine
     * @member {String} version
     */
    version: any;
}
export namespace AppDatabaseSpec {
    namespace EngineEnum {
        const UNSET: string;
        const MYSQL: string;
        const PG: string;
        const REDIS: string;
    }
    /**
     * *
     */
    type EngineEnum = string;
}

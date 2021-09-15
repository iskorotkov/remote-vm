/**
 * The DatabaseCluster model module.
 * @module model/DatabaseCluster
 * @version 2.0
 */
export class DatabaseCluster {
    /**
     * Constructs a <code>DatabaseCluster</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseCluster} obj Optional instance to populate.
     * @return {module:model/DatabaseCluster} The populated <code>DatabaseCluster</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>DatabaseCluster</code>.
     * @alias module:model/DatabaseCluster
     * @class
     * @param name {String} A unique, human-readable name referring to a database cluster.
     * @param engine {module:model/DatabaseCluster.EngineEnum} A slug representing the database engine used for the cluster. The possible values are: \"pg\" for PostgreSQL, \"mysql\" for MySQL, \"redis\" for Redis, and \"mongodb\" for MongoDB.
     * @param numNodes {Number} The number of nodes in the database cluster.
     * @param size {String} The slug identifier representing the size of the nodes in the database cluster.
     * @param region {String} The slug identifier for the region where the database cluster is located.
     */
    constructor(name: string, engine: any, numNodes: number, size: string, region: string);
    name: string;
    engine: any;
    numNodes: number;
    size: string;
    region: string;
    /**
     * A unique ID that can be used to identify and reference a database cluster.
     * @member {String} id
     */
    id: any;
    /**
     * A string representing the version of the database engine in use for the cluster.
     * @member {String} version
     */
    version: any;
    /**
     * A string representing the current status of the database cluster.
     * @member {module:model/DatabaseCluster.StatusEnum} status
     */
    status: any;
    /**
     * A time value given in ISO8601 combined date and time format that represents when the database cluster was created.
     * @member {Date} createdAt
     */
    createdAt: any;
    /**
     * A string specifying the UUID of the VPC to which the database cluster will be assigned. If excluded, the cluster when creating a new database cluster, it will be assigned to your account's default VPC for the region.
     * @member {String} privateNetworkUuid
     */
    privateNetworkUuid: any;
    /**
     * An array of tags that have been applied to the database cluster.
     * @member {Array.<String>} tags
     */
    tags: any;
    /**
     * An array of strings containing the names of databases created in the database cluster.
     * @member {Array.<String>} dbNames
     */
    dbNames: any;
    /**
     * @member {Object} connection
     */
    connection: any;
    /**
     * @member {Object} privateConnection
     */
    privateConnection: any;
    /**
     * @member {Array.<module:model/DatabaseUser>} users
     */
    users: any;
    /**
     * @member {Object} maintenanceWindow
     */
    maintenanceWindow: any;
}
export namespace DatabaseCluster {
    namespace EngineEnum {
        const pg: string;
        const mysql: string;
        const redis: string;
        const mongodb: string;
    }
    /**
     * *
     */
    type EngineEnum = string;
    namespace StatusEnum {
        const creating: string;
        const online: string;
        const resizing: string;
        const migrating: string;
        const forking: string;
    }
    /**
     * *
     */
    type StatusEnum = string;
}

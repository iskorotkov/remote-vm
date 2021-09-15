/**
 * The ConnectionPool model module.
 * @module model/ConnectionPool
 * @version 2.0
 */
export class ConnectionPool {
    /**
     * Constructs a <code>ConnectionPool</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConnectionPool} obj Optional instance to populate.
     * @return {module:model/ConnectionPool} The populated <code>ConnectionPool</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * Constructs a new <code>ConnectionPool</code>.
     * @alias module:model/ConnectionPool
     * @class
     * @param name {String} A unique name for the connection pool. Must be between 3 and 60 characters.
     * @param mode {String} The PGBouncer transaction mode for the connection pool. The allowed values are session, transaction, and statement.
     * @param size {Number} The desired size of the PGBouncer connection pool. The maximum allowed size is determined by the size of the cluster's primary node. 25 backend server connections are allowed for every 1GB of RAM. Three are reserved for maintenance. For example, a primary node with 1 GB of RAM allows for a maximum of 22 backend server connections while one with 4 GB would allow for 97. Note that these are shared across all connection pools in a cluster.
     * @param db {String} The database for use with the connection pool.
     * @param user {String} The name of the user for use with the connection pool.
     */
    constructor(name: string, mode: string, size: number, db: string, user: string);
    name: string;
    mode: string;
    size: number;
    db: string;
    user: string;
    /**
     * @member {Object} connection
     */
    connection: any;
    /**
     * @member {Object} privateConnection
     */
    privateConnection: any;
}

/**
 * The AllOfdatabaseReplicaPrivateConnection model module.
 * @module model/AllOfdatabaseReplicaPrivateConnection
 * @version 2.0
 */
export class AllOfdatabaseReplicaPrivateConnection {
    /**
     * Constructs a <code>AllOfdatabaseReplicaPrivateConnection</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AllOfdatabaseReplicaPrivateConnection} obj Optional instance to populate.
     * @return {module:model/AllOfdatabaseReplicaPrivateConnection} The populated <code>AllOfdatabaseReplicaPrivateConnection</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A connection string in the format accepted by the `psql` command. This is provided as a convenience and should be able to be constructed by the other attributes.
     * @member {String} uri
     */
    uri: any;
    /**
     * The name of the default database.
     * @member {String} database
     */
    database: any;
    /**
     * The FQDN pointing to the database cluster's current primary node.
     * @member {String} host
     */
    host: any;
    /**
     * The port on which the database cluster is listening.
     * @member {Number} port
     */
    port: any;
    /**
     * The default user for the database.
     * @member {String} user
     */
    user: any;
    /**
     * The randomly generated password for the default user.
     * @member {String} password
     */
    password: any;
    /**
     * A boolean value indicating if the connection should be made over SSL.
     * @member {Boolean} ssl
     */
    ssl: any;
}

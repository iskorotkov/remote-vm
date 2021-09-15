/**
* Databases service.
* @module api/DatabasesApi
* @version 2.0
*/
export class DatabasesApi {
    /**
    * Constructs a new DatabasesApi.
    * @alias module:api/DatabasesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the addConnectionPool operation.
     * @callback moduleapi/DatabasesApi~addConnectionPoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2017{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add a New Connection Pool (PostgreSQL)
     * For PostgreSQL database clusters, connection pools can be used to allow a database to share its idle connections. The popular PostgreSQL connection pooling utility PgBouncer is used to provide this service. [See here for more information](https://www.digitalocean.com/docs/databases/postgresql/how-to/manage-connection-pools/) about how and why to use PgBouncer connection pooling including details about the available transaction modes.  To add a new connection pool to a PostgreSQL database cluster, send a POST request to &#x60;/v2/databases/$DATABASE_ID/pools&#x60; specifying a name for the pool, the user to connect with, the database to connect to, as well as its desired size and transaction mode.
     * @param {module:model/ConnectionPool} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~addConnectionPoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    addConnectionPool(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the addDatabase operation.
     * @callback moduleapi/DatabasesApi~addDatabaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2016{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add a New Database
     * To add a new database to an existing cluster, send a POST request to &#x60;/v2/databases/$DATABASE_ID/dbs&#x60;.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a key called &#x60;db&#x60;. The value of this will be an object that contains the standard attributes associated with a database.
     * @param {module:model/Database} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~addDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    addDatabase(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the addUser operation.
     * @callback moduleapi/DatabasesApi~addUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2015{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add a Database User
     * To add a new database user, send a POST request to &#x60;/v2/databases/$DATABASE_ID/users&#x60; with the desired username.  Note: User management is not supported for Redis clusters.  When adding a user to a MySQL cluster, additional options can be configured in the &#x60;mysql_settings&#x60; object.  The response will be a JSON object with a key called &#x60;user&#x60;. The value of this will be an object that contains the standard attributes associated with a database user including its randomly generated password.
     * @param {module:model/DatabaseUser} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~addUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    addUser(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the createDatabaseCluster operation.
     * @callback moduleapi/DatabasesApi~createDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2013{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Database Cluster
     * To create a database cluster, send a POST request to &#x60;/v2/databases&#x60;. The response will be a JSON object with a key called &#x60;database&#x60;. The value of this will be an object that contains the standard attributes associated with a database cluster. The initial value of the database cluster&#x27;s &#x60;status&#x60; attribute will be &#x60;creating&#x60;. When the cluster is ready to receive traffic, this will transition to &#x60;online&#x60;. The embedded &#x60;connection&#x60; and &#x60;private_connection&#x60; objects will contain the information needed to access the database cluster. DigitalOcean managed PostgreSQL and MySQL database clusters take automated daily backups. To create a new database cluster based on a backup of an exising cluster, send a POST request to &#x60;/v2/databases&#x60;. In addition to the standard database cluster attributes, the JSON body must include a key named &#x60;backup_restore&#x60; with the name of the original database cluster and the timestamp of the backup to be restored. Note: Backups are not supported for Redis clusters.
     * @param {module:model/V2DatabasesBody} body
     * @param {module:api/DatabasesApi~createDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createDatabaseCluster(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the createReplica operation.
     * @callback moduleapi/DatabasesApi~createReplicaCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2014{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a Read-only Replica
     * To create a read-only replica for a PostgreSQL or MySQL database cluster, send a POST request to &#x60;/v2/databases/$DATABASE_ID/replicas&#x60; specifying the name it should be given, the size of the node to be used, and the region where it will be located. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a key called &#x60;replica&#x60;. The value of this will be an object that contains the standard attributes associated with a database replica. The initial value of the read-only replica&#x27;s &#x60;status&#x60; attribute will be &#x60;forking&#x60;. When the replica is ready to receive traffic, this will transition to &#x60;active&#x60;.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {Object} opts Optional parameters
     * @param {module:model/DatabaseClusterUuidReplicasBody} opts.body
     * @param {module:api/DatabasesApi~createReplicaCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createReplica(databaseClusterUuid: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteConnectionPool operation.
     * @callback moduleapi/DatabasesApi~deleteConnectionPoolCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Connection Pool (PostgreSQL)
     * To delete a specific connection pool for a PostgreSQL database cluster, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/pools/$POOL_NAME&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} poolName The name used to identify the connection pool.
     * @param {module:api/DatabasesApi~deleteConnectionPoolCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteConnectionPool(databaseClusterUuid: string, poolName: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteDatabase operation.
     * @callback moduleapi/DatabasesApi~deleteDatabaseCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Database
     * To delete a specific database, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/dbs/$DB_NAME&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: Database management is not supported for Redis clusters.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} databaseName The name of the database.
     * @param {module:api/DatabasesApi~deleteDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDatabase(databaseClusterUuid: string, databaseName: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteOnlineMigration operation.
     * @callback moduleapi/DatabasesApi~deleteOnlineMigrationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Stop an Online Migration
     * To stop an online migration, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/online-migration/$MIGRATION_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} migrationId A unique identifier assigned to the online migration.
     * @param {module:api/DatabasesApi~deleteOnlineMigrationCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteOnlineMigration(databaseClusterUuid: string, migrationId: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteUser operation.
     * @callback moduleapi/DatabasesApi~deleteUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove a Database User
     * To remove a specific database user, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/users/$USERNAME&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: User management is not supported for Redis clusters.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} username The name of the database user.
     * @param {module:api/DatabasesApi~deleteUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteUser(databaseClusterUuid: string, username: string, callback: any): any;
    /**
     * Callback function to receive the result of the destroyCluster operation.
     * @callback moduleapi/DatabasesApi~destroyClusterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Destroy a Database Cluster
     * To destroy a specific database, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID&#x60;. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~destroyClusterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyCluster(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the destroyReplica operation.
     * @callback moduleapi/DatabasesApi~destroyReplicaCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Destroy a Read-only Replica
     * To destroy a specific read-only replica, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME&#x60;. **Note**: Read-only replicas are not supported for Redis clusters. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} replicaName The name of the database replica.
     * @param {module:api/DatabasesApi~destroyReplicaCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyReplica(databaseClusterUuid: string, replicaName: string, callback: any): any;
    /**
     * Callback function to receive the result of the getCa operation.
     * @callback moduleapi/DatabasesApi~getCaCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20012{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve the Public Certificate
     * To retrieve the public certificate used to secure the connection to the database cluster send a GET request to &#x60;/v2/databases/$DATABASE_ID/ca.  The response will be a JSON object with a &#x60;ca&#x60; key. This will be set to an object containing the public key certificate.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~getCaCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getCa(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getConnectionPool operation.
     * @callback moduleapi/DatabasesApi~getConnectionPoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2017{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve Existing Connection Pool (PostgreSQL)
     * To show information about an existing connection pool for a PostgreSQL database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/pools/$POOL_NAME&#x60;. The response will be a JSON object with a &#x60;pool&#x60; key.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} poolName The name used to identify the connection pool.
     * @param {module:api/DatabasesApi~getConnectionPoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getConnectionPool(databaseClusterUuid: string, poolName: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDatabase operation.
     * @callback moduleapi/DatabasesApi~getDatabaseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2016{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Database
     * To show information about an existing database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/dbs/$DB_NAME&#x60;.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a &#x60;db&#x60; key. This will be set to an object containing the standard database attributes.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} databaseName The name of the database.
     * @param {module:api/DatabasesApi~getDatabaseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDatabase(databaseClusterUuid: string, databaseName: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDatabaseCluster operation.
     * @callback moduleapi/DatabasesApi~getDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2013{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Database Cluster
     * To show information about an existing database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID&#x60;. The response will be a JSON object with a database key. This will be set to an object containing the standard database cluster attributes. The embedded connection and private_connection objects will contain the information needed to access the database cluster. The embedded maintenance_window object will contain information about any scheduled maintenance for the database cluster.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~getDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDatabaseCluster(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getEvictionPolicy operation.
     * @callback moduleapi/DatabasesApi~getEvictionPolicyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EvictionPolicy{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve the Eviction Policy for a Redis Cluster
     * To retrieve the configured eviction policy for an existing Redis cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/eviction_policy&#x60;. The response will be a JSON object with an &#x60;eviction_policy&#x60; key. This will be set to a string representing the eviction policy.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~getEvictionPolicyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getEvictionPolicy(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getMigrationStatus operation.
     * @callback moduleapi/DatabasesApi~getMigrationStatusCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OnlineMigration{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve the Status of an Online Migration
     * To retrieve the status of an online migration, send a GET request to &#x60;/v2/databases/$DATABASE_ID/online-migration&#x60;. If a migration has completed, a 200 OK status is returned with no response body.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~getMigrationStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getMigrationStatus(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getReplica operation.
     * @callback moduleapi/DatabasesApi~getReplicaCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2014{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Read-only Replica
     * To show information about an existing database replica, send a GET request to &#x60;/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME&#x60;. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a &#x60;replica key&#x60;. This will be set to an object containing the standard database replica attributes.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} replicaName The name of the database replica.
     * @param {module:api/DatabasesApi~getReplicaCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getReplica(databaseClusterUuid: string, replicaName: string, callback: any): any;
    /**
     * Callback function to receive the result of the getSqlMode operation.
     * @callback moduleapi/DatabasesApi~getSqlModeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SqlMode{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve the SQL Modes for a MySQL Cluster
     * To retrieve the configured SQL modes for an existing MySQL cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/sql_mode&#x60;. The response will be a JSON object with a &#x60;sql_mode&#x60; key. This will be set to a string representing the configured SQL modes.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~getSqlModeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getSqlMode(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getUser operation.
     * @callback moduleapi/DatabasesApi~getUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2015{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Database User
     * To show information about an existing database user, send a GET request to &#x60;/v2/databases/$DATABASE_ID/users/$USERNAME&#x60;.  Note: User management is not supported for Redis clusters.  The response will be a JSON object with a &#x60;user&#x60; key. This will be set to an object containing the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} username The name of the database user.
     * @param {module:api/DatabasesApi~getUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getUser(databaseClusterUuid: string, username: string, callback: any): any;
    /**
     * Callback function to receive the result of the listConnectionPools operation.
     * @callback moduleapi/DatabasesApi~listConnectionPoolsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConnectionPools{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Connection Pools (PostgreSQL)
     * To list all of the connection pools available to a PostgreSQL database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/pools&#x60;. The result will be a JSON object with a &#x60;pools&#x60; key. This will be set to an array of connection pool objects.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~listConnectionPoolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listConnectionPools(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the listDatabaseBackups operation.
     * @callback moduleapi/DatabasesApi~listDatabaseBackupsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20014{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Backups for a Database Cluster
     * To list all of the available backups of a PostgreSQL or MySQL database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/backups&#x60;. **Note**: Backups are not supported for Redis clusters. The result will be a JSON object with a &#x60;backups key&#x60;. This will be set to an array of backup objects, each of which will contain the size of the backup and the timestamp at which it was created.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~listDatabaseBackupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDatabaseBackups(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the listDatabaseClusters operation.
     * @callback moduleapi/DatabasesApi~listDatabaseClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20011{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Database Clusters
     * To list all of the database clusters available on your account, send a GET request to &#x60;/v2/databases&#x60;. To limit the results to database clusters with a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag. For example, &#x60;/v2/databases?tag_name&#x3D;$TAG_NAME&#x60;. The result will be a JSON object with a &#x60;databases&#x60; key. This will be set to an array of database objects, each of which will contain the standard database attributes. The embedded &#x60;connection&#x60; and &#x60;private_connection&#x60; objects will contain the information needed to access the database cluster: The embedded &#x60;maintenance_window&#x60; object will contain information about any scheduled maintenance for the database cluster.
     * @param {Object} opts Optional parameters
     * @param {String} opts.tagName Limits the results to database clusters with a specific tag.
     * @param {module:api/DatabasesApi~listDatabaseClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDatabaseClusters(opts: {
        tagName: string;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listDatabaseFirewalls operation.
     * @callback moduleapi/DatabasesApi~listDatabaseFirewallsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20013{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Firewall Rules (Trusted Sources) for a Database Cluster
     * To list all of a database cluster&#x27;s firewall rules (known as \&quot;trusted sources\&quot; in the control panel), send a GET request to &#x60;/v2/databases/$DATABASE_ID/firewall&#x60;. The result will be a JSON object with a &#x60;rules&#x60; key.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~listDatabaseFirewallsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDatabaseFirewalls(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the listDatabases operation.
     * @callback moduleapi/DatabasesApi~listDatabasesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20017{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Databases
     * To list all of the databases in a clusters, send a GET request to &#x60;/v2/databases/$DATABASE_ID/dbs&#x60;.  The result will be a JSON object with a &#x60;dbs&#x60; key. This will be set to an array of database objects, each of which will contain the standard database attributes.  Note: Database management is not supported for Redis clusters.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~listDatabasesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDatabases(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the listReplicas operation.
     * @callback moduleapi/DatabasesApi~listReplicasCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20015{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Read-only Replicas
     * To list all of the read-only replicas associated with a database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/replicas&#x60;. **Note**: Read-only replicas are not supported for Redis clusters. The result will be a JSON object with a &#x60;replicas&#x60; key. This will be set to an array of database replica objects, each of which will contain the standard database replica attributes.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~listReplicasCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listReplicas(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the listUsers operation.
     * @callback moduleapi/DatabasesApi~listUsersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20016{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List all Database Users
     * To list all of the users for your database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/users&#x60;.  Note: User management is not supported for Redis clusters.  The result will be a JSON object with a &#x60;users&#x60; key. This will be set to an array of database user objects, each of which will contain the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object.
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~listUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listUsers(databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the resetAuth operation.
     * @callback moduleapi/DatabasesApi~resetAuthCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2015{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Reset a Database User&#x27;s Password or Authentication Method
     * To reset the password for a database user, send a POST request to &#x60;/v2/databases/$DATABASE_ID/users/$USERNAME/reset_auth&#x60;.   For &#x60;mysql&#x60; databases, the authentication method can be specifying by including a key in the JSON body called &#x60;mysql_settings&#x60; with the &#x60;auth_plugin&#x60; value specified.  The response will be a JSON object with a &#x60;user&#x60; key. This will be set to an object containing the standard database user attributes.
     * @param {module:model/UsernameResetAuthBody} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {String} username The name of the database user.
     * @param {module:api/DatabasesApi~resetAuthCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    resetAuth(body: any, databaseClusterUuid: string, username: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateDatabaseCluster operation.
     * @callback moduleapi/DatabasesApi~updateDatabaseClusterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Migrate a Database Cluster to a New Region
     * To migrate a database cluster to a new region, send a &#x60;PUT&#x60; request to &#x60;/v2/databases/$DATABASE_ID/migrate&#x60;. The body of the request must specify a &#x60;region&#x60; attribute.  A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its &#x60;status&#x60; attribute will now be set to &#x60;migrating&#x60;. This will transition back to &#x60;online&#x60; when the migration has completed.
     * @param {module:model/DatabaseClusterUuidMigrateBody} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateDatabaseClusterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateDatabaseCluster(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateDatabaseClusterSize operation.
     * @callback moduleapi/DatabasesApi~updateDatabaseClusterSizeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Resize a Database Cluster
     * To resize a database cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/resize&#x60;. The body of the request must specify both the size and num_nodes attributes. A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its status attribute will now be set to resizing. This will transition back to online when the resize operation has completed.
     * @param {module:model/DatabaseClusterResize} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateDatabaseClusterSizeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateDatabaseClusterSize(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateDatabaseFirewall operation.
     * @callback moduleapi/DatabasesApi~updateDatabaseFirewallCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update Firewall Rules (Trusted Sources) for a Database
     * To update a database cluster&#x27;s firewall rules (known as \&quot;trusted sources\&quot; in the control panel), send a PUT request to &#x60;/v2/databases/$DATABASE_ID/firewall&#x60; specifying which resources should be able to open connections to the database. You may limit connections to specific Droplets, Kubernetes clusters, or IP addresses. When a tag is provided, any Droplet or Kubernetes node with that tag applied to it will have access. The firewall is limited to 100 rules (or trusted sources). When possible, we recommend [placing your databases into a VPC network](https://www.digitalocean.com/docs/networking/vpc/) to limit access to them instead of using a firewall. A successful
     * @param {module:model/DatabaseClusterUuidFirewallBody} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateDatabaseFirewallCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateDatabaseFirewall(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateEvictionPolicy operation.
     * @callback moduleapi/DatabasesApi~updateEvictionPolicyCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Configure the Eviction Policy for a Redis Cluster
     * To configure an eviction policy for an existing Redis cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/eviction_policy&#x60; specifying the desired policy.
     * @param {module:model/EvictionPolicy} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateEvictionPolicyCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateEvictionPolicy(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateMaintenanceWindow operation.
     * @callback moduleapi/DatabasesApi~updateMaintenanceWindowCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Configure a Database Cluster&#x27;s Maintenance Window
     * To configure the window when automatic maintenance should be performed for a database cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/maintenance&#x60;. A successful request will receive a 204 No Content status code with no body in response.
     * @param {module:model/DatabaseMaintenanceWindow} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateMaintenanceWindowCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateMaintenanceWindow(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateOnlineMigration operation.
     * @callback moduleapi/DatabasesApi~updateOnlineMigrationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OnlineMigration{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Start an Online Migration
     * To start an online migration, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/online-migration&#x60; endpoint. Migrating a cluster establishes a connection with an existing cluster and replicates its contents to the target cluster. Online migration is only available for PostgreSQL and Redis clusters.
     * @param {module:model/SourceDatabase} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateOnlineMigrationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateOnlineMigration(body: any, databaseClusterUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateSqlMode operation.
     * @callback moduleapi/DatabasesApi~updateSqlModeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update SQL Mode for a Cluster
     * To configure the SQL modes for an existing MySQL cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/sql_mode&#x60; specifying the desired modes. See the official MySQL 8 documentation for a [full list of supported SQL modes](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-full). A successful request will receive a 204 No Content status code with no body in response.
     * @param {module:model/SqlMode} body
     * @param {String} databaseClusterUuid A unique identifier for a database cluster.
     * @param {module:api/DatabasesApi~updateSqlModeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    updateSqlMode(body: any, databaseClusterUuid: string, callback: any): any;
}
/**
 * /DatabasesApi~addConnectionPoolCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

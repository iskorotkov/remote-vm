# DigitalOceanApi.DatabasesApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addConnectionPool**](DatabasesApi.md#addConnectionPool) | **POST** /v2/databases/{database_cluster_uuid}/pools | Add a New Connection Pool (PostgreSQL)
[**addDatabase**](DatabasesApi.md#addDatabase) | **POST** /v2/databases/{database_cluster_uuid}/dbs | Add a New Database
[**addUser**](DatabasesApi.md#addUser) | **POST** /v2/databases/{database_cluster_uuid}/users | Add a Database User
[**createDatabaseCluster**](DatabasesApi.md#createDatabaseCluster) | **POST** /v2/databases | Create a New Database Cluster
[**createReplica**](DatabasesApi.md#createReplica) | **POST** /v2/databases/{database_cluster_uuid}/replicas | Create a Read-only Replica
[**deleteConnectionPool**](DatabasesApi.md#deleteConnectionPool) | **DELETE** /v2/databases/{database_cluster_uuid}/pools/{pool_name} | Delete a Connection Pool (PostgreSQL)
[**deleteDatabase**](DatabasesApi.md#deleteDatabase) | **DELETE** /v2/databases/{database_cluster_uuid}/dbs/{database_name} | Delete a Database
[**deleteOnlineMigration**](DatabasesApi.md#deleteOnlineMigration) | **DELETE** /v2/databases/{database_cluster_uuid}/online-migration/{migration_id} | Stop an Online Migration
[**deleteUser**](DatabasesApi.md#deleteUser) | **DELETE** /v2/databases/{database_cluster_uuid}/users/{username} | Remove a Database User
[**destroyCluster**](DatabasesApi.md#destroyCluster) | **DELETE** /v2/databases/{database_cluster_uuid} | Destroy a Database Cluster
[**destroyReplica**](DatabasesApi.md#destroyReplica) | **DELETE** /v2/databases/{database_cluster_uuid}/replicas/{replica_name} | Destroy a Read-only Replica
[**getCa**](DatabasesApi.md#getCa) | **GET** /v2/databases/{database_cluster_uuid}/ca | Retrieve the Public Certificate
[**getConnectionPool**](DatabasesApi.md#getConnectionPool) | **GET** /v2/databases/{database_cluster_uuid}/pools/{pool_name} | Retrieve Existing Connection Pool (PostgreSQL)
[**getDatabase**](DatabasesApi.md#getDatabase) | **GET** /v2/databases/{database_cluster_uuid}/dbs/{database_name} | Retrieve an Existing Database
[**getDatabaseCluster**](DatabasesApi.md#getDatabaseCluster) | **GET** /v2/databases/{database_cluster_uuid} | Retrieve an Existing Database Cluster
[**getEvictionPolicy**](DatabasesApi.md#getEvictionPolicy) | **GET** /v2/databases/{database_cluster_uuid}/eviction_policy | Retrieve the Eviction Policy for a Redis Cluster
[**getMigrationStatus**](DatabasesApi.md#getMigrationStatus) | **GET** /v2/databases/{database_cluster_uuid}/online-migration | Retrieve the Status of an Online Migration
[**getReplica**](DatabasesApi.md#getReplica) | **GET** /v2/databases/{database_cluster_uuid}/replicas/{replica_name} | Retrieve an Existing Read-only Replica
[**getSqlMode**](DatabasesApi.md#getSqlMode) | **GET** /v2/databases/{database_cluster_uuid}/sql_mode | Retrieve the SQL Modes for a MySQL Cluster
[**getUser**](DatabasesApi.md#getUser) | **GET** /v2/databases/{database_cluster_uuid}/users/{username} | Retrieve an Existing Database User
[**listConnectionPools**](DatabasesApi.md#listConnectionPools) | **GET** /v2/databases/{database_cluster_uuid}/pools | List Connection Pools (PostgreSQL)
[**listDatabaseBackups**](DatabasesApi.md#listDatabaseBackups) | **GET** /v2/databases/{database_cluster_uuid}/backups | List Backups for a Database Cluster
[**listDatabaseClusters**](DatabasesApi.md#listDatabaseClusters) | **GET** /v2/databases | List All Database Clusters
[**listDatabaseFirewalls**](DatabasesApi.md#listDatabaseFirewalls) | **GET** /v2/databases/{database_cluster_uuid}/firewall | List Firewall Rules (Trusted Sources) for a Database Cluster
[**listDatabases**](DatabasesApi.md#listDatabases) | **GET** /v2/databases/{database_cluster_uuid}/dbs | List All Databases
[**listReplicas**](DatabasesApi.md#listReplicas) | **GET** /v2/databases/{database_cluster_uuid}/replicas | List All Read-only Replicas
[**listUsers**](DatabasesApi.md#listUsers) | **GET** /v2/databases/{database_cluster_uuid}/users | List all Database Users
[**resetAuth**](DatabasesApi.md#resetAuth) | **POST** /v2/databases/{database_cluster_uuid}/users/{username}/reset_auth | Reset a Database User&#x27;s Password or Authentication Method
[**updateDatabaseCluster**](DatabasesApi.md#updateDatabaseCluster) | **PUT** /v2/databases/{database_cluster_uuid}/migrate | Migrate a Database Cluster to a New Region
[**updateDatabaseClusterSize**](DatabasesApi.md#updateDatabaseClusterSize) | **PUT** /v2/databases/{database_cluster_uuid}/resize | Resize a Database Cluster
[**updateDatabaseFirewall**](DatabasesApi.md#updateDatabaseFirewall) | **PUT** /v2/databases/{database_cluster_uuid}/firewall | Update Firewall Rules (Trusted Sources) for a Database
[**updateEvictionPolicy**](DatabasesApi.md#updateEvictionPolicy) | **PUT** /v2/databases/{database_cluster_uuid}/eviction_policy | Configure the Eviction Policy for a Redis Cluster
[**updateMaintenanceWindow**](DatabasesApi.md#updateMaintenanceWindow) | **PUT** /v2/databases/{database_cluster_uuid}/maintenance | Configure a Database Cluster&#x27;s Maintenance Window
[**updateOnlineMigration**](DatabasesApi.md#updateOnlineMigration) | **PUT** /v2/databases/{database_cluster_uuid}/online-migration | Start an Online Migration
[**updateSqlMode**](DatabasesApi.md#updateSqlMode) | **PUT** /v2/databases/{database_cluster_uuid}/sql_mode | Update SQL Mode for a Cluster

<a name="addConnectionPool"></a>
# **addConnectionPool**
> InlineResponse2017 addConnectionPool(body, databaseClusterUuid)

Add a New Connection Pool (PostgreSQL)

For PostgreSQL database clusters, connection pools can be used to allow a database to share its idle connections. The popular PostgreSQL connection pooling utility PgBouncer is used to provide this service. [See here for more information](https://www.digitalocean.com/docs/databases/postgresql/how-to/manage-connection-pools/) about how and why to use PgBouncer connection pooling including details about the available transaction modes.  To add a new connection pool to a PostgreSQL database cluster, send a POST request to &#x60;/v2/databases/$DATABASE_ID/pools&#x60; specifying a name for the pool, the user to connect with, the database to connect to, as well as its desired size and transaction mode. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.ConnectionPool(); // ConnectionPool | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.addConnectionPool(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ConnectionPool**](ConnectionPool.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addDatabase"></a>
# **addDatabase**
> InlineResponse2016 addDatabase(body, databaseClusterUuid)

Add a New Database

To add a new database to an existing cluster, send a POST request to &#x60;/v2/databases/$DATABASE_ID/dbs&#x60;.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a key called &#x60;db&#x60;. The value of this will be an object that contains the standard attributes associated with a database. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.Database(); // Database | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.addDatabase(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Database**](Database.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addUser"></a>
# **addUser**
> InlineResponse2015 addUser(body, databaseClusterUuid)

Add a Database User

To add a new database user, send a POST request to &#x60;/v2/databases/$DATABASE_ID/users&#x60; with the desired username.  Note: User management is not supported for Redis clusters.  When adding a user to a MySQL cluster, additional options can be configured in the &#x60;mysql_settings&#x60; object.  The response will be a JSON object with a key called &#x60;user&#x60;. The value of this will be an object that contains the standard attributes associated with a database user including its randomly generated password. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.DatabaseUser(); // DatabaseUser | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.addUser(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DatabaseUser**](DatabaseUser.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createDatabaseCluster"></a>
# **createDatabaseCluster**
> InlineResponse2013 createDatabaseCluster(body)

Create a New Database Cluster

To create a database cluster, send a POST request to &#x60;/v2/databases&#x60;. The response will be a JSON object with a key called &#x60;database&#x60;. The value of this will be an object that contains the standard attributes associated with a database cluster. The initial value of the database cluster&#x27;s &#x60;status&#x60; attribute will be &#x60;creating&#x60;. When the cluster is ready to receive traffic, this will transition to &#x60;online&#x60;. The embedded &#x60;connection&#x60; and &#x60;private_connection&#x60; objects will contain the information needed to access the database cluster. DigitalOcean managed PostgreSQL and MySQL database clusters take automated daily backups. To create a new database cluster based on a backup of an exising cluster, send a POST request to &#x60;/v2/databases&#x60;. In addition to the standard database cluster attributes, the JSON body must include a key named &#x60;backup_restore&#x60; with the name of the original database cluster and the timestamp of the backup to be restored. Note: Backups are not supported for Redis clusters.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.V2DatabasesBody(); // V2DatabasesBody | 

apiInstance.createDatabaseCluster(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**V2DatabasesBody**](V2DatabasesBody.md)|  | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createReplica"></a>
# **createReplica**
> InlineResponse2014 createReplica(databaseClusterUuid, opts)

Create a Read-only Replica

To create a read-only replica for a PostgreSQL or MySQL database cluster, send a POST request to &#x60;/v2/databases/$DATABASE_ID/replicas&#x60; specifying the name it should be given, the size of the node to be used, and the region where it will be located. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a key called &#x60;replica&#x60;. The value of this will be an object that contains the standard attributes associated with a database replica. The initial value of the read-only replica&#x27;s &#x60;status&#x60; attribute will be &#x60;forking&#x60;. When the replica is ready to receive traffic, this will transition to &#x60;active&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let opts = { 
  'body': new DigitalOceanApi.DatabaseClusterUuidReplicasBody() // DatabaseClusterUuidReplicasBody | 
};
apiInstance.createReplica(databaseClusterUuid, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **body** | [**DatabaseClusterUuidReplicasBody**](DatabaseClusterUuidReplicasBody.md)|  | [optional] 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteConnectionPool"></a>
# **deleteConnectionPool**
> deleteConnectionPool(databaseClusterUuid, poolName)

Delete a Connection Pool (PostgreSQL)

To delete a specific connection pool for a PostgreSQL database cluster, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/pools/$POOL_NAME&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let poolName = "poolName_example"; // String | The name used to identify the connection pool.

apiInstance.deleteConnectionPool(databaseClusterUuid, poolName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **poolName** | **String**| The name used to identify the connection pool. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteDatabase"></a>
# **deleteDatabase**
> deleteDatabase(databaseClusterUuid, databaseName)

Delete a Database

To delete a specific database, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/dbs/$DB_NAME&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: Database management is not supported for Redis clusters. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let databaseName = "databaseName_example"; // String | The name of the database.

apiInstance.deleteDatabase(databaseClusterUuid, databaseName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **databaseName** | **String**| The name of the database. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteOnlineMigration"></a>
# **deleteOnlineMigration**
> deleteOnlineMigration(databaseClusterUuid, migrationId)

Stop an Online Migration

To stop an online migration, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/online-migration/$MIGRATION_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let migrationId = "migrationId_example"; // String | A unique identifier assigned to the online migration.

apiInstance.deleteOnlineMigration(databaseClusterUuid, migrationId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **migrationId** | **String**| A unique identifier assigned to the online migration. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteUser"></a>
# **deleteUser**
> deleteUser(databaseClusterUuid, username)

Remove a Database User

To remove a specific database user, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/users/$USERNAME&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: User management is not supported for Redis clusters. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let username = "username_example"; // String | The name of the database user.

apiInstance.deleteUser(databaseClusterUuid, username, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **username** | **String**| The name of the database user. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyCluster"></a>
# **destroyCluster**
> destroyCluster(databaseClusterUuid)

Destroy a Database Cluster

To destroy a specific database, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID&#x60;. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.destroyCluster(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyReplica"></a>
# **destroyReplica**
> destroyReplica(databaseClusterUuid, replicaName)

Destroy a Read-only Replica

To destroy a specific read-only replica, send a DELETE request to &#x60;/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME&#x60;. **Note**: Read-only replicas are not supported for Redis clusters. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let replicaName = "replicaName_example"; // String | The name of the database replica.

apiInstance.destroyReplica(databaseClusterUuid, replicaName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **replicaName** | **String**| The name of the database replica. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getCa"></a>
# **getCa**
> InlineResponse20012 getCa(databaseClusterUuid)

Retrieve the Public Certificate

To retrieve the public certificate used to secure the connection to the database cluster send a GET request to &#x60;/v2/databases/$DATABASE_ID/ca.  The response will be a JSON object with a &#x60;ca&#x60; key. This will be set to an object containing the public key certificate. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.getCa(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse20012**](InlineResponse20012.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getConnectionPool"></a>
# **getConnectionPool**
> InlineResponse2017 getConnectionPool(databaseClusterUuid, poolName)

Retrieve Existing Connection Pool (PostgreSQL)

To show information about an existing connection pool for a PostgreSQL database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/pools/$POOL_NAME&#x60;. The response will be a JSON object with a &#x60;pool&#x60; key.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let poolName = "poolName_example"; // String | The name used to identify the connection pool.

apiInstance.getConnectionPool(databaseClusterUuid, poolName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **poolName** | **String**| The name used to identify the connection pool. | 

### Return type

[**InlineResponse2017**](InlineResponse2017.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDatabase"></a>
# **getDatabase**
> InlineResponse2016 getDatabase(databaseClusterUuid, databaseName)

Retrieve an Existing Database

To show information about an existing database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/dbs/$DB_NAME&#x60;.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a &#x60;db&#x60; key. This will be set to an object containing the standard database attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let databaseName = "databaseName_example"; // String | The name of the database.

apiInstance.getDatabase(databaseClusterUuid, databaseName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **databaseName** | **String**| The name of the database. | 

### Return type

[**InlineResponse2016**](InlineResponse2016.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDatabaseCluster"></a>
# **getDatabaseCluster**
> InlineResponse2013 getDatabaseCluster(databaseClusterUuid)

Retrieve an Existing Database Cluster

To show information about an existing database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID&#x60;. The response will be a JSON object with a database key. This will be set to an object containing the standard database cluster attributes. The embedded connection and private_connection objects will contain the information needed to access the database cluster. The embedded maintenance_window object will contain information about any scheduled maintenance for the database cluster.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.getDatabaseCluster(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getEvictionPolicy"></a>
# **getEvictionPolicy**
> EvictionPolicy getEvictionPolicy(databaseClusterUuid)

Retrieve the Eviction Policy for a Redis Cluster

To retrieve the configured eviction policy for an existing Redis cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/eviction_policy&#x60;. The response will be a JSON object with an &#x60;eviction_policy&#x60; key. This will be set to a string representing the eviction policy.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.getEvictionPolicy(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**EvictionPolicy**](EvictionPolicy.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getMigrationStatus"></a>
# **getMigrationStatus**
> OnlineMigration getMigrationStatus(databaseClusterUuid)

Retrieve the Status of an Online Migration

To retrieve the status of an online migration, send a GET request to &#x60;/v2/databases/$DATABASE_ID/online-migration&#x60;. If a migration has completed, a 200 OK status is returned with no response body.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.getMigrationStatus(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**OnlineMigration**](OnlineMigration.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getReplica"></a>
# **getReplica**
> InlineResponse2014 getReplica(databaseClusterUuid, replicaName)

Retrieve an Existing Read-only Replica

To show information about an existing database replica, send a GET request to &#x60;/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME&#x60;. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a &#x60;replica key&#x60;. This will be set to an object containing the standard database replica attributes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let replicaName = "replicaName_example"; // String | The name of the database replica.

apiInstance.getReplica(databaseClusterUuid, replicaName, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **replicaName** | **String**| The name of the database replica. | 

### Return type

[**InlineResponse2014**](InlineResponse2014.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getSqlMode"></a>
# **getSqlMode**
> SqlMode getSqlMode(databaseClusterUuid)

Retrieve the SQL Modes for a MySQL Cluster

To retrieve the configured SQL modes for an existing MySQL cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/sql_mode&#x60;. The response will be a JSON object with a &#x60;sql_mode&#x60; key. This will be set to a string representing the configured SQL modes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.getSqlMode(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**SqlMode**](SqlMode.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getUser"></a>
# **getUser**
> InlineResponse2015 getUser(databaseClusterUuid, username)

Retrieve an Existing Database User

To show information about an existing database user, send a GET request to &#x60;/v2/databases/$DATABASE_ID/users/$USERNAME&#x60;.  Note: User management is not supported for Redis clusters.  The response will be a JSON object with a &#x60;user&#x60; key. This will be set to an object containing the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let username = "username_example"; // String | The name of the database user.

apiInstance.getUser(databaseClusterUuid, username, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **username** | **String**| The name of the database user. | 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listConnectionPools"></a>
# **listConnectionPools**
> ConnectionPools listConnectionPools(databaseClusterUuid)

List Connection Pools (PostgreSQL)

To list all of the connection pools available to a PostgreSQL database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/pools&#x60;. The result will be a JSON object with a &#x60;pools&#x60; key. This will be set to an array of connection pool objects.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.listConnectionPools(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**ConnectionPools**](ConnectionPools.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDatabaseBackups"></a>
# **listDatabaseBackups**
> InlineResponse20014 listDatabaseBackups(databaseClusterUuid)

List Backups for a Database Cluster

To list all of the available backups of a PostgreSQL or MySQL database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/backups&#x60;. **Note**: Backups are not supported for Redis clusters. The result will be a JSON object with a &#x60;backups key&#x60;. This will be set to an array of backup objects, each of which will contain the size of the backup and the timestamp at which it was created.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.listDatabaseBackups(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse20014**](InlineResponse20014.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDatabaseClusters"></a>
# **listDatabaseClusters**
> InlineResponse20011 listDatabaseClusters(opts)

List All Database Clusters

To list all of the database clusters available on your account, send a GET request to &#x60;/v2/databases&#x60;. To limit the results to database clusters with a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag. For example, &#x60;/v2/databases?tag_name&#x3D;$TAG_NAME&#x60;. The result will be a JSON object with a &#x60;databases&#x60; key. This will be set to an array of database objects, each of which will contain the standard database attributes. The embedded &#x60;connection&#x60; and &#x60;private_connection&#x60; objects will contain the information needed to access the database cluster: The embedded &#x60;maintenance_window&#x60; object will contain information about any scheduled maintenance for the database cluster.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let opts = { 
  'tagName': "tagName_example" // String | Limits the results to database clusters with a specific tag.
};
apiInstance.listDatabaseClusters(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tagName** | **String**| Limits the results to database clusters with a specific tag. | [optional] 

### Return type

[**InlineResponse20011**](InlineResponse20011.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDatabaseFirewalls"></a>
# **listDatabaseFirewalls**
> InlineResponse20013 listDatabaseFirewalls(databaseClusterUuid)

List Firewall Rules (Trusted Sources) for a Database Cluster

To list all of a database cluster&#x27;s firewall rules (known as \&quot;trusted sources\&quot; in the control panel), send a GET request to &#x60;/v2/databases/$DATABASE_ID/firewall&#x60;. The result will be a JSON object with a &#x60;rules&#x60; key.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.listDatabaseFirewalls(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDatabases"></a>
# **listDatabases**
> InlineResponse20017 listDatabases(databaseClusterUuid)

List All Databases

To list all of the databases in a clusters, send a GET request to &#x60;/v2/databases/$DATABASE_ID/dbs&#x60;.  The result will be a JSON object with a &#x60;dbs&#x60; key. This will be set to an array of database objects, each of which will contain the standard database attributes.  Note: Database management is not supported for Redis clusters. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.listDatabases(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse20017**](InlineResponse20017.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listReplicas"></a>
# **listReplicas**
> InlineResponse20015 listReplicas(databaseClusterUuid)

List All Read-only Replicas

To list all of the read-only replicas associated with a database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/replicas&#x60;. **Note**: Read-only replicas are not supported for Redis clusters. The result will be a JSON object with a &#x60;replicas&#x60; key. This will be set to an array of database replica objects, each of which will contain the standard database replica attributes.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.listReplicas(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse20015**](InlineResponse20015.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listUsers"></a>
# **listUsers**
> InlineResponse20016 listUsers(databaseClusterUuid)

List all Database Users

To list all of the users for your database cluster, send a GET request to &#x60;/v2/databases/$DATABASE_ID/users&#x60;.  Note: User management is not supported for Redis clusters.  The result will be a JSON object with a &#x60;users&#x60; key. This will be set to an array of database user objects, each of which will contain the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.listUsers(databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**InlineResponse20016**](InlineResponse20016.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="resetAuth"></a>
# **resetAuth**
> InlineResponse2015 resetAuth(body, databaseClusterUuid, username)

Reset a Database User&#x27;s Password or Authentication Method

To reset the password for a database user, send a POST request to &#x60;/v2/databases/$DATABASE_ID/users/$USERNAME/reset_auth&#x60;.   For &#x60;mysql&#x60; databases, the authentication method can be specifying by including a key in the JSON body called &#x60;mysql_settings&#x60; with the &#x60;auth_plugin&#x60; value specified.  The response will be a JSON object with a &#x60;user&#x60; key. This will be set to an object containing the standard database user attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.UsernameResetAuthBody(); // UsernameResetAuthBody | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.
let username = "username_example"; // String | The name of the database user.

apiInstance.resetAuth(body, databaseClusterUuid, username, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UsernameResetAuthBody**](UsernameResetAuthBody.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 
 **username** | **String**| The name of the database user. | 

### Return type

[**InlineResponse2015**](InlineResponse2015.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateDatabaseCluster"></a>
# **updateDatabaseCluster**
> updateDatabaseCluster(body, databaseClusterUuid)

Migrate a Database Cluster to a New Region

To migrate a database cluster to a new region, send a &#x60;PUT&#x60; request to &#x60;/v2/databases/$DATABASE_ID/migrate&#x60;. The body of the request must specify a &#x60;region&#x60; attribute.  A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its &#x60;status&#x60; attribute will now be set to &#x60;migrating&#x60;. This will transition back to &#x60;online&#x60; when the migration has completed. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.DatabaseClusterUuidMigrateBody(); // DatabaseClusterUuidMigrateBody | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateDatabaseCluster(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DatabaseClusterUuidMigrateBody**](DatabaseClusterUuidMigrateBody.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateDatabaseClusterSize"></a>
# **updateDatabaseClusterSize**
> updateDatabaseClusterSize(body, databaseClusterUuid)

Resize a Database Cluster

To resize a database cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/resize&#x60;. The body of the request must specify both the size and num_nodes attributes. A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its status attribute will now be set to resizing. This will transition back to online when the resize operation has completed.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.DatabaseClusterResize(); // DatabaseClusterResize | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateDatabaseClusterSize(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DatabaseClusterResize**](DatabaseClusterResize.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateDatabaseFirewall"></a>
# **updateDatabaseFirewall**
> updateDatabaseFirewall(body, databaseClusterUuid)

Update Firewall Rules (Trusted Sources) for a Database

To update a database cluster&#x27;s firewall rules (known as \&quot;trusted sources\&quot; in the control panel), send a PUT request to &#x60;/v2/databases/$DATABASE_ID/firewall&#x60; specifying which resources should be able to open connections to the database. You may limit connections to specific Droplets, Kubernetes clusters, or IP addresses. When a tag is provided, any Droplet or Kubernetes node with that tag applied to it will have access. The firewall is limited to 100 rules (or trusted sources). When possible, we recommend [placing your databases into a VPC network](https://www.digitalocean.com/docs/networking/vpc/) to limit access to them instead of using a firewall. A successful

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.DatabaseClusterUuidFirewallBody(); // DatabaseClusterUuidFirewallBody | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateDatabaseFirewall(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DatabaseClusterUuidFirewallBody**](DatabaseClusterUuidFirewallBody.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateEvictionPolicy"></a>
# **updateEvictionPolicy**
> updateEvictionPolicy(body, databaseClusterUuid)

Configure the Eviction Policy for a Redis Cluster

To configure an eviction policy for an existing Redis cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/eviction_policy&#x60; specifying the desired policy.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.EvictionPolicy(); // EvictionPolicy | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateEvictionPolicy(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**EvictionPolicy**](EvictionPolicy.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateMaintenanceWindow"></a>
# **updateMaintenanceWindow**
> updateMaintenanceWindow(body, databaseClusterUuid)

Configure a Database Cluster&#x27;s Maintenance Window

To configure the window when automatic maintenance should be performed for a database cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/maintenance&#x60;. A successful request will receive a 204 No Content status code with no body in response.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.DatabaseMaintenanceWindow(); // DatabaseMaintenanceWindow | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateMaintenanceWindow(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DatabaseMaintenanceWindow**](DatabaseMaintenanceWindow.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateOnlineMigration"></a>
# **updateOnlineMigration**
> OnlineMigration updateOnlineMigration(body, databaseClusterUuid)

Start an Online Migration

To start an online migration, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/online-migration&#x60; endpoint. Migrating a cluster establishes a connection with an existing cluster and replicates its contents to the target cluster. Online migration is only available for PostgreSQL and Redis clusters.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.SourceDatabase(); // SourceDatabase | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateOnlineMigration(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SourceDatabase**](SourceDatabase.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

[**OnlineMigration**](OnlineMigration.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateSqlMode"></a>
# **updateSqlMode**
> updateSqlMode(body, databaseClusterUuid)

Update SQL Mode for a Cluster

To configure the SQL modes for an existing MySQL cluster, send a PUT request to &#x60;/v2/databases/$DATABASE_ID/sql_mode&#x60; specifying the desired modes. See the official MySQL 8 documentation for a [full list of supported SQL modes](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-full). A successful request will receive a 204 No Content status code with no body in response.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.DatabasesApi();
let body = new DigitalOceanApi.SqlMode(); // SqlMode | 
let databaseClusterUuid = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique identifier for a database cluster.

apiInstance.updateSqlMode(body, databaseClusterUuid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SqlMode**](SqlMode.md)|  | 
 **databaseClusterUuid** | [**String**](.md)| A unique identifier for a database cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


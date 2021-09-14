/*
 * DigitalOcean API
 * # Introduction  The DigitalOcean API allows you to manage Droplets and resources within the DigitalOcean cloud in a simple, programmatic way using conventional HTTP requests.  All of the functionality that you are familiar with in the DigitalOcean control panel is also available through the API, allowing you to script the complex actions that your situation requires.  The API documentation will start with a general overview about the design and technology that has been implemented, followed by reference information about specific endpoints.  ## Requests  Any tool that is fluent in HTTP can communicate with the API simply by requesting the correct URI. Requests should be made using the HTTPS protocol so that traffic is encrypted. The interface responds to different methods depending on the action required.  |Method|Usage| |--- |--- | |GET|For simple retrieval of information about your account, Droplets, or environment, you should use the GET method.  The information you request will be returned to you as a JSON object. The attributes defined by the JSON object can be used to form additional requests.  Any request using the GET method is read-only and will not affect any of the objects you are querying.| |DELETE|To destroy a resource and remove it from your account and environment, the DELETE method should be used.  This will remove the specified object if it is found.  If it is not found, the operation will return a response indicating that the object was not found. This idempotency means that you do not have to check for a resource's availability prior to issuing a delete command, the final state will be the same regardless of its existence.| |PUT|To update the information about a resource in your account, the PUT method is available. Like the DELETE Method, the PUT method is idempotent.  It sets the state of the target using the provided values, regardless of their current values. Requests using the PUT method do not need to check the current attributes of the object.| |PATCH|Some resources support partial modification. In these cases, the PATCH method is available. Unlike PUT which generally requires a complete representation of a resource, a PATCH request is is a set of instructions on how to modify a resource updating only specific attributes.| |POST|To create a new object, your request should specify the POST method. The POST request includes all of the attributes necessary to create a new object.  When you wish to create a new object, send a POST request to the target endpoint.| |HEAD|Finally, to retrieve metadata information, you should use the HEAD method to get the headers.  This returns only the header of what would be returned with an associated GET request. Response headers contain some useful information about your API access and the results that are available for your request. For instance, the headers contain your current rate-limit value and the amount of time available until the limit resets. It also contains metrics about the total number of objects found, pagination information, and the total content length.|   ## HTTP Statuses  Along with the HTTP methods that the API responds to, it will also return standard HTTP statuses, including error codes.  In the event of a problem, the status will contain the error code, while the body of the response will usually contain additional information about the problem that was encountered.  In general, if the status returned is in the 200 range, it indicates that the request was fulfilled successfully and that no error was encountered.  Return codes in the 400 range typically indicate that there was an issue with the request that was sent. Among other things, this could mean that you did not authenticate correctly, that you are requesting an action that you do not have authorization for, that the object you are requesting does not exist, or that your request is malformed.  If you receive a status in the 500 range, this generally indicates a server-side problem. This means that we are having an issue on our end and cannot fulfill your request currently.  400 and 500 level error responses will include a JSON object in their body, including the following attributes:  |Name|Type|Description| |--- |--- |--- | |id|string|A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be \"not_found.\"| |message|string|A message providing additional information about the error, including details to help resolve it when possible.| |request_id|string|Optionally, some endpoints may include a request ID that should be provided when reporting bugs or opening support tickets to help identify the issue.|  ### Example Error Response  ```     HTTP/1.1 403 Forbidden     {       \"id\":       \"forbidden\",       \"message\":  \"You do not have access for the attempted action.\"     } ```  ## Responses  When a request is successful, a response body will typically be sent back in the form of a JSON object. An exception to this is when a DELETE request is processed, which will result in a successful HTTP 204 status and an empty response body.  Inside of this JSON object, the resource root that was the target of the request will be set as the key. This will be the singular form of the word if the request operated on a single object, and the plural form of the word if a collection was processed.  For example, if you send a GET request to `/v2/droplets/$DROPLET_ID` you will get back an object with a key called \"`droplet`\". However, if you send the GET request to the general collection at `/v2/droplets`, you will get back an object with a key called \"`droplets`\".  The value of these keys will generally be a JSON object for a request on a single object and an array of objects for a request on a collection of objects.  ### Response for a Single Object  ```     {         \"droplet\": {             \"name\": \"example.com\"             . . .         }     } ```  ### Response for an Object Collection  ```     {         \"droplets\": [             {                 \"name\": \"example.com\"                 . . .             },             {                 \"name\": \"second.com\"                 . . .             }         ]     } ```  ## Meta  In addition to the main resource root, the response may also contain a `meta` object. This object contains information about the response itself.  The `meta` object contains a `total` key that is set to the total number of objects returned by the request. This has implications on the `links` object and pagination.  The `meta` object will only be displayed when it has a value. Currently, the `meta` object will have a value when a request is made on a collection (like `droplets` or `domains`).   ### Sample Meta Object  ```     {         . . .         \"meta\": {             \"total\": 43         }         . . .     } ```  ## Links & Pagination  The `links` object is returned as part of the response body when pagination is enabled. By default, 20 objects are returned per page. If the response contains 20 objects or fewer, no `links` object will be returned. If the response contains more than 20 objects, the first 20 will be returned along with the `links` object.  You can request a different pagination limit or force pagination by appending `?per_page=` to the request with the number of items you would like per page. For instance, to show only two results per page, you could add `?per_page=2` to the end of your query. The maximum number of results per page is 200.  The `links` object contains a `pages` object. The `pages` object, in turn, contains keys indicating the relationship of additional pages. The values of these are the URLs of the associated pages. The keys will be one of the following:  *   **first**: The URI of the first page of results. *   **prev**: The URI of the previous sequential page of results. *   **next**: The URI of the next sequential page of results. *   **last**: The URI of the last page of results.  The `pages` object will only include the links that make sense. So for the first page of results, no `first` or `prev` links will ever be set. This convention holds true in other situations where a link would not make sense.  ### Sample Links Object  ```     {         . . .         \"links\": {             \"pages\": {                 \"last\": \"https://api.digitalocean.com/v2/images?page=2\",                 \"next\": \"https://api.digitalocean.com/v2/images?page=2\"             }         }         . . .     } ```  ## Rate Limit  Requests through the API are rate limited per OAuth token. Current rate limits:  *   5,000 requests per hour *   250 requests per minute (5% of the hourly total)  Once you exceed either limit, you will be rate limited until the next cycle starts. Space out any requests that you would otherwise issue in bursts for the best results.  The rate limiting information is contained within the response headers of each request. The relevant headers are:  *   **RateLimit-Limit**: The number of requests that can be made per hour. *   **RateLimit-Remaining**: The number of requests that remain before you hit your request limit. See the information below for how the request limits expire. *   **RateLimit-Reset**: This represents the time when the oldest request will expire. The value is given in [Unix epoch time](http://en.wikipedia.org/wiki/Unix_time). See below for more information about how request limits expire.  As long as the `RateLimit-Remaining` count is above zero, you will be able to make additional requests.  The way that a request expires and is removed from the current limit count is important to understand. Rather than counting all of the requests for an hour and resetting the `RateLimit-Remaining` value at the end of the hour, each request instead has its own timer.  This means that each request contributes toward the `RateLimit-Remaining` count for one complete hour after the request is made. When that request's timer runs out, it is no longer counted towards the request limit.  This has implications on the meaning of the `RateLimit-Reset` header as well. Because the entire rate limit is not reset at one time, the value of this header is set to the time when the _oldest_ request will expire.  Keep this in mind if you see your `RateLimit-Reset` value change, but not move an entire hour into the future.  If the `RateLimit-Remaining` reaches zero, subsequent requests will receive a 429 error code until the request reset has been reached. You can see the format of the response in the examples.  **Note:** The following endpoints have special rate limit requirements that are independent of the limits defined above.  *   Only 12 `POST` requests to the `/v2/floating_ips` endpoint to create Floating IPs can be made per 60 seconds. *   Only 10 `GET` requests to the `/v2/account/keys` endpoint to list SSH keys can be made per 60 seconds.  ### Sample Rate Limit Headers  ```     . . .     RateLimit-Limit: 1200     RateLimit-Remaining: 1193     RateLimit-Reset: 1402425459     . . . ```  ### Sample Rate Exceeded Response  ```     429 Too Many Requests     {             id: \"too_many_requests\",             message: \"API Rate limit exceeded.\"     } ```  ## Curl Examples  Throughout this document, some example API requests will be given using the `curl` command. This will allow us to demonstrate the various endpoints in a simple, textual format.  The names of account-specific references (like Droplet IDs, for instance) will be represented by variables. For instance, a Droplet ID may be represented by a variable called `$DROPLET_ID`. You can set the associated variables in your environment if you wish to use the examples without modification.  The first variable that you should set to get started is your OAuth authorization token. The next section will go over the details of this, but you can set an environmental variable for it now.  Generate a token by going to the [Apps & API](https://cloud.digitalocean.com/settings/applications) section of the DigitalOcean control panel. Use an existing token if you have saved one, or generate a new token with the \"Generate new token\" button. Copy the generated token and use it to set and export the TOKEN variable in your environment as the example shows.  You may also wish to set some other variables now or as you go along. For example, you may wish to set the `DROPLET_ID` variable to one of your Droplet IDs since this will be used frequently in the API.  If you are following along, make sure you use a Droplet ID that you control so that your commands will execute correctly.  If you need access to the headers of a response through `curl`, you can pass the `-i` flag to display the header information along with the body. If you are only interested in the header, you can instead pass the `-I` flag, which will exclude the response body entirely.  ### Set and Export your OAuth Token  ``` export DIGITALOCEAN_TOKEN=your_token_here ```  ### Set and Export a Variable  ``` export DROPLET_ID=1111111 ```  ## Parameters  There are two different ways to pass parameters in a request with the API.  When passing parameters to create or update an object, parameters should be passed as a JSON object containing the appropriate attribute names and values as key-value pairs. When you use this format, you should specify that you are sending a JSON object in the header. This is done by setting the `Content-Type` header to `application/json`. This ensures that your request is interpreted correctly.  When passing parameters to filter a response on GET requests, parameters can be passed using standard query attributes. In this case, the parameters would be embedded into the URI itself by appending a `?` to the end of the URI and then setting each attribute with an equal sign. Attributes can be separated with a `&`. Tools like `curl` can create the appropriate URI when given parameters and values; this can also be done using the `-F` flag and then passing the key and value as an argument. The argument should take the form of a quoted string with the attribute being set to a value with an equal sign.  ### Pass Parameters as a JSON Object  ```     curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\         -H \"Content-Type: application/json\" \\         -d '{\"name\": \"example.com\", \"ip_address\": \"127.0.0.1\"}' \\         -X POST \"https://api.digitalocean.com/v2/domains\" ```  ### Pass Filter Parameters as a Query String  ```      curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\          -X GET \\          \"https://api.digitalocean.com/v2/images?private=true\" ```  ## Cross Origin Resource Sharing  In order to make requests to the API from other domains, the API implements Cross Origin Resource Sharing (CORS) support.  CORS support is generally used to create AJAX requests outside of the domain that the request originated from. This is necessary to implement projects like control panels utilizing the API. This tells the browser that it can send requests to an outside domain.  The procedure that the browser initiates in order to perform these actions (other than GET requests) begins by sending a \"preflight\" request. This sets the `Origin` header and uses the `OPTIONS` method. The server will reply back with the methods it allows and some of the limits it imposes. The client then sends the actual request if it falls within the allowed constraints.  This process is usually done in the background by the browser, but you can use curl to emulate this process using the example provided. The headers that will be set to show the constraints are:  *   **Access-Control-Allow-Origin**: This is the domain that is sent by the client or browser as the origin of the request. It is set through an `Origin` header. *   **Access-Control-Allow-Methods**: This specifies the allowed options for requests from that domain. This will generally be all available methods. *   **Access-Control-Expose-Headers**: This will contain the headers that will be available to requests from the origin domain. *   **Access-Control-Max-Age**: This is the length of time that the access is considered valid. After this expires, a new preflight should be sent. *   **Access-Control-Allow-Credentials**: This will be set to `true`. It basically allows you to send your OAuth token for authentication.  You should not need to be concerned with the details of these headers, because the browser will typically do all of the work for you. 
 *
 * OpenAPI spec version: 2.0
 * Contact: api-engineering@digitalocean.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.27
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from "../ApiClient";
import {ConnectionPool} from '../model/ConnectionPool';
import {ConnectionPools} from '../model/ConnectionPools';
import {Database} from '../model/Database';
import {DatabaseClusterResize} from '../model/DatabaseClusterResize';
import {DatabaseClusterUuidFirewallBody} from '../model/DatabaseClusterUuidFirewallBody';
import {DatabaseClusterUuidMigrateBody} from '../model/DatabaseClusterUuidMigrateBody';
import {DatabaseClusterUuidReplicasBody} from '../model/DatabaseClusterUuidReplicasBody';
import {DatabaseMaintenanceWindow} from '../model/DatabaseMaintenanceWindow';
import {DatabaseUser} from '../model/DatabaseUser';
import {Error} from '../model/Error';
import {EvictionPolicy} from '../model/EvictionPolicy';
import {InlineResponse20011} from '../model/InlineResponse20011';
import {InlineResponse20012} from '../model/InlineResponse20012';
import {InlineResponse20013} from '../model/InlineResponse20013';
import {InlineResponse20014} from '../model/InlineResponse20014';
import {InlineResponse20015} from '../model/InlineResponse20015';
import {InlineResponse20016} from '../model/InlineResponse20016';
import {InlineResponse20017} from '../model/InlineResponse20017';
import {InlineResponse2013} from '../model/InlineResponse2013';
import {InlineResponse2014} from '../model/InlineResponse2014';
import {InlineResponse2015} from '../model/InlineResponse2015';
import {InlineResponse2016} from '../model/InlineResponse2016';
import {InlineResponse2017} from '../model/InlineResponse2017';
import {OnlineMigration} from '../model/OnlineMigration';
import {SourceDatabase} from '../model/SourceDatabase';
import {SqlMode} from '../model/SqlMode';
import {UsernameResetAuthBody} from '../model/UsernameResetAuthBody';
import {V2DatabasesBody} from '../model/V2DatabasesBody';

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
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

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
    addConnectionPool(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addConnectionPool");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling addConnectionPool");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2017;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/pools', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    addDatabase(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addDatabase");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling addDatabase");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2016;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/dbs', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    addUser(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addUser");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling addUser");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2015;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/users', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    createDatabaseCluster(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createDatabaseCluster");
      }

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2013;

      return this.apiClient.callApi(
        '/v2/databases', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    createReplica(databaseClusterUuid, opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling createReplica");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2014;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/replicas', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    deleteConnectionPool(databaseClusterUuid, poolName, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling deleteConnectionPool");
      }
      // verify the required parameter 'poolName' is set
      if (poolName === undefined || poolName === null) {
        throw new Error("Missing the required parameter 'poolName' when calling deleteConnectionPool");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'pool_name': poolName
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/pools/{pool_name}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    deleteDatabase(databaseClusterUuid, databaseName, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling deleteDatabase");
      }
      // verify the required parameter 'databaseName' is set
      if (databaseName === undefined || databaseName === null) {
        throw new Error("Missing the required parameter 'databaseName' when calling deleteDatabase");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'database_name': databaseName
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/dbs/{database_name}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    deleteOnlineMigration(databaseClusterUuid, migrationId, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling deleteOnlineMigration");
      }
      // verify the required parameter 'migrationId' is set
      if (migrationId === undefined || migrationId === null) {
        throw new Error("Missing the required parameter 'migrationId' when calling deleteOnlineMigration");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'migration_id': migrationId
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/online-migration/{migration_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    deleteUser(databaseClusterUuid, username, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling deleteUser");
      }
      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling deleteUser");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'username': username
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/users/{username}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    destroyCluster(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling destroyCluster");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    destroyReplica(databaseClusterUuid, replicaName, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling destroyReplica");
      }
      // verify the required parameter 'replicaName' is set
      if (replicaName === undefined || replicaName === null) {
        throw new Error("Missing the required parameter 'replicaName' when calling destroyReplica");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'replica_name': replicaName
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/replicas/{replica_name}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getCa(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getCa");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20012;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/ca', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getConnectionPool(databaseClusterUuid, poolName, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getConnectionPool");
      }
      // verify the required parameter 'poolName' is set
      if (poolName === undefined || poolName === null) {
        throw new Error("Missing the required parameter 'poolName' when calling getConnectionPool");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'pool_name': poolName
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2017;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/pools/{pool_name}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getDatabase(databaseClusterUuid, databaseName, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getDatabase");
      }
      // verify the required parameter 'databaseName' is set
      if (databaseName === undefined || databaseName === null) {
        throw new Error("Missing the required parameter 'databaseName' when calling getDatabase");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'database_name': databaseName
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2016;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/dbs/{database_name}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getDatabaseCluster(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getDatabaseCluster");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2013;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getEvictionPolicy(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getEvictionPolicy");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = EvictionPolicy;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/eviction_policy', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getMigrationStatus(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getMigrationStatus");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = OnlineMigration;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/online-migration', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getReplica(databaseClusterUuid, replicaName, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getReplica");
      }
      // verify the required parameter 'replicaName' is set
      if (replicaName === undefined || replicaName === null) {
        throw new Error("Missing the required parameter 'replicaName' when calling getReplica");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'replica_name': replicaName
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2014;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/replicas/{replica_name}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getSqlMode(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getSqlMode");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = SqlMode;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/sql_mode', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    getUser(databaseClusterUuid, username, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling getUser");
      }
      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling getUser");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'username': username
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2015;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/users/{username}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listConnectionPools(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling listConnectionPools");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ConnectionPools;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/pools', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listDatabaseBackups(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling listDatabaseBackups");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20014;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/backups', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listDatabaseClusters(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'tag_name': opts['tagName']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20011;

      return this.apiClient.callApi(
        '/v2/databases', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listDatabaseFirewalls(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling listDatabaseFirewalls");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20013;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/firewall', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listDatabases(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling listDatabases");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20017;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/dbs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listReplicas(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling listReplicas");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20015;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/replicas', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    listUsers(databaseClusterUuid, callback) {
      
      let postBody = null;
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling listUsers");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20016;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/users', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    resetAuth(body, databaseClusterUuid, username, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling resetAuth");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling resetAuth");
      }
      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling resetAuth");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid,'username': username
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2015;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateDatabaseCluster(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateDatabaseCluster");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateDatabaseCluster");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/migrate', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateDatabaseClusterSize(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateDatabaseClusterSize");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateDatabaseClusterSize");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/resize', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateDatabaseFirewall(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateDatabaseFirewall");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateDatabaseFirewall");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/firewall', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateEvictionPolicy(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateEvictionPolicy");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateEvictionPolicy");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/eviction_policy', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateMaintenanceWindow(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateMaintenanceWindow");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateMaintenanceWindow");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/maintenance', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateOnlineMigration(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateOnlineMigration");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateOnlineMigration");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = OnlineMigration;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/online-migration', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
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
    updateSqlMode(body, databaseClusterUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateSqlMode");
      }
      // verify the required parameter 'databaseClusterUuid' is set
      if (databaseClusterUuid === undefined || databaseClusterUuid === null) {
        throw new Error("Missing the required parameter 'databaseClusterUuid' when calling updateSqlMode");
      }

      let pathParams = {
        'database_cluster_uuid': databaseClusterUuid
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/databases/{database_cluster_uuid}/sql_mode', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}
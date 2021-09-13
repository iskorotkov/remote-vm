/* tslint:disable */
/* eslint-disable */
/**
 * DigitalOcean API
 * # Introduction  The DigitalOcean API allows you to manage Droplets and resources within the DigitalOcean cloud in a simple, programmatic way using conventional HTTP requests.  All of the functionality that you are familiar with in the DigitalOcean control panel is also available through the API, allowing you to script the complex actions that your situation requires.  The API documentation will start with a general overview about the design and technology that has been implemented, followed by reference information about specific endpoints.  ## Requests  Any tool that is fluent in HTTP can communicate with the API simply by requesting the correct URI. Requests should be made using the HTTPS protocol so that traffic is encrypted. The interface responds to different methods depending on the action required.  |Method|Usage| |--- |--- | |GET|For simple retrieval of information about your account, Droplets, or environment, you should use the GET method.  The information you request will be returned to you as a JSON object. The attributes defined by the JSON object can be used to form additional requests.  Any request using the GET method is read-only and will not affect any of the objects you are querying.| |DELETE|To destroy a resource and remove it from your account and environment, the DELETE method should be used.  This will remove the specified object if it is found.  If it is not found, the operation will return a response indicating that the object was not found. This idempotency means that you do not have to check for a resource's availability prior to issuing a delete command, the final state will be the same regardless of its existence.| |PUT|To update the information about a resource in your account, the PUT method is available. Like the DELETE Method, the PUT method is idempotent.  It sets the state of the target using the provided values, regardless of their current values. Requests using the PUT method do not need to check the current attributes of the object.| |PATCH|Some resources support partial modification. In these cases, the PATCH method is available. Unlike PUT which generally requires a complete representation of a resource, a PATCH request is is a set of instructions on how to modify a resource updating only specific attributes.| |POST|To create a new object, your request should specify the POST method. The POST request includes all of the attributes necessary to create a new object.  When you wish to create a new object, send a POST request to the target endpoint.| |HEAD|Finally, to retrieve metadata information, you should use the HEAD method to get the headers.  This returns only the header of what would be returned with an associated GET request. Response headers contain some useful information about your API access and the results that are available for your request. For instance, the headers contain your current rate-limit value and the amount of time available until the limit resets. It also contains metrics about the total number of objects found, pagination information, and the total content length.|   ## HTTP Statuses  Along with the HTTP methods that the API responds to, it will also return standard HTTP statuses, including error codes.  In the event of a problem, the status will contain the error code, while the body of the response will usually contain additional information about the problem that was encountered.  In general, if the status returned is in the 200 range, it indicates that the request was fulfilled successfully and that no error was encountered.  Return codes in the 400 range typically indicate that there was an issue with the request that was sent. Among other things, this could mean that you did not authenticate correctly, that you are requesting an action that you do not have authorization for, that the object you are requesting does not exist, or that your request is malformed.  If you receive a status in the 500 range, this generally indicates a server-side problem. This means that we are having an issue on our end and cannot fulfill your request currently.  400 and 500 level error responses will include a JSON object in their body, including the following attributes:  |Name|Type|Description| |--- |--- |--- | |id|string|A short identifier corresponding to the HTTP status code returned. For example, the ID for a response returning a 404 status code would be \"not_found.\"| |message|string|A message providing additional information about the error, including details to help resolve it when possible.| |request_id|string|Optionally, some endpoints may include a request ID that should be provided when reporting bugs or opening support tickets to help identify the issue.|  ### Example Error Response  ```     HTTP/1.1 403 Forbidden     {       \"id\":       \"forbidden\",       \"message\":  \"You do not have access for the attempted action.\"     } ```  ## Responses  When a request is successful, a response body will typically be sent back in the form of a JSON object. An exception to this is when a DELETE request is processed, which will result in a successful HTTP 204 status and an empty response body.  Inside of this JSON object, the resource root that was the target of the request will be set as the key. This will be the singular form of the word if the request operated on a single object, and the plural form of the word if a collection was processed.  For example, if you send a GET request to `/v2/droplets/$DROPLET_ID` you will get back an object with a key called \"`droplet`\". However, if you send the GET request to the general collection at `/v2/droplets`, you will get back an object with a key called \"`droplets`\".  The value of these keys will generally be a JSON object for a request on a single object and an array of objects for a request on a collection of objects.  ### Response for a Single Object  ```     {         \"droplet\": {             \"name\": \"example.com\"             . . .         }     } ```  ### Response for an Object Collection  ```     {         \"droplets\": [             {                 \"name\": \"example.com\"                 . . .             },             {                 \"name\": \"second.com\"                 . . .             }         ]     } ```  ## Meta  In addition to the main resource root, the response may also contain a `meta` object. This object contains information about the response itself.  The `meta` object contains a `total` key that is set to the total number of objects returned by the request. This has implications on the `links` object and pagination.  The `meta` object will only be displayed when it has a value. Currently, the `meta` object will have a value when a request is made on a collection (like `droplets` or `domains`).   ### Sample Meta Object  ```     {         . . .         \"meta\": {             \"total\": 43         }         . . .     } ```  ## Links & Pagination  The `links` object is returned as part of the response body when pagination is enabled. By default, 20 objects are returned per page. If the response contains 20 objects or fewer, no `links` object will be returned. If the response contains more than 20 objects, the first 20 will be returned along with the `links` object.  You can request a different pagination limit or force pagination by appending `?per_page=` to the request with the number of items you would like per page. For instance, to show only two results per page, you could add `?per_page=2` to the end of your query. The maximum number of results per page is 200.  The `links` object contains a `pages` object. The `pages` object, in turn, contains keys indicating the relationship of additional pages. The values of these are the URLs of the associated pages. The keys will be one of the following:  *   **first**: The URI of the first page of results. *   **prev**: The URI of the previous sequential page of results. *   **next**: The URI of the next sequential page of results. *   **last**: The URI of the last page of results.  The `pages` object will only include the links that make sense. So for the first page of results, no `first` or `prev` links will ever be set. This convention holds true in other situations where a link would not make sense.  ### Sample Links Object  ```     {         . . .         \"links\": {             \"pages\": {                 \"last\": \"https://api.digitalocean.com/v2/images?page=2\",                 \"next\": \"https://api.digitalocean.com/v2/images?page=2\"             }         }         . . .     } ```  ## Rate Limit  Requests through the API are rate limited per OAuth token. Current rate limits:  *   5,000 requests per hour *   250 requests per minute (5% of the hourly total)  Once you exceed either limit, you will be rate limited until the next cycle starts. Space out any requests that you would otherwise issue in bursts for the best results.  The rate limiting information is contained within the response headers of each request. The relevant headers are:  *   **RateLimit-Limit**: The number of requests that can be made per hour. *   **RateLimit-Remaining**: The number of requests that remain before you hit your request limit. See the information below for how the request limits expire. *   **RateLimit-Reset**: This represents the time when the oldest request will expire. The value is given in [Unix epoch time](http://en.wikipedia.org/wiki/Unix_time). See below for more information about how request limits expire.  As long as the `RateLimit-Remaining` count is above zero, you will be able to make additional requests.  The way that a request expires and is removed from the current limit count is important to understand. Rather than counting all of the requests for an hour and resetting the `RateLimit-Remaining` value at the end of the hour, each request instead has its own timer.  This means that each request contributes toward the `RateLimit-Remaining` count for one complete hour after the request is made. When that request's timer runs out, it is no longer counted towards the request limit.  This has implications on the meaning of the `RateLimit-Reset` header as well. Because the entire rate limit is not reset at one time, the value of this header is set to the time when the _oldest_ request will expire.  Keep this in mind if you see your `RateLimit-Reset` value change, but not move an entire hour into the future.  If the `RateLimit-Remaining` reaches zero, subsequent requests will receive a 429 error code until the request reset has been reached. You can see the format of the response in the examples.  **Note:** The following endpoints have special rate limit requirements that are independent of the limits defined above.  *   Only 12 `POST` requests to the `/v2/floating_ips` endpoint to create Floating IPs can be made per 60 seconds. *   Only 10 `GET` requests to the `/v2/account/keys` endpoint to list SSH keys can be made per 60 seconds.  ### Sample Rate Limit Headers  ```     . . .     RateLimit-Limit: 1200     RateLimit-Remaining: 1193     RateLimit-Reset: 1402425459     . . . ```  ### Sample Rate Exceeded Response  ```     429 Too Many Requests     {             id: \"too_many_requests\",             message: \"API Rate limit exceeded.\"     } ```  ## Curl Examples  Throughout this document, some example API requests will be given using the `curl` command. This will allow us to demonstrate the various endpoints in a simple, textual format.  The names of account-specific references (like Droplet IDs, for instance) will be represented by variables. For instance, a Droplet ID may be represented by a variable called `$DROPLET_ID`. You can set the associated variables in your environment if you wish to use the examples without modification.  The first variable that you should set to get started is your OAuth authorization token. The next section will go over the details of this, but you can set an environmental variable for it now.  Generate a token by going to the [Apps & API](https://cloud.digitalocean.com/settings/applications) section of the DigitalOcean control panel. Use an existing token if you have saved one, or generate a new token with the \"Generate new token\" button. Copy the generated token and use it to set and export the TOKEN variable in your environment as the example shows.  You may also wish to set some other variables now or as you go along. For example, you may wish to set the `DROPLET_ID` variable to one of your Droplet IDs since this will be used frequently in the API.  If you are following along, make sure you use a Droplet ID that you control so that your commands will execute correctly.  If you need access to the headers of a response through `curl`, you can pass the `-i` flag to display the header information along with the body. If you are only interested in the header, you can instead pass the `-I` flag, which will exclude the response body entirely.  ### Set and Export your OAuth Token  ``` export DIGITALOCEAN_TOKEN=your_token_here ```  ### Set and Export a Variable  ``` export DROPLET_ID=1111111 ```  ## Parameters  There are two different ways to pass parameters in a request with the API.  When passing parameters to create or update an object, parameters should be passed as a JSON object containing the appropriate attribute names and values as key-value pairs. When you use this format, you should specify that you are sending a JSON object in the header. This is done by setting the `Content-Type` header to `application/json`. This ensures that your request is interpreted correctly.  When passing parameters to filter a response on GET requests, parameters can be passed using standard query attributes. In this case, the parameters would be embedded into the URI itself by appending a `?` to the end of the URI and then setting each attribute with an equal sign. Attributes can be separated with a `&`. Tools like `curl` can create the appropriate URI when given parameters and values; this can also be done using the `-F` flag and then passing the key and value as an argument. The argument should take the form of a quoted string with the attribute being set to a value with an equal sign.  ### Pass Parameters as a JSON Object  ```     curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\         -H \"Content-Type: application/json\" \\         -d '{\"name\": \"example.com\", \"ip_address\": \"127.0.0.1\"}' \\         -X POST \"https://api.digitalocean.com/v2/domains\" ```  ### Pass Filter Parameters as a Query String  ```      curl -H \"Authorization: Bearer $DIGITALOCEAN_TOKEN\" \\          -X GET \\          \"https://api.digitalocean.com/v2/images?private=true\" ```  ## Cross Origin Resource Sharing  In order to make requests to the API from other domains, the API implements Cross Origin Resource Sharing (CORS) support.  CORS support is generally used to create AJAX requests outside of the domain that the request originated from. This is necessary to implement projects like control panels utilizing the API. This tells the browser that it can send requests to an outside domain.  The procedure that the browser initiates in order to perform these actions (other than GET requests) begins by sending a \"preflight\" request. This sets the `Origin` header and uses the `OPTIONS` method. The server will reply back with the methods it allows and some of the limits it imposes. The client then sends the actual request if it falls within the allowed constraints.  This process is usually done in the background by the browser, but you can use curl to emulate this process using the example provided. The headers that will be set to show the constraints are:  *   **Access-Control-Allow-Origin**: This is the domain that is sent by the client or browser as the origin of the request. It is set through an `Origin` header. *   **Access-Control-Allow-Methods**: This specifies the allowed options for requests from that domain. This will generally be all available methods. *   **Access-Control-Expose-Headers**: This will contain the headers that will be available to requests from the origin domain. *   **Access-Control-Max-Age**: This is the length of time that the access is considered valid. After this expires, a new preflight should be sent. *   **Access-Control-Allow-Credentials**: This will be set to `true`. It basically allows you to send your OAuth token for authentication.  You should not need to be concerned with the details of these headers, because the browser will typically do all of the work for you. 
 *
 * OpenAPI spec version: 2.0
 * Contact: api-engineering@digitalocean.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ConnectionPool } from '../models';
import { ConnectionPools } from '../models';
import { Database } from '../models';
import { DatabaseClusterResize } from '../models';
import { DatabaseClusterUuidFirewallBody } from '../models';
import { DatabaseClusterUuidMigrateBody } from '../models';
import { DatabaseClusterUuidReplicasBody } from '../models';
import { DatabaseMaintenanceWindow } from '../models';
import { DatabaseUser } from '../models';
import { EvictionPolicy } from '../models';
import { InlineResponse20011 } from '../models';
import { InlineResponse20012 } from '../models';
import { InlineResponse20013 } from '../models';
import { InlineResponse20014 } from '../models';
import { InlineResponse20015 } from '../models';
import { InlineResponse20016 } from '../models';
import { InlineResponse20017 } from '../models';
import { InlineResponse2013 } from '../models';
import { InlineResponse2014 } from '../models';
import { InlineResponse2015 } from '../models';
import { InlineResponse2016 } from '../models';
import { InlineResponse2017 } from '../models';
import { OnlineMigration } from '../models';
import { SourceDatabase } from '../models';
import { SqlMode } from '../models';
import { UsernameResetAuthBody } from '../models';
import { V2DatabasesBody } from '../models';
/**
 * DatabasesApi - axios parameter creator
 * @export
 */
export const DatabasesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * For PostgreSQL database clusters, connection pools can be used to allow a database to share its idle connections. The popular PostgreSQL connection pooling utility PgBouncer is used to provide this service. [See here for more information](https://www.digitalocean.com/docs/databases/postgresql/how-to/manage-connection-pools/) about how and why to use PgBouncer connection pooling including details about the available transaction modes.  To add a new connection pool to a PostgreSQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/pools` specifying a name for the pool, the user to connect with, the database to connect to, as well as its desired size and transaction mode. 
         * @summary Add a New Connection Pool (PostgreSQL)
         * @param {ConnectionPool} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addConnectionPool: async (body: ConnectionPool, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addConnectionPool.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling addConnectionPool.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/pools`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To add a new database to an existing cluster, send a POST request to `/v2/databases/$DATABASE_ID/dbs`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a key called `db`. The value of this will be an object that contains the standard attributes associated with a database. 
         * @summary Add a New Database
         * @param {Database} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addDatabase: async (body: Database, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addDatabase.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling addDatabase.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/dbs`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To add a new database user, send a POST request to `/v2/databases/$DATABASE_ID/users` with the desired username.  Note: User management is not supported for Redis clusters.  When adding a user to a MySQL cluster, additional options can be configured in the `mysql_settings` object.  The response will be a JSON object with a key called `user`. The value of this will be an object that contains the standard attributes associated with a database user including its randomly generated password. 
         * @summary Add a Database User
         * @param {DatabaseUser} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser: async (body: DatabaseUser, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addUser.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling addUser.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/users`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To create a database cluster, send a POST request to `/v2/databases`. The response will be a JSON object with a key called `database`. The value of this will be an object that contains the standard attributes associated with a database cluster. The initial value of the database cluster's `status` attribute will be `creating`. When the cluster is ready to receive traffic, this will transition to `online`. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster. DigitalOcean managed PostgreSQL and MySQL database clusters take automated daily backups. To create a new database cluster based on a backup of an exising cluster, send a POST request to `/v2/databases`. In addition to the standard database cluster attributes, the JSON body must include a key named `backup_restore` with the name of the original database cluster and the timestamp of the backup to be restored. Note: Backups are not supported for Redis clusters.
         * @summary Create a New Database Cluster
         * @param {V2DatabasesBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDatabaseCluster: async (body: V2DatabasesBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createDatabaseCluster.');
            }
            const localVarPath = `/v2/databases`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To create a read-only replica for a PostgreSQL or MySQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/replicas` specifying the name it should be given, the size of the node to be used, and the region where it will be located. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a key called `replica`. The value of this will be an object that contains the standard attributes associated with a database replica. The initial value of the read-only replica's `status` attribute will be `forking`. When the replica is ready to receive traffic, this will transition to `active`.
         * @summary Create a Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {DatabaseClusterUuidReplicasBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReplica: async (databaseClusterUuid: string, body?: DatabaseClusterUuidReplicasBody, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling createReplica.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/replicas`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To delete a specific connection pool for a PostgreSQL database cluster, send a DELETE request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
         * @summary Delete a Connection Pool (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} poolName The name used to identify the connection pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteConnectionPool: async (databaseClusterUuid: string, poolName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling deleteConnectionPool.');
            }
            // verify required parameter 'poolName' is not null or undefined
            if (poolName === null || poolName === undefined) {
                throw new RequiredError('poolName','Required parameter poolName was null or undefined when calling deleteConnectionPool.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/pools/{pool_name}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"pool_name"}}`, encodeURIComponent(String(poolName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To delete a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: Database management is not supported for Redis clusters. 
         * @summary Delete a Database
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} databaseName The name of the database.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteDatabase: async (databaseClusterUuid: string, databaseName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling deleteDatabase.');
            }
            // verify required parameter 'databaseName' is not null or undefined
            if (databaseName === null || databaseName === undefined) {
                throw new RequiredError('databaseName','Required parameter databaseName was null or undefined when calling deleteDatabase.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/dbs/{database_name}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"database_name"}}`, encodeURIComponent(String(databaseName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To stop an online migration, send a DELETE request to `/v2/databases/$DATABASE_ID/online-migration/$MIGRATION_ID`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
         * @summary Stop an Online Migration
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} migrationId A unique identifier assigned to the online migration.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteOnlineMigration: async (databaseClusterUuid: string, migrationId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling deleteOnlineMigration.');
            }
            // verify required parameter 'migrationId' is not null or undefined
            if (migrationId === null || migrationId === undefined) {
                throw new RequiredError('migrationId','Required parameter migrationId was null or undefined when calling deleteOnlineMigration.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/online-migration/{migration_id}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"migration_id"}}`, encodeURIComponent(String(migrationId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To remove a specific database user, send a DELETE request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: User management is not supported for Redis clusters. 
         * @summary Remove a Database User
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser: async (databaseClusterUuid: string, username: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling deleteUser.');
            }
            // verify required parameter 'username' is not null or undefined
            if (username === null || username === undefined) {
                throw new RequiredError('username','Required parameter username was null or undefined when calling deleteUser.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/users/{username}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"username"}}`, encodeURIComponent(String(username)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To destroy a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID`. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
         * @summary Destroy a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyCluster: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling destroyCluster.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To destroy a specific read-only replica, send a DELETE request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
         * @summary Destroy a Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} replicaName The name of the database replica.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyReplica: async (databaseClusterUuid: string, replicaName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling destroyReplica.');
            }
            // verify required parameter 'replicaName' is not null or undefined
            if (replicaName === null || replicaName === undefined) {
                throw new RequiredError('replicaName','Required parameter replicaName was null or undefined when calling destroyReplica.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/replicas/{replica_name}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"replica_name"}}`, encodeURIComponent(String(replicaName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To retrieve the public certificate used to secure the connection to the database cluster send a GET request to `/v2/databases/$DATABASE_ID/ca.  The response will be a JSON object with a `ca` key. This will be set to an object containing the public key certificate. 
         * @summary Retrieve the Public Certificate
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCa: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getCa.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/ca`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To show information about an existing connection pool for a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`. The response will be a JSON object with a `pool` key.
         * @summary Retrieve Existing Connection Pool (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} poolName The name used to identify the connection pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConnectionPool: async (databaseClusterUuid: string, poolName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getConnectionPool.');
            }
            // verify required parameter 'poolName' is not null or undefined
            if (poolName === null || poolName === undefined) {
                throw new RequiredError('poolName','Required parameter poolName was null or undefined when calling getConnectionPool.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/pools/{pool_name}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"pool_name"}}`, encodeURIComponent(String(poolName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a `db` key. This will be set to an object containing the standard database attributes. 
         * @summary Retrieve an Existing Database
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} databaseName The name of the database.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDatabase: async (databaseClusterUuid: string, databaseName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getDatabase.');
            }
            // verify required parameter 'databaseName' is not null or undefined
            if (databaseName === null || databaseName === undefined) {
                throw new RequiredError('databaseName','Required parameter databaseName was null or undefined when calling getDatabase.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/dbs/{database_name}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"database_name"}}`, encodeURIComponent(String(databaseName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID`. The response will be a JSON object with a database key. This will be set to an object containing the standard database cluster attributes. The embedded connection and private_connection objects will contain the information needed to access the database cluster. The embedded maintenance_window object will contain information about any scheduled maintenance for the database cluster.
         * @summary Retrieve an Existing Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDatabaseCluster: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getDatabaseCluster.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To retrieve the configured eviction policy for an existing Redis cluster, send a GET request to `/v2/databases/$DATABASE_ID/eviction_policy`. The response will be a JSON object with an `eviction_policy` key. This will be set to a string representing the eviction policy.
         * @summary Retrieve the Eviction Policy for a Redis Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvictionPolicy: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getEvictionPolicy.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/eviction_policy`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To retrieve the status of an online migration, send a GET request to `/v2/databases/$DATABASE_ID/online-migration`. If a migration has completed, a 200 OK status is returned with no response body.
         * @summary Retrieve the Status of an Online Migration
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMigrationStatus: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getMigrationStatus.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/online-migration`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To show information about an existing database replica, send a GET request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a `replica key`. This will be set to an object containing the standard database replica attributes.
         * @summary Retrieve an Existing Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} replicaName The name of the database replica.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReplica: async (databaseClusterUuid: string, replicaName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getReplica.');
            }
            // verify required parameter 'replicaName' is not null or undefined
            if (replicaName === null || replicaName === undefined) {
                throw new RequiredError('replicaName','Required parameter replicaName was null or undefined when calling getReplica.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/replicas/{replica_name}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"replica_name"}}`, encodeURIComponent(String(replicaName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To retrieve the configured SQL modes for an existing MySQL cluster, send a GET request to `/v2/databases/$DATABASE_ID/sql_mode`. The response will be a JSON object with a `sql_mode` key. This will be set to a string representing the configured SQL modes.
         * @summary Retrieve the SQL Modes for a MySQL Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSqlMode: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getSqlMode.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/sql_mode`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To show information about an existing database user, send a GET request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  Note: User management is not supported for Redis clusters.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
         * @summary Retrieve an Existing Database User
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (databaseClusterUuid: string, username: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling getUser.');
            }
            // verify required parameter 'username' is not null or undefined
            if (username === null || username === undefined) {
                throw new RequiredError('username','Required parameter username was null or undefined when calling getUser.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/users/{username}`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"username"}}`, encodeURIComponent(String(username)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of the connection pools available to a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools`. The result will be a JSON object with a `pools` key. This will be set to an array of connection pool objects.
         * @summary List Connection Pools (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listConnectionPools: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling listConnectionPools.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/pools`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of the available backups of a PostgreSQL or MySQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/backups`. **Note**: Backups are not supported for Redis clusters. The result will be a JSON object with a `backups key`. This will be set to an array of backup objects, each of which will contain the size of the backup and the timestamp at which it was created.
         * @summary List Backups for a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabaseBackups: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling listDatabaseBackups.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/backups`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of the database clusters available on your account, send a GET request to `/v2/databases`. To limit the results to database clusters with a specific tag, include the `tag_name` query parameter set to the name of the tag. For example, `/v2/databases?tag_name=$TAG_NAME`. The result will be a JSON object with a `databases` key. This will be set to an array of database objects, each of which will contain the standard database attributes. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster: The embedded `maintenance_window` object will contain information about any scheduled maintenance for the database cluster.
         * @summary List All Database Clusters
         * @param {string} [tagName] Limits the results to database clusters with a specific tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabaseClusters: async (tagName?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/databases`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            if (tagName !== undefined) {
                localVarQueryParameter['tag_name'] = tagName;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a GET request to `/v2/databases/$DATABASE_ID/firewall`. The result will be a JSON object with a `rules` key.
         * @summary List Firewall Rules (Trusted Sources) for a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabaseFirewalls: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling listDatabaseFirewalls.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/firewall`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of the databases in a clusters, send a GET request to `/v2/databases/$DATABASE_ID/dbs`.  The result will be a JSON object with a `dbs` key. This will be set to an array of database objects, each of which will contain the standard database attributes.  Note: Database management is not supported for Redis clusters. 
         * @summary List All Databases
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabases: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling listDatabases.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/dbs`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of the read-only replicas associated with a database cluster, send a GET request to `/v2/databases/$DATABASE_ID/replicas`. **Note**: Read-only replicas are not supported for Redis clusters. The result will be a JSON object with a `replicas` key. This will be set to an array of database replica objects, each of which will contain the standard database replica attributes.
         * @summary List All Read-only Replicas
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listReplicas: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling listReplicas.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/replicas`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To list all of the users for your database cluster, send a GET request to `/v2/databases/$DATABASE_ID/users`.  Note: User management is not supported for Redis clusters.  The result will be a JSON object with a `users` key. This will be set to an array of database user objects, each of which will contain the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
         * @summary List all Database Users
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUsers: async (databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling listUsers.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/users`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To reset the password for a database user, send a POST request to `/v2/databases/$DATABASE_ID/users/$USERNAME/reset_auth`.   For `mysql` databases, the authentication method can be specifying by including a key in the JSON body called `mysql_settings` with the `auth_plugin` value specified.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes. 
         * @summary Reset a Database User's Password or Authentication Method
         * @param {UsernameResetAuthBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetAuth: async (body: UsernameResetAuthBody, databaseClusterUuid: string, username: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling resetAuth.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling resetAuth.');
            }
            // verify required parameter 'username' is not null or undefined
            if (username === null || username === undefined) {
                throw new RequiredError('username','Required parameter username was null or undefined when calling resetAuth.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/users/{username}/reset_auth`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)))
                .replace(`{${"username"}}`, encodeURIComponent(String(username)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To migrate a database cluster to a new region, send a `PUT` request to `/v2/databases/$DATABASE_ID/migrate`. The body of the request must specify a `region` attribute.  A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its `status` attribute will now be set to `migrating`. This will transition back to `online` when the migration has completed. 
         * @summary Migrate a Database Cluster to a New Region
         * @param {DatabaseClusterUuidMigrateBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDatabaseCluster: async (body: DatabaseClusterUuidMigrateBody, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateDatabaseCluster.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateDatabaseCluster.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/migrate`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To resize a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/resize`. The body of the request must specify both the size and num_nodes attributes. A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its status attribute will now be set to resizing. This will transition back to online when the resize operation has completed.
         * @summary Resize a Database Cluster
         * @param {DatabaseClusterResize} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDatabaseClusterSize: async (body: DatabaseClusterResize, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateDatabaseClusterSize.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateDatabaseClusterSize.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/resize`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To update a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a PUT request to `/v2/databases/$DATABASE_ID/firewall` specifying which resources should be able to open connections to the database. You may limit connections to specific Droplets, Kubernetes clusters, or IP addresses. When a tag is provided, any Droplet or Kubernetes node with that tag applied to it will have access. The firewall is limited to 100 rules (or trusted sources). When possible, we recommend [placing your databases into a VPC network](https://www.digitalocean.com/docs/networking/vpc/) to limit access to them instead of using a firewall. A successful
         * @summary Update Firewall Rules (Trusted Sources) for a Database
         * @param {DatabaseClusterUuidFirewallBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDatabaseFirewall: async (body: DatabaseClusterUuidFirewallBody, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateDatabaseFirewall.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateDatabaseFirewall.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/firewall`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To configure an eviction policy for an existing Redis cluster, send a PUT request to `/v2/databases/$DATABASE_ID/eviction_policy` specifying the desired policy.
         * @summary Configure the Eviction Policy for a Redis Cluster
         * @param {EvictionPolicy} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateEvictionPolicy: async (body: EvictionPolicy, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateEvictionPolicy.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateEvictionPolicy.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/eviction_policy`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To configure the window when automatic maintenance should be performed for a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/maintenance`. A successful request will receive a 204 No Content status code with no body in response.
         * @summary Configure a Database Cluster's Maintenance Window
         * @param {DatabaseMaintenanceWindow} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMaintenanceWindow: async (body: DatabaseMaintenanceWindow, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateMaintenanceWindow.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateMaintenanceWindow.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/maintenance`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To start an online migration, send a PUT request to `/v2/databases/$DATABASE_ID/online-migration` endpoint. Migrating a cluster establishes a connection with an existing cluster and replicates its contents to the target cluster. Online migration is only available for PostgreSQL and Redis clusters.
         * @summary Start an Online Migration
         * @param {SourceDatabase} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateOnlineMigration: async (body: SourceDatabase, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateOnlineMigration.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateOnlineMigration.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/online-migration`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * To configure the SQL modes for an existing MySQL cluster, send a PUT request to `/v2/databases/$DATABASE_ID/sql_mode` specifying the desired modes. See the official MySQL 8 documentation for a [full list of supported SQL modes](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-full). A successful request will receive a 204 No Content status code with no body in response.
         * @summary Update SQL Mode for a Cluster
         * @param {SqlMode} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSqlMode: async (body: SqlMode, databaseClusterUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateSqlMode.');
            }
            // verify required parameter 'databaseClusterUuid' is not null or undefined
            if (databaseClusterUuid === null || databaseClusterUuid === undefined) {
                throw new RequiredError('databaseClusterUuid','Required parameter databaseClusterUuid was null or undefined when calling updateSqlMode.');
            }
            const localVarPath = `/v2/databases/{database_cluster_uuid}/sql_mode`
                .replace(`{${"database_cluster_uuid"}}`, encodeURIComponent(String(databaseClusterUuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer_auth required

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DatabasesApi - functional programming interface
 * @export
 */
export const DatabasesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * For PostgreSQL database clusters, connection pools can be used to allow a database to share its idle connections. The popular PostgreSQL connection pooling utility PgBouncer is used to provide this service. [See here for more information](https://www.digitalocean.com/docs/databases/postgresql/how-to/manage-connection-pools/) about how and why to use PgBouncer connection pooling including details about the available transaction modes.  To add a new connection pool to a PostgreSQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/pools` specifying a name for the pool, the user to connect with, the database to connect to, as well as its desired size and transaction mode. 
         * @summary Add a New Connection Pool (PostgreSQL)
         * @param {ConnectionPool} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addConnectionPool(body: ConnectionPool, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2017>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).addConnectionPool(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To add a new database to an existing cluster, send a POST request to `/v2/databases/$DATABASE_ID/dbs`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a key called `db`. The value of this will be an object that contains the standard attributes associated with a database. 
         * @summary Add a New Database
         * @param {Database} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addDatabase(body: Database, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2016>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).addDatabase(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To add a new database user, send a POST request to `/v2/databases/$DATABASE_ID/users` with the desired username.  Note: User management is not supported for Redis clusters.  When adding a user to a MySQL cluster, additional options can be configured in the `mysql_settings` object.  The response will be a JSON object with a key called `user`. The value of this will be an object that contains the standard attributes associated with a database user including its randomly generated password. 
         * @summary Add a Database User
         * @param {DatabaseUser} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addUser(body: DatabaseUser, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2015>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).addUser(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To create a database cluster, send a POST request to `/v2/databases`. The response will be a JSON object with a key called `database`. The value of this will be an object that contains the standard attributes associated with a database cluster. The initial value of the database cluster's `status` attribute will be `creating`. When the cluster is ready to receive traffic, this will transition to `online`. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster. DigitalOcean managed PostgreSQL and MySQL database clusters take automated daily backups. To create a new database cluster based on a backup of an exising cluster, send a POST request to `/v2/databases`. In addition to the standard database cluster attributes, the JSON body must include a key named `backup_restore` with the name of the original database cluster and the timestamp of the backup to be restored. Note: Backups are not supported for Redis clusters.
         * @summary Create a New Database Cluster
         * @param {V2DatabasesBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createDatabaseCluster(body: V2DatabasesBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2013>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).createDatabaseCluster(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To create a read-only replica for a PostgreSQL or MySQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/replicas` specifying the name it should be given, the size of the node to be used, and the region where it will be located. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a key called `replica`. The value of this will be an object that contains the standard attributes associated with a database replica. The initial value of the read-only replica's `status` attribute will be `forking`. When the replica is ready to receive traffic, this will transition to `active`.
         * @summary Create a Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {DatabaseClusterUuidReplicasBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createReplica(databaseClusterUuid: string, body?: DatabaseClusterUuidReplicasBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2014>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).createReplica(databaseClusterUuid, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a specific connection pool for a PostgreSQL database cluster, send a DELETE request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
         * @summary Delete a Connection Pool (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} poolName The name used to identify the connection pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteConnectionPool(databaseClusterUuid: string, poolName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).deleteConnectionPool(databaseClusterUuid, poolName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: Database management is not supported for Redis clusters. 
         * @summary Delete a Database
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} databaseName The name of the database.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteDatabase(databaseClusterUuid: string, databaseName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).deleteDatabase(databaseClusterUuid, databaseName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To stop an online migration, send a DELETE request to `/v2/databases/$DATABASE_ID/online-migration/$MIGRATION_ID`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
         * @summary Stop an Online Migration
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} migrationId A unique identifier assigned to the online migration.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteOnlineMigration(databaseClusterUuid: string, migrationId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).deleteOnlineMigration(databaseClusterUuid, migrationId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To remove a specific database user, send a DELETE request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: User management is not supported for Redis clusters. 
         * @summary Remove a Database User
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUser(databaseClusterUuid: string, username: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).deleteUser(databaseClusterUuid, username, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To destroy a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID`. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
         * @summary Destroy a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyCluster(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).destroyCluster(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To destroy a specific read-only replica, send a DELETE request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
         * @summary Destroy a Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} replicaName The name of the database replica.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyReplica(databaseClusterUuid: string, replicaName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).destroyReplica(databaseClusterUuid, replicaName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve the public certificate used to secure the connection to the database cluster send a GET request to `/v2/databases/$DATABASE_ID/ca.  The response will be a JSON object with a `ca` key. This will be set to an object containing the public key certificate. 
         * @summary Retrieve the Public Certificate
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCa(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20012>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getCa(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an existing connection pool for a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`. The response will be a JSON object with a `pool` key.
         * @summary Retrieve Existing Connection Pool (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} poolName The name used to identify the connection pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getConnectionPool(databaseClusterUuid: string, poolName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2017>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getConnectionPool(databaseClusterUuid, poolName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a `db` key. This will be set to an object containing the standard database attributes. 
         * @summary Retrieve an Existing Database
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} databaseName The name of the database.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDatabase(databaseClusterUuid: string, databaseName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2016>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getDatabase(databaseClusterUuid, databaseName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID`. The response will be a JSON object with a database key. This will be set to an object containing the standard database cluster attributes. The embedded connection and private_connection objects will contain the information needed to access the database cluster. The embedded maintenance_window object will contain information about any scheduled maintenance for the database cluster.
         * @summary Retrieve an Existing Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDatabaseCluster(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2013>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getDatabaseCluster(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve the configured eviction policy for an existing Redis cluster, send a GET request to `/v2/databases/$DATABASE_ID/eviction_policy`. The response will be a JSON object with an `eviction_policy` key. This will be set to a string representing the eviction policy.
         * @summary Retrieve the Eviction Policy for a Redis Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEvictionPolicy(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EvictionPolicy>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getEvictionPolicy(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve the status of an online migration, send a GET request to `/v2/databases/$DATABASE_ID/online-migration`. If a migration has completed, a 200 OK status is returned with no response body.
         * @summary Retrieve the Status of an Online Migration
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMigrationStatus(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OnlineMigration>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getMigrationStatus(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an existing database replica, send a GET request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a `replica key`. This will be set to an object containing the standard database replica attributes.
         * @summary Retrieve an Existing Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} replicaName The name of the database replica.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getReplica(databaseClusterUuid: string, replicaName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2014>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getReplica(databaseClusterUuid, replicaName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve the configured SQL modes for an existing MySQL cluster, send a GET request to `/v2/databases/$DATABASE_ID/sql_mode`. The response will be a JSON object with a `sql_mode` key. This will be set to a string representing the configured SQL modes.
         * @summary Retrieve the SQL Modes for a MySQL Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSqlMode(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SqlMode>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getSqlMode(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an existing database user, send a GET request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  Note: User management is not supported for Redis clusters.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
         * @summary Retrieve an Existing Database User
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(databaseClusterUuid: string, username: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2015>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).getUser(databaseClusterUuid, username, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the connection pools available to a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools`. The result will be a JSON object with a `pools` key. This will be set to an array of connection pool objects.
         * @summary List Connection Pools (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listConnectionPools(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ConnectionPools>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listConnectionPools(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the available backups of a PostgreSQL or MySQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/backups`. **Note**: Backups are not supported for Redis clusters. The result will be a JSON object with a `backups key`. This will be set to an array of backup objects, each of which will contain the size of the backup and the timestamp at which it was created.
         * @summary List Backups for a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDatabaseBackups(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20014>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listDatabaseBackups(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the database clusters available on your account, send a GET request to `/v2/databases`. To limit the results to database clusters with a specific tag, include the `tag_name` query parameter set to the name of the tag. For example, `/v2/databases?tag_name=$TAG_NAME`. The result will be a JSON object with a `databases` key. This will be set to an array of database objects, each of which will contain the standard database attributes. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster: The embedded `maintenance_window` object will contain information about any scheduled maintenance for the database cluster.
         * @summary List All Database Clusters
         * @param {string} [tagName] Limits the results to database clusters with a specific tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDatabaseClusters(tagName?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20011>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listDatabaseClusters(tagName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a GET request to `/v2/databases/$DATABASE_ID/firewall`. The result will be a JSON object with a `rules` key.
         * @summary List Firewall Rules (Trusted Sources) for a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDatabaseFirewalls(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20013>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listDatabaseFirewalls(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the databases in a clusters, send a GET request to `/v2/databases/$DATABASE_ID/dbs`.  The result will be a JSON object with a `dbs` key. This will be set to an array of database objects, each of which will contain the standard database attributes.  Note: Database management is not supported for Redis clusters. 
         * @summary List All Databases
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDatabases(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20017>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listDatabases(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the read-only replicas associated with a database cluster, send a GET request to `/v2/databases/$DATABASE_ID/replicas`. **Note**: Read-only replicas are not supported for Redis clusters. The result will be a JSON object with a `replicas` key. This will be set to an array of database replica objects, each of which will contain the standard database replica attributes.
         * @summary List All Read-only Replicas
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listReplicas(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20015>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listReplicas(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the users for your database cluster, send a GET request to `/v2/databases/$DATABASE_ID/users`.  Note: User management is not supported for Redis clusters.  The result will be a JSON object with a `users` key. This will be set to an array of database user objects, each of which will contain the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
         * @summary List all Database Users
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUsers(databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20016>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).listUsers(databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To reset the password for a database user, send a POST request to `/v2/databases/$DATABASE_ID/users/$USERNAME/reset_auth`.   For `mysql` databases, the authentication method can be specifying by including a key in the JSON body called `mysql_settings` with the `auth_plugin` value specified.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes. 
         * @summary Reset a Database User's Password or Authentication Method
         * @param {UsernameResetAuthBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resetAuth(body: UsernameResetAuthBody, databaseClusterUuid: string, username: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2015>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).resetAuth(body, databaseClusterUuid, username, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To migrate a database cluster to a new region, send a `PUT` request to `/v2/databases/$DATABASE_ID/migrate`. The body of the request must specify a `region` attribute.  A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its `status` attribute will now be set to `migrating`. This will transition back to `online` when the migration has completed. 
         * @summary Migrate a Database Cluster to a New Region
         * @param {DatabaseClusterUuidMigrateBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateDatabaseCluster(body: DatabaseClusterUuidMigrateBody, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateDatabaseCluster(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To resize a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/resize`. The body of the request must specify both the size and num_nodes attributes. A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its status attribute will now be set to resizing. This will transition back to online when the resize operation has completed.
         * @summary Resize a Database Cluster
         * @param {DatabaseClusterResize} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateDatabaseClusterSize(body: DatabaseClusterResize, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateDatabaseClusterSize(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To update a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a PUT request to `/v2/databases/$DATABASE_ID/firewall` specifying which resources should be able to open connections to the database. You may limit connections to specific Droplets, Kubernetes clusters, or IP addresses. When a tag is provided, any Droplet or Kubernetes node with that tag applied to it will have access. The firewall is limited to 100 rules (or trusted sources). When possible, we recommend [placing your databases into a VPC network](https://www.digitalocean.com/docs/networking/vpc/) to limit access to them instead of using a firewall. A successful
         * @summary Update Firewall Rules (Trusted Sources) for a Database
         * @param {DatabaseClusterUuidFirewallBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateDatabaseFirewall(body: DatabaseClusterUuidFirewallBody, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateDatabaseFirewall(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To configure an eviction policy for an existing Redis cluster, send a PUT request to `/v2/databases/$DATABASE_ID/eviction_policy` specifying the desired policy.
         * @summary Configure the Eviction Policy for a Redis Cluster
         * @param {EvictionPolicy} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateEvictionPolicy(body: EvictionPolicy, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateEvictionPolicy(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To configure the window when automatic maintenance should be performed for a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/maintenance`. A successful request will receive a 204 No Content status code with no body in response.
         * @summary Configure a Database Cluster's Maintenance Window
         * @param {DatabaseMaintenanceWindow} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateMaintenanceWindow(body: DatabaseMaintenanceWindow, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateMaintenanceWindow(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To start an online migration, send a PUT request to `/v2/databases/$DATABASE_ID/online-migration` endpoint. Migrating a cluster establishes a connection with an existing cluster and replicates its contents to the target cluster. Online migration is only available for PostgreSQL and Redis clusters.
         * @summary Start an Online Migration
         * @param {SourceDatabase} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateOnlineMigration(body: SourceDatabase, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<OnlineMigration>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateOnlineMigration(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To configure the SQL modes for an existing MySQL cluster, send a PUT request to `/v2/databases/$DATABASE_ID/sql_mode` specifying the desired modes. See the official MySQL 8 documentation for a [full list of supported SQL modes](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-full). A successful request will receive a 204 No Content status code with no body in response.
         * @summary Update SQL Mode for a Cluster
         * @param {SqlMode} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateSqlMode(body: SqlMode, databaseClusterUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DatabasesApiAxiosParamCreator(configuration).updateSqlMode(body, databaseClusterUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DatabasesApi - factory interface
 * @export
 */
export const DatabasesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * For PostgreSQL database clusters, connection pools can be used to allow a database to share its idle connections. The popular PostgreSQL connection pooling utility PgBouncer is used to provide this service. [See here for more information](https://www.digitalocean.com/docs/databases/postgresql/how-to/manage-connection-pools/) about how and why to use PgBouncer connection pooling including details about the available transaction modes.  To add a new connection pool to a PostgreSQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/pools` specifying a name for the pool, the user to connect with, the database to connect to, as well as its desired size and transaction mode. 
         * @summary Add a New Connection Pool (PostgreSQL)
         * @param {ConnectionPool} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addConnectionPool(body: ConnectionPool, databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse2017> {
            return DatabasesApiFp(configuration).addConnectionPool(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To add a new database to an existing cluster, send a POST request to `/v2/databases/$DATABASE_ID/dbs`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a key called `db`. The value of this will be an object that contains the standard attributes associated with a database. 
         * @summary Add a New Database
         * @param {Database} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addDatabase(body: Database, databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse2016> {
            return DatabasesApiFp(configuration).addDatabase(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To add a new database user, send a POST request to `/v2/databases/$DATABASE_ID/users` with the desired username.  Note: User management is not supported for Redis clusters.  When adding a user to a MySQL cluster, additional options can be configured in the `mysql_settings` object.  The response will be a JSON object with a key called `user`. The value of this will be an object that contains the standard attributes associated with a database user including its randomly generated password. 
         * @summary Add a Database User
         * @param {DatabaseUser} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addUser(body: DatabaseUser, databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse2015> {
            return DatabasesApiFp(configuration).addUser(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To create a database cluster, send a POST request to `/v2/databases`. The response will be a JSON object with a key called `database`. The value of this will be an object that contains the standard attributes associated with a database cluster. The initial value of the database cluster's `status` attribute will be `creating`. When the cluster is ready to receive traffic, this will transition to `online`. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster. DigitalOcean managed PostgreSQL and MySQL database clusters take automated daily backups. To create a new database cluster based on a backup of an exising cluster, send a POST request to `/v2/databases`. In addition to the standard database cluster attributes, the JSON body must include a key named `backup_restore` with the name of the original database cluster and the timestamp of the backup to be restored. Note: Backups are not supported for Redis clusters.
         * @summary Create a New Database Cluster
         * @param {V2DatabasesBody} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDatabaseCluster(body: V2DatabasesBody, options?: any): AxiosPromise<InlineResponse2013> {
            return DatabasesApiFp(configuration).createDatabaseCluster(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To create a read-only replica for a PostgreSQL or MySQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/replicas` specifying the name it should be given, the size of the node to be used, and the region where it will be located. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a key called `replica`. The value of this will be an object that contains the standard attributes associated with a database replica. The initial value of the read-only replica's `status` attribute will be `forking`. When the replica is ready to receive traffic, this will transition to `active`.
         * @summary Create a Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {DatabaseClusterUuidReplicasBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReplica(databaseClusterUuid: string, body?: DatabaseClusterUuidReplicasBody, options?: any): AxiosPromise<InlineResponse2014> {
            return DatabasesApiFp(configuration).createReplica(databaseClusterUuid, body, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a specific connection pool for a PostgreSQL database cluster, send a DELETE request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
         * @summary Delete a Connection Pool (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} poolName The name used to identify the connection pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteConnectionPool(databaseClusterUuid: string, poolName: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).deleteConnectionPool(databaseClusterUuid, poolName, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: Database management is not supported for Redis clusters. 
         * @summary Delete a Database
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} databaseName The name of the database.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteDatabase(databaseClusterUuid: string, databaseName: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).deleteDatabase(databaseClusterUuid, databaseName, options).then((request) => request(axios, basePath));
        },
        /**
         * To stop an online migration, send a DELETE request to `/v2/databases/$DATABASE_ID/online-migration/$MIGRATION_ID`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
         * @summary Stop an Online Migration
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} migrationId A unique identifier assigned to the online migration.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteOnlineMigration(databaseClusterUuid: string, migrationId: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).deleteOnlineMigration(databaseClusterUuid, migrationId, options).then((request) => request(axios, basePath));
        },
        /**
         * To remove a specific database user, send a DELETE request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: User management is not supported for Redis clusters. 
         * @summary Remove a Database User
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser(databaseClusterUuid: string, username: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).deleteUser(databaseClusterUuid, username, options).then((request) => request(axios, basePath));
        },
        /**
         * To destroy a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID`. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
         * @summary Destroy a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyCluster(databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).destroyCluster(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To destroy a specific read-only replica, send a DELETE request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
         * @summary Destroy a Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} replicaName The name of the database replica.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyReplica(databaseClusterUuid: string, replicaName: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).destroyReplica(databaseClusterUuid, replicaName, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve the public certificate used to secure the connection to the database cluster send a GET request to `/v2/databases/$DATABASE_ID/ca.  The response will be a JSON object with a `ca` key. This will be set to an object containing the public key certificate. 
         * @summary Retrieve the Public Certificate
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCa(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse20012> {
            return DatabasesApiFp(configuration).getCa(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an existing connection pool for a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`. The response will be a JSON object with a `pool` key.
         * @summary Retrieve Existing Connection Pool (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} poolName The name used to identify the connection pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getConnectionPool(databaseClusterUuid: string, poolName: string, options?: any): AxiosPromise<InlineResponse2017> {
            return DatabasesApiFp(configuration).getConnectionPool(databaseClusterUuid, poolName, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a `db` key. This will be set to an object containing the standard database attributes. 
         * @summary Retrieve an Existing Database
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} databaseName The name of the database.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDatabase(databaseClusterUuid: string, databaseName: string, options?: any): AxiosPromise<InlineResponse2016> {
            return DatabasesApiFp(configuration).getDatabase(databaseClusterUuid, databaseName, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID`. The response will be a JSON object with a database key. This will be set to an object containing the standard database cluster attributes. The embedded connection and private_connection objects will contain the information needed to access the database cluster. The embedded maintenance_window object will contain information about any scheduled maintenance for the database cluster.
         * @summary Retrieve an Existing Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDatabaseCluster(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse2013> {
            return DatabasesApiFp(configuration).getDatabaseCluster(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve the configured eviction policy for an existing Redis cluster, send a GET request to `/v2/databases/$DATABASE_ID/eviction_policy`. The response will be a JSON object with an `eviction_policy` key. This will be set to a string representing the eviction policy.
         * @summary Retrieve the Eviction Policy for a Redis Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvictionPolicy(databaseClusterUuid: string, options?: any): AxiosPromise<EvictionPolicy> {
            return DatabasesApiFp(configuration).getEvictionPolicy(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve the status of an online migration, send a GET request to `/v2/databases/$DATABASE_ID/online-migration`. If a migration has completed, a 200 OK status is returned with no response body.
         * @summary Retrieve the Status of an Online Migration
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMigrationStatus(databaseClusterUuid: string, options?: any): AxiosPromise<OnlineMigration> {
            return DatabasesApiFp(configuration).getMigrationStatus(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an existing database replica, send a GET request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a `replica key`. This will be set to an object containing the standard database replica attributes.
         * @summary Retrieve an Existing Read-only Replica
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} replicaName The name of the database replica.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReplica(databaseClusterUuid: string, replicaName: string, options?: any): AxiosPromise<InlineResponse2014> {
            return DatabasesApiFp(configuration).getReplica(databaseClusterUuid, replicaName, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve the configured SQL modes for an existing MySQL cluster, send a GET request to `/v2/databases/$DATABASE_ID/sql_mode`. The response will be a JSON object with a `sql_mode` key. This will be set to a string representing the configured SQL modes.
         * @summary Retrieve the SQL Modes for a MySQL Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSqlMode(databaseClusterUuid: string, options?: any): AxiosPromise<SqlMode> {
            return DatabasesApiFp(configuration).getSqlMode(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an existing database user, send a GET request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  Note: User management is not supported for Redis clusters.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
         * @summary Retrieve an Existing Database User
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(databaseClusterUuid: string, username: string, options?: any): AxiosPromise<InlineResponse2015> {
            return DatabasesApiFp(configuration).getUser(databaseClusterUuid, username, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the connection pools available to a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools`. The result will be a JSON object with a `pools` key. This will be set to an array of connection pool objects.
         * @summary List Connection Pools (PostgreSQL)
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listConnectionPools(databaseClusterUuid: string, options?: any): AxiosPromise<ConnectionPools> {
            return DatabasesApiFp(configuration).listConnectionPools(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the available backups of a PostgreSQL or MySQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/backups`. **Note**: Backups are not supported for Redis clusters. The result will be a JSON object with a `backups key`. This will be set to an array of backup objects, each of which will contain the size of the backup and the timestamp at which it was created.
         * @summary List Backups for a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabaseBackups(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse20014> {
            return DatabasesApiFp(configuration).listDatabaseBackups(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the database clusters available on your account, send a GET request to `/v2/databases`. To limit the results to database clusters with a specific tag, include the `tag_name` query parameter set to the name of the tag. For example, `/v2/databases?tag_name=$TAG_NAME`. The result will be a JSON object with a `databases` key. This will be set to an array of database objects, each of which will contain the standard database attributes. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster: The embedded `maintenance_window` object will contain information about any scheduled maintenance for the database cluster.
         * @summary List All Database Clusters
         * @param {string} [tagName] Limits the results to database clusters with a specific tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabaseClusters(tagName?: string, options?: any): AxiosPromise<InlineResponse20011> {
            return DatabasesApiFp(configuration).listDatabaseClusters(tagName, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a GET request to `/v2/databases/$DATABASE_ID/firewall`. The result will be a JSON object with a `rules` key.
         * @summary List Firewall Rules (Trusted Sources) for a Database Cluster
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabaseFirewalls(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse20013> {
            return DatabasesApiFp(configuration).listDatabaseFirewalls(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the databases in a clusters, send a GET request to `/v2/databases/$DATABASE_ID/dbs`.  The result will be a JSON object with a `dbs` key. This will be set to an array of database objects, each of which will contain the standard database attributes.  Note: Database management is not supported for Redis clusters. 
         * @summary List All Databases
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDatabases(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse20017> {
            return DatabasesApiFp(configuration).listDatabases(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the read-only replicas associated with a database cluster, send a GET request to `/v2/databases/$DATABASE_ID/replicas`. **Note**: Read-only replicas are not supported for Redis clusters. The result will be a JSON object with a `replicas` key. This will be set to an array of database replica objects, each of which will contain the standard database replica attributes.
         * @summary List All Read-only Replicas
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listReplicas(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse20015> {
            return DatabasesApiFp(configuration).listReplicas(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the users for your database cluster, send a GET request to `/v2/databases/$DATABASE_ID/users`.  Note: User management is not supported for Redis clusters.  The result will be a JSON object with a `users` key. This will be set to an array of database user objects, each of which will contain the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
         * @summary List all Database Users
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUsers(databaseClusterUuid: string, options?: any): AxiosPromise<InlineResponse20016> {
            return DatabasesApiFp(configuration).listUsers(databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To reset the password for a database user, send a POST request to `/v2/databases/$DATABASE_ID/users/$USERNAME/reset_auth`.   For `mysql` databases, the authentication method can be specifying by including a key in the JSON body called `mysql_settings` with the `auth_plugin` value specified.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes. 
         * @summary Reset a Database User's Password or Authentication Method
         * @param {UsernameResetAuthBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {string} username The name of the database user.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetAuth(body: UsernameResetAuthBody, databaseClusterUuid: string, username: string, options?: any): AxiosPromise<InlineResponse2015> {
            return DatabasesApiFp(configuration).resetAuth(body, databaseClusterUuid, username, options).then((request) => request(axios, basePath));
        },
        /**
         * To migrate a database cluster to a new region, send a `PUT` request to `/v2/databases/$DATABASE_ID/migrate`. The body of the request must specify a `region` attribute.  A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its `status` attribute will now be set to `migrating`. This will transition back to `online` when the migration has completed. 
         * @summary Migrate a Database Cluster to a New Region
         * @param {DatabaseClusterUuidMigrateBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDatabaseCluster(body: DatabaseClusterUuidMigrateBody, databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).updateDatabaseCluster(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To resize a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/resize`. The body of the request must specify both the size and num_nodes attributes. A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its status attribute will now be set to resizing. This will transition back to online when the resize operation has completed.
         * @summary Resize a Database Cluster
         * @param {DatabaseClusterResize} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDatabaseClusterSize(body: DatabaseClusterResize, databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).updateDatabaseClusterSize(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To update a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a PUT request to `/v2/databases/$DATABASE_ID/firewall` specifying which resources should be able to open connections to the database. You may limit connections to specific Droplets, Kubernetes clusters, or IP addresses. When a tag is provided, any Droplet or Kubernetes node with that tag applied to it will have access. The firewall is limited to 100 rules (or trusted sources). When possible, we recommend [placing your databases into a VPC network](https://www.digitalocean.com/docs/networking/vpc/) to limit access to them instead of using a firewall. A successful
         * @summary Update Firewall Rules (Trusted Sources) for a Database
         * @param {DatabaseClusterUuidFirewallBody} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDatabaseFirewall(body: DatabaseClusterUuidFirewallBody, databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).updateDatabaseFirewall(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To configure an eviction policy for an existing Redis cluster, send a PUT request to `/v2/databases/$DATABASE_ID/eviction_policy` specifying the desired policy.
         * @summary Configure the Eviction Policy for a Redis Cluster
         * @param {EvictionPolicy} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateEvictionPolicy(body: EvictionPolicy, databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).updateEvictionPolicy(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To configure the window when automatic maintenance should be performed for a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/maintenance`. A successful request will receive a 204 No Content status code with no body in response.
         * @summary Configure a Database Cluster's Maintenance Window
         * @param {DatabaseMaintenanceWindow} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMaintenanceWindow(body: DatabaseMaintenanceWindow, databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).updateMaintenanceWindow(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To start an online migration, send a PUT request to `/v2/databases/$DATABASE_ID/online-migration` endpoint. Migrating a cluster establishes a connection with an existing cluster and replicates its contents to the target cluster. Online migration is only available for PostgreSQL and Redis clusters.
         * @summary Start an Online Migration
         * @param {SourceDatabase} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateOnlineMigration(body: SourceDatabase, databaseClusterUuid: string, options?: any): AxiosPromise<OnlineMigration> {
            return DatabasesApiFp(configuration).updateOnlineMigration(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To configure the SQL modes for an existing MySQL cluster, send a PUT request to `/v2/databases/$DATABASE_ID/sql_mode` specifying the desired modes. See the official MySQL 8 documentation for a [full list of supported SQL modes](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-full). A successful request will receive a 204 No Content status code with no body in response.
         * @summary Update SQL Mode for a Cluster
         * @param {SqlMode} body 
         * @param {string} databaseClusterUuid A unique identifier for a database cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateSqlMode(body: SqlMode, databaseClusterUuid: string, options?: any): AxiosPromise<void> {
            return DatabasesApiFp(configuration).updateSqlMode(body, databaseClusterUuid, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DatabasesApi - object-oriented interface
 * @export
 * @class DatabasesApi
 * @extends {BaseAPI}
 */
export class DatabasesApi extends BaseAPI {
    /**
     * For PostgreSQL database clusters, connection pools can be used to allow a database to share its idle connections. The popular PostgreSQL connection pooling utility PgBouncer is used to provide this service. [See here for more information](https://www.digitalocean.com/docs/databases/postgresql/how-to/manage-connection-pools/) about how and why to use PgBouncer connection pooling including details about the available transaction modes.  To add a new connection pool to a PostgreSQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/pools` specifying a name for the pool, the user to connect with, the database to connect to, as well as its desired size and transaction mode. 
     * @summary Add a New Connection Pool (PostgreSQL)
     * @param {ConnectionPool} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public addConnectionPool(body: ConnectionPool, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).addConnectionPool(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To add a new database to an existing cluster, send a POST request to `/v2/databases/$DATABASE_ID/dbs`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a key called `db`. The value of this will be an object that contains the standard attributes associated with a database. 
     * @summary Add a New Database
     * @param {Database} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public addDatabase(body: Database, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).addDatabase(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To add a new database user, send a POST request to `/v2/databases/$DATABASE_ID/users` with the desired username.  Note: User management is not supported for Redis clusters.  When adding a user to a MySQL cluster, additional options can be configured in the `mysql_settings` object.  The response will be a JSON object with a key called `user`. The value of this will be an object that contains the standard attributes associated with a database user including its randomly generated password. 
     * @summary Add a Database User
     * @param {DatabaseUser} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public addUser(body: DatabaseUser, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).addUser(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To create a database cluster, send a POST request to `/v2/databases`. The response will be a JSON object with a key called `database`. The value of this will be an object that contains the standard attributes associated with a database cluster. The initial value of the database cluster's `status` attribute will be `creating`. When the cluster is ready to receive traffic, this will transition to `online`. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster. DigitalOcean managed PostgreSQL and MySQL database clusters take automated daily backups. To create a new database cluster based on a backup of an exising cluster, send a POST request to `/v2/databases`. In addition to the standard database cluster attributes, the JSON body must include a key named `backup_restore` with the name of the original database cluster and the timestamp of the backup to be restored. Note: Backups are not supported for Redis clusters.
     * @summary Create a New Database Cluster
     * @param {V2DatabasesBody} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public createDatabaseCluster(body: V2DatabasesBody, options?: any) {
        return DatabasesApiFp(this.configuration).createDatabaseCluster(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To create a read-only replica for a PostgreSQL or MySQL database cluster, send a POST request to `/v2/databases/$DATABASE_ID/replicas` specifying the name it should be given, the size of the node to be used, and the region where it will be located. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a key called `replica`. The value of this will be an object that contains the standard attributes associated with a database replica. The initial value of the read-only replica's `status` attribute will be `forking`. When the replica is ready to receive traffic, this will transition to `active`.
     * @summary Create a Read-only Replica
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {DatabaseClusterUuidReplicasBody} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public createReplica(databaseClusterUuid: string, body?: DatabaseClusterUuidReplicasBody, options?: any) {
        return DatabasesApiFp(this.configuration).createReplica(databaseClusterUuid, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a specific connection pool for a PostgreSQL database cluster, send a DELETE request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
     * @summary Delete a Connection Pool (PostgreSQL)
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} poolName The name used to identify the connection pool.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public deleteConnectionPool(databaseClusterUuid: string, poolName: string, options?: any) {
        return DatabasesApiFp(this.configuration).deleteConnectionPool(databaseClusterUuid, poolName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: Database management is not supported for Redis clusters. 
     * @summary Delete a Database
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} databaseName The name of the database.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public deleteDatabase(databaseClusterUuid: string, databaseName: string, options?: any) {
        return DatabasesApiFp(this.configuration).deleteDatabase(databaseClusterUuid, databaseName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To stop an online migration, send a DELETE request to `/v2/databases/$DATABASE_ID/online-migration/$MIGRATION_ID`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
     * @summary Stop an Online Migration
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} migrationId A unique identifier assigned to the online migration.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public deleteOnlineMigration(databaseClusterUuid: string, migrationId: string, options?: any) {
        return DatabasesApiFp(this.configuration).deleteOnlineMigration(databaseClusterUuid, migrationId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To remove a specific database user, send a DELETE request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.  Note: User management is not supported for Redis clusters. 
     * @summary Remove a Database User
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} username The name of the database user.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public deleteUser(databaseClusterUuid: string, username: string, options?: any) {
        return DatabasesApiFp(this.configuration).deleteUser(databaseClusterUuid, username, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To destroy a specific database, send a DELETE request to `/v2/databases/$DATABASE_ID`. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @summary Destroy a Database Cluster
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public destroyCluster(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).destroyCluster(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To destroy a specific read-only replica, send a DELETE request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @summary Destroy a Read-only Replica
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} replicaName The name of the database replica.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public destroyReplica(databaseClusterUuid: string, replicaName: string, options?: any) {
        return DatabasesApiFp(this.configuration).destroyReplica(databaseClusterUuid, replicaName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve the public certificate used to secure the connection to the database cluster send a GET request to `/v2/databases/$DATABASE_ID/ca.  The response will be a JSON object with a `ca` key. This will be set to an object containing the public key certificate. 
     * @summary Retrieve the Public Certificate
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getCa(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).getCa(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an existing connection pool for a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools/$POOL_NAME`. The response will be a JSON object with a `pool` key.
     * @summary Retrieve Existing Connection Pool (PostgreSQL)
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} poolName The name used to identify the connection pool.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getConnectionPool(databaseClusterUuid: string, poolName: string, options?: any) {
        return DatabasesApiFp(this.configuration).getConnectionPool(databaseClusterUuid, poolName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID/dbs/$DB_NAME`.  Note: Database management is not supported for Redis clusters.  The response will be a JSON object with a `db` key. This will be set to an object containing the standard database attributes. 
     * @summary Retrieve an Existing Database
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} databaseName The name of the database.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getDatabase(databaseClusterUuid: string, databaseName: string, options?: any) {
        return DatabasesApiFp(this.configuration).getDatabase(databaseClusterUuid, databaseName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an existing database cluster, send a GET request to `/v2/databases/$DATABASE_ID`. The response will be a JSON object with a database key. This will be set to an object containing the standard database cluster attributes. The embedded connection and private_connection objects will contain the information needed to access the database cluster. The embedded maintenance_window object will contain information about any scheduled maintenance for the database cluster.
     * @summary Retrieve an Existing Database Cluster
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getDatabaseCluster(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).getDatabaseCluster(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve the configured eviction policy for an existing Redis cluster, send a GET request to `/v2/databases/$DATABASE_ID/eviction_policy`. The response will be a JSON object with an `eviction_policy` key. This will be set to a string representing the eviction policy.
     * @summary Retrieve the Eviction Policy for a Redis Cluster
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getEvictionPolicy(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).getEvictionPolicy(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve the status of an online migration, send a GET request to `/v2/databases/$DATABASE_ID/online-migration`. If a migration has completed, a 200 OK status is returned with no response body.
     * @summary Retrieve the Status of an Online Migration
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getMigrationStatus(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).getMigrationStatus(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an existing database replica, send a GET request to `/v2/databases/$DATABASE_ID/replicas/$REPLICA_NAME`. **Note**: Read-only replicas are not supported for Redis clusters. The response will be a JSON object with a `replica key`. This will be set to an object containing the standard database replica attributes.
     * @summary Retrieve an Existing Read-only Replica
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} replicaName The name of the database replica.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getReplica(databaseClusterUuid: string, replicaName: string, options?: any) {
        return DatabasesApiFp(this.configuration).getReplica(databaseClusterUuid, replicaName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve the configured SQL modes for an existing MySQL cluster, send a GET request to `/v2/databases/$DATABASE_ID/sql_mode`. The response will be a JSON object with a `sql_mode` key. This will be set to a string representing the configured SQL modes.
     * @summary Retrieve the SQL Modes for a MySQL Cluster
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getSqlMode(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).getSqlMode(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an existing database user, send a GET request to `/v2/databases/$DATABASE_ID/users/$USERNAME`.  Note: User management is not supported for Redis clusters.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
     * @summary Retrieve an Existing Database User
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} username The name of the database user.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public getUser(databaseClusterUuid: string, username: string, options?: any) {
        return DatabasesApiFp(this.configuration).getUser(databaseClusterUuid, username, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the connection pools available to a PostgreSQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/pools`. The result will be a JSON object with a `pools` key. This will be set to an array of connection pool objects.
     * @summary List Connection Pools (PostgreSQL)
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listConnectionPools(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).listConnectionPools(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the available backups of a PostgreSQL or MySQL database cluster, send a GET request to `/v2/databases/$DATABASE_ID/backups`. **Note**: Backups are not supported for Redis clusters. The result will be a JSON object with a `backups key`. This will be set to an array of backup objects, each of which will contain the size of the backup and the timestamp at which it was created.
     * @summary List Backups for a Database Cluster
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listDatabaseBackups(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).listDatabaseBackups(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the database clusters available on your account, send a GET request to `/v2/databases`. To limit the results to database clusters with a specific tag, include the `tag_name` query parameter set to the name of the tag. For example, `/v2/databases?tag_name=$TAG_NAME`. The result will be a JSON object with a `databases` key. This will be set to an array of database objects, each of which will contain the standard database attributes. The embedded `connection` and `private_connection` objects will contain the information needed to access the database cluster: The embedded `maintenance_window` object will contain information about any scheduled maintenance for the database cluster.
     * @summary List All Database Clusters
     * @param {string} [tagName] Limits the results to database clusters with a specific tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listDatabaseClusters(tagName?: string, options?: any) {
        return DatabasesApiFp(this.configuration).listDatabaseClusters(tagName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a GET request to `/v2/databases/$DATABASE_ID/firewall`. The result will be a JSON object with a `rules` key.
     * @summary List Firewall Rules (Trusted Sources) for a Database Cluster
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listDatabaseFirewalls(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).listDatabaseFirewalls(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the databases in a clusters, send a GET request to `/v2/databases/$DATABASE_ID/dbs`.  The result will be a JSON object with a `dbs` key. This will be set to an array of database objects, each of which will contain the standard database attributes.  Note: Database management is not supported for Redis clusters. 
     * @summary List All Databases
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listDatabases(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).listDatabases(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the read-only replicas associated with a database cluster, send a GET request to `/v2/databases/$DATABASE_ID/replicas`. **Note**: Read-only replicas are not supported for Redis clusters. The result will be a JSON object with a `replicas` key. This will be set to an array of database replica objects, each of which will contain the standard database replica attributes.
     * @summary List All Read-only Replicas
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listReplicas(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).listReplicas(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the users for your database cluster, send a GET request to `/v2/databases/$DATABASE_ID/users`.  Note: User management is not supported for Redis clusters.  The result will be a JSON object with a `users` key. This will be set to an array of database user objects, each of which will contain the standard database user attributes.  For MySQL clusters, additional options will be contained in the mysql_settings object. 
     * @summary List all Database Users
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public listUsers(databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).listUsers(databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To reset the password for a database user, send a POST request to `/v2/databases/$DATABASE_ID/users/$USERNAME/reset_auth`.   For `mysql` databases, the authentication method can be specifying by including a key in the JSON body called `mysql_settings` with the `auth_plugin` value specified.  The response will be a JSON object with a `user` key. This will be set to an object containing the standard database user attributes. 
     * @summary Reset a Database User's Password or Authentication Method
     * @param {UsernameResetAuthBody} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {string} username The name of the database user.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public resetAuth(body: UsernameResetAuthBody, databaseClusterUuid: string, username: string, options?: any) {
        return DatabasesApiFp(this.configuration).resetAuth(body, databaseClusterUuid, username, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To migrate a database cluster to a new region, send a `PUT` request to `/v2/databases/$DATABASE_ID/migrate`. The body of the request must specify a `region` attribute.  A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its `status` attribute will now be set to `migrating`. This will transition back to `online` when the migration has completed. 
     * @summary Migrate a Database Cluster to a New Region
     * @param {DatabaseClusterUuidMigrateBody} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateDatabaseCluster(body: DatabaseClusterUuidMigrateBody, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateDatabaseCluster(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To resize a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/resize`. The body of the request must specify both the size and num_nodes attributes. A successful request will receive a 202 Accepted status code with no body in response. Querying the database cluster will show that its status attribute will now be set to resizing. This will transition back to online when the resize operation has completed.
     * @summary Resize a Database Cluster
     * @param {DatabaseClusterResize} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateDatabaseClusterSize(body: DatabaseClusterResize, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateDatabaseClusterSize(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To update a database cluster's firewall rules (known as \"trusted sources\" in the control panel), send a PUT request to `/v2/databases/$DATABASE_ID/firewall` specifying which resources should be able to open connections to the database. You may limit connections to specific Droplets, Kubernetes clusters, or IP addresses. When a tag is provided, any Droplet or Kubernetes node with that tag applied to it will have access. The firewall is limited to 100 rules (or trusted sources). When possible, we recommend [placing your databases into a VPC network](https://www.digitalocean.com/docs/networking/vpc/) to limit access to them instead of using a firewall. A successful
     * @summary Update Firewall Rules (Trusted Sources) for a Database
     * @param {DatabaseClusterUuidFirewallBody} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateDatabaseFirewall(body: DatabaseClusterUuidFirewallBody, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateDatabaseFirewall(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To configure an eviction policy for an existing Redis cluster, send a PUT request to `/v2/databases/$DATABASE_ID/eviction_policy` specifying the desired policy.
     * @summary Configure the Eviction Policy for a Redis Cluster
     * @param {EvictionPolicy} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateEvictionPolicy(body: EvictionPolicy, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateEvictionPolicy(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To configure the window when automatic maintenance should be performed for a database cluster, send a PUT request to `/v2/databases/$DATABASE_ID/maintenance`. A successful request will receive a 204 No Content status code with no body in response.
     * @summary Configure a Database Cluster's Maintenance Window
     * @param {DatabaseMaintenanceWindow} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateMaintenanceWindow(body: DatabaseMaintenanceWindow, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateMaintenanceWindow(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To start an online migration, send a PUT request to `/v2/databases/$DATABASE_ID/online-migration` endpoint. Migrating a cluster establishes a connection with an existing cluster and replicates its contents to the target cluster. Online migration is only available for PostgreSQL and Redis clusters.
     * @summary Start an Online Migration
     * @param {SourceDatabase} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateOnlineMigration(body: SourceDatabase, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateOnlineMigration(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To configure the SQL modes for an existing MySQL cluster, send a PUT request to `/v2/databases/$DATABASE_ID/sql_mode` specifying the desired modes. See the official MySQL 8 documentation for a [full list of supported SQL modes](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-full). A successful request will receive a 204 No Content status code with no body in response.
     * @summary Update SQL Mode for a Cluster
     * @param {SqlMode} body 
     * @param {string} databaseClusterUuid A unique identifier for a database cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatabasesApi
     */
    public updateSqlMode(body: SqlMode, databaseClusterUuid: string, options?: any) {
        return DatabasesApiFp(this.configuration).updateSqlMode(body, databaseClusterUuid, options).then((request) => request(this.axios, this.basePath));
    }
}

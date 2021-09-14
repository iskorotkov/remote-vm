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
import {Error} from '../model/Error';
import {InlineResponse20057} from '../model/InlineResponse20057';
import {InlineResponse20058} from '../model/InlineResponse20058';
import {InlineResponse20060} from '../model/InlineResponse20060';
import {InlineResponse20116} from '../model/InlineResponse20116';
import {RegionSlug} from '../model/RegionSlug';
import {SnapshotId} from '../model/SnapshotId';
import {V2VolumesBody} from '../model/V2VolumesBody';
import {VolumeIdSnapshotsBody} from '../model/VolumeIdSnapshotsBody';

/**
* BlockStorage service.
* @module api/BlockStorageApi
* @version 2.0
*/
export class BlockStorageApi {

    /**
    * Constructs a new BlockStorageApi. 
    * @alias module:api/BlockStorageApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the createNewVolume operation.
     * @callback moduleapi/BlockStorageApi~createNewVolumeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20116{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a New Block Storage Volume
     * To create a new volume, send a POST request to &#x60;/v2/volumes&#x60;. Optionally, a &#x60;filesystem_type&#x60; attribute may be provided in order to automatically format the volume&#x27;s filesystem. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to Droplets without support for auto-mounting is not recommended.
     * @param {module:model/V2VolumesBody} body 
     * @param {module:api/BlockStorageApi~createNewVolumeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createNewVolume(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createNewVolume");
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
      let returnType = InlineResponse20116;

      return this.apiClient.callApi(
        '/v2/volumes', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the createVolumeSnapshot operation.
     * @callback moduleapi/BlockStorageApi~createVolumeSnapshotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20058{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Snapshot from a Volume
     * To create a snapshot from a volume, sent a POST request to &#x60;/v2/volumes/$VOLUME_ID/snapshots&#x60;.
     * @param {module:model/VolumeIdSnapshotsBody} body 
     * @param {String} volumeId The ID of the block storage volume.
     * @param {module:api/BlockStorageApi~createVolumeSnapshotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createVolumeSnapshot(body, volumeId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createVolumeSnapshot");
      }
      // verify the required parameter 'volumeId' is set
      if (volumeId === undefined || volumeId === null) {
        throw new Error("Missing the required parameter 'volumeId' when calling createVolumeSnapshot");
      }

      let pathParams = {
        'volume_id': volumeId
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
      let returnType = InlineResponse20058;

      return this.apiClient.callApi(
        '/v2/volumes/{volume_id}/snapshots', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteVolume operation.
     * @callback moduleapi/BlockStorageApi~deleteVolumeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Block Storage Volume
     * To delete a block storage volume, destroying all data and removing it from your account, send a DELETE request to &#x60;/v2/volumes/$VOLUME_ID&#x60;. No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.  
     * @param {String} volumeId The ID of the block storage volume.
     * @param {module:api/BlockStorageApi~deleteVolumeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVolume(volumeId, callback) {
      
      let postBody = null;
      // verify the required parameter 'volumeId' is set
      if (volumeId === undefined || volumeId === null) {
        throw new Error("Missing the required parameter 'volumeId' when calling deleteVolume");
      }

      let pathParams = {
        'volume_id': volumeId
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
        '/v2/volumes/{volume_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteVolumeByName operation.
     * @callback moduleapi/BlockStorageApi~deleteVolumeByNameCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Block Storage Volume by Name
     * Block storage volumes may also be deleted by name by sending a DELETE request with the volume&#x27;s **name** and the **region slug** for the region it is located in as query parameters to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&amp;region&#x3D;nyc1&#x60;. No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.  
     * @param {Object} opts Optional parameters
     * @param {String} opts.name The block storage volume&#x27;s name.
     * @param {module:model/RegionSlug} opts.region The slug identifier for the region where the resource is available.
     * @param {module:api/BlockStorageApi~deleteVolumeByNameCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVolumeByName(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'name': opts['name'],'region': opts['region']
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
        '/v2/volumes', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteVolumeSnapshotById operation.
     * @callback moduleapi/BlockStorageApi~deleteVolumeSnapshotByIdCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Volume Snapshot
     * To delete a volume snapshot, send a DELETE request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed. 
     * @param {module:model/SnapshotId} snapshotId Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.
     * @param {module:api/BlockStorageApi~deleteVolumeSnapshotByIdCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVolumeSnapshotById(snapshotId, callback) {
      
      let postBody = null;
      // verify the required parameter 'snapshotId' is set
      if (snapshotId === undefined || snapshotId === null) {
        throw new Error("Missing the required parameter 'snapshotId' when calling deleteVolumeSnapshotById");
      }

      let pathParams = {
        'snapshot_id': snapshotId
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
        '/v2/volumes/snapshot/{snapshot_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getVolume operation.
     * @callback moduleapi/BlockStorageApi~getVolumeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20116{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve an Existing Block Storage Volume
     * To show information about a block storage volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID&#x60;.  
     * @param {String} volumeId The ID of the block storage volume.
     * @param {module:api/BlockStorageApi~getVolumeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getVolume(volumeId, callback) {
      
      let postBody = null;
      // verify the required parameter 'volumeId' is set
      if (volumeId === undefined || volumeId === null) {
        throw new Error("Missing the required parameter 'volumeId' when calling getVolume");
      }

      let pathParams = {
        'volume_id': volumeId
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
      let returnType = InlineResponse20116;

      return this.apiClient.callApi(
        '/v2/volumes/{volume_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getVolumeSnapshotById operation.
     * @callback moduleapi/BlockStorageApi~getVolumeSnapshotByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20058{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retreive an Existing Volume Snapshot
     * To retrieve the details of a snapshot that has been created from a volume, send a GET request to &#x60;/v2/volumes/snapshots/$SNAPSHOT_ID&#x60;.  
     * @param {module:model/SnapshotId} snapshotId Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.
     * @param {module:api/BlockStorageApi~getVolumeSnapshotByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getVolumeSnapshotById(snapshotId, callback) {
      
      let postBody = null;
      // verify the required parameter 'snapshotId' is set
      if (snapshotId === undefined || snapshotId === null) {
        throw new Error("Missing the required parameter 'snapshotId' when calling getVolumeSnapshotById");
      }

      let pathParams = {
        'snapshot_id': snapshotId
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
      let returnType = InlineResponse20058;

      return this.apiClient.callApi(
        '/v2/volumes/snapshot/{snapshot_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listAllVolumes operation.
     * @callback moduleapi/BlockStorageApi~listAllVolumesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20057{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List All Block Storage Volumes
     * To list all of the block storage volumes available on your account, send a GET request to &#x60;/v2/volumes&#x60;. ## Filtering Results ### By Region The &#x60;region&#x60; may be provided as query paramater in order to restrict results to volumes available in a specific region. For example: &#x60;/v2/volumes?region&#x3D;nyc1&#x60; ### By Name It is also possible to list volumes on your account that match a specified name. To do so, send a GET request with the volume&#x27;s name as a query parameter to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&#x60;. **Note:** You can only create one volume per region with the same name. ### By Name and Region It is also possible to retrieve information about a block storage volume by name. To do so, send a GET request with the volume&#x27;s name and the region slug for the region it is located in as query parameters to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&amp;region&#x3D;nyc1&#x60;.   
     * @param {Object} opts Optional parameters
     * @param {String} opts.name The block storage volume&#x27;s name.
     * @param {module:model/RegionSlug} opts.region The slug identifier for the region where the resource is available.
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageApi~listAllVolumesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllVolumes(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'name': opts['name'],'region': opts['region'],'per_page': opts['perPage'],'page': opts['page']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20057;

      return this.apiClient.callApi(
        '/v2/volumes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listVolumeSnapshots operation.
     * @callback moduleapi/BlockStorageApi~listVolumeSnapshotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20060{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Snapshots for a Volume
     * To retrieve the snapshots that have been created from a volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/snapshots&#x60;.  
     * @param {String} volumeId The ID of the block storage volume.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageApi~listVolumeSnapshotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listVolumeSnapshots(volumeId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'volumeId' is set
      if (volumeId === undefined || volumeId === null) {
        throw new Error("Missing the required parameter 'volumeId' when calling listVolumeSnapshots");
      }

      let pathParams = {
        'volume_id': volumeId
      };
      let queryParams = {
        'per_page': opts['perPage'],'page': opts['page']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse20060;

      return this.apiClient.callApi(
        '/v2/volumes/{volume_id}/snapshots', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}
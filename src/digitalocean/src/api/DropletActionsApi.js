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
import {DropletIdActionsBody} from '../model/DropletIdActionsBody';
import {DropletsActionsBody} from '../model/DropletsActionsBody';
import {Error} from '../model/Error';
import {InlineResponse2004} from '../model/InlineResponse2004';
import {InlineResponse2005} from '../model/InlineResponse2005';
import {InlineResponse20110} from '../model/InlineResponse20110';

/**
* DropletActions service.
* @module api/DropletActionsApi
* @version 2.0
*/
export class DropletActionsApi {

    /**
    * Constructs a new DropletActionsApi. 
    * @alias module:api/DropletActionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the getDropletAction operation.
     * @callback moduleapi/DropletActionsApi~getDropletActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2005{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve a Droplet Action
     * To retrieve a Droplet action, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/actions/$ACTION_ID&#x60;.  The response will be a JSON object with a key called &#x60;action&#x60;. The value will be a Droplet action object. 
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Number} actionId A unique numeric ID that can be used to identify and reference an action.
     * @param {module:api/DropletActionsApi~getDropletActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletAction(dropletId, actionId, callback) {
      
      let postBody = null;
      // verify the required parameter 'dropletId' is set
      if (dropletId === undefined || dropletId === null) {
        throw new Error("Missing the required parameter 'dropletId' when calling getDropletAction");
      }
      // verify the required parameter 'actionId' is set
      if (actionId === undefined || actionId === null) {
        throw new Error("Missing the required parameter 'actionId' when calling getDropletAction");
      }

      let pathParams = {
        'droplet_id': dropletId,'action_id': actionId
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
      let returnType = InlineResponse2005;

      return this.apiClient.callApi(
        '/v2/droplets/{droplet_id}/actions/{action_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listDropletActions operation.
     * @callback moduleapi/DropletActionsApi~listDropletActionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2004{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Actions for a Droplet
     * To retrieve a list of all actions that have been executed for a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/actions&#x60;.  The results will be returned as a JSON object with an &#x60;actions&#x60; key. This will be set to an array filled with &#x60;action&#x60; objects containing the standard &#x60;action&#x60; attributes. 
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/DropletActionsApi~listDropletActionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletActions(dropletId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'dropletId' is set
      if (dropletId === undefined || dropletId === null) {
        throw new Error("Missing the required parameter 'dropletId' when calling listDropletActions");
      }

      let pathParams = {
        'droplet_id': dropletId
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
      let returnType = InlineResponse2004;

      return this.apiClient.callApi(
        '/v2/droplets/{droplet_id}/actions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the postDropletAction operation.
     * @callback moduleapi/DropletActionsApi~postDropletActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2005{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Initiate a Droplet Action
     * To initiate an action on a Droplet send a POST request to &#x60;/v2/droplets/$DROPLET_ID/actions&#x60;. In the JSON body to the request, set the &#x60;type&#x60; attribute to on of the supported action types:  | Action                                   | Details | | ---------------------------------------- | ----------- | | &lt;nobr&gt;&#x60;enable_backups&#x60;&lt;/nobr&gt;            | Enables backups for a Droplet | | &lt;nobr&gt;&#x60;disable_backups&#x60;&lt;/nobr&gt;           | Disables backups for a Droplet | | &lt;nobr&gt;&#x60;reboot&#x60;&lt;/nobr&gt;                    | Reboots a Droplet. A &#x60;reboot&#x60; action is an attempt to reboot the Droplet in a graceful way, similar to using the &#x60;reboot&#x60; command from the console. | | &lt;nobr&gt;&#x60;power_cycle&#x60;&lt;/nobr&gt;               | Power cycles a Droplet. A &#x60;powercycle&#x60; action is similar to pushing the reset button on a physical machine, it&#x27;s similar to booting from scratch. | | &lt;nobr&gt;&#x60;shutdown&#x60;&lt;/nobr&gt;                  | Shutsdown a Droplet. A shutdown action is an attempt to shutdown the Droplet in a graceful way, similar to using the &#x60;shutdown&#x60; command from the console. Since a &#x60;shutdown&#x60; command can fail, this action guarantees that the command is issued, not that it succeeds. The preferred way to turn off a Droplet is to attempt a shutdown, with a reasonable timeout, followed by a &#x60;power_off&#x60; action to ensure the Droplet is off. | | &lt;nobr&gt;&#x60;power_off&#x60;&lt;/nobr&gt;                 | Powers off a Droplet. A &#x60;power_off&#x60; event is a hard shutdown and should only be used if the &#x60;shutdown&#x60; action is not successful. It is similar to cutting the power on a server and could lead to complications. | | &lt;nobr&gt;&#x60;power_on&#x60;&lt;/nobr&gt;                  | Powers on a Droplet. | | &lt;nobr&gt;&#x60;restore&#x60;&lt;/nobr&gt;                   | Restore a Droplet using a backup image. The image ID that is passed in must be a backup of the current Droplet instance. The operation will leave any embedded SSH keys intact. | | &lt;nobr&gt;&#x60;password_reset&#x60;&lt;/nobr&gt;            | Resets the root password for a Droplet. A new password will be provided via email. It must be changed after first use. | | &lt;nobr&gt;&#x60;resize&#x60;&lt;/nobr&gt;                    | Resizes a Droplet. Set the &#x60;size&#x60; attribute to a size slug. If a permanent resize with disk changes included is desired, set the &#x60;disk&#x60; attribute to &#x60;true&#x60;. | | &lt;nobr&gt;&#x60;rebuild&#x60;&lt;/nobr&gt;                   | Rebuilds a Droplet from a new base image. Set the &#x60;image&#x60; attribute to an image ID or slug. | | &lt;nobr&gt;&#x60;rename&#x60;&lt;/nobr&gt;                    | Renames a Droplet. | | &lt;nobr&gt;&#x60;change_kernel&#x60;&lt;/nobr&gt;             | Changes a Droplet&#x27;s kernel. Only applies to Droplets with externally managed kernels. All Droplets created after March 2017 use internal kernels by default. | | &lt;nobr&gt;&#x60;enable_ipv6&#x60;&lt;/nobr&gt;               | Enables IPv6 for a Droplet. | | &lt;nobr&gt;&#x60;snapshot&#x60;&lt;/nobr&gt;                  | Takes a snapshot of a Droplet. | 
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {module:model/DropletIdActionsBody} opts.body The &#x60;type&#x60; attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.

     * @param {module:api/DropletActionsApi~postDropletActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postDropletAction(dropletId, opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];
      // verify the required parameter 'dropletId' is set
      if (dropletId === undefined || dropletId === null) {
        throw new Error("Missing the required parameter 'dropletId' when calling postDropletAction");
      }

      let pathParams = {
        'droplet_id': dropletId
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
      let returnType = InlineResponse2005;

      return this.apiClient.callApi(
        '/v2/droplets/{droplet_id}/actions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the postDropletActionByTag operation.
     * @callback moduleapi/DropletActionsApi~postDropletActionByTagCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20110{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Acting on Tagged Droplets
     * Some actions can be performed in bulk on tagged Droplets. The actions can be initiated by sending a POST to &#x60;/v2/droplets/actions?tag_name&#x3D;$TAG_NAME&#x60; with the action arguments.  Only a sub-set of action types are supported:  - &#x60;power_cycle&#x60; - &#x60;power_on&#x60; - &#x60;power_off&#x60; - &#x60;shutdown&#x60; - &#x60;enable_ipv6&#x60; - &#x60;enable_backups&#x60; - &#x60;disable_backups&#x60; - &#x60;snapshot&#x60; 
     * @param {Object} opts Optional parameters
     * @param {module:model/DropletsActionsBody} opts.body The &#x60;type&#x60; attribute set in the request body will specify the  action that
will be taken on the Droplet. Some actions will require additional
attributes to be set as well.

     * @param {String} opts.tagName Used to filter Droplets by a specific tag.
     * @param {module:api/DropletActionsApi~postDropletActionByTagCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postDropletActionByTag(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse20110;

      return this.apiClient.callApi(
        '/v2/droplets/actions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}
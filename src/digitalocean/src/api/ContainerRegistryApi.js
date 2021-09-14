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
import {DockerCredentials} from '../model/DockerCredentials';
import {Error} from '../model/Error';
import {InlineResponse20046} from '../model/InlineResponse20046';
import {InlineResponse20047} from '../model/InlineResponse20047';
import {InlineResponse20048} from '../model/InlineResponse20048';
import {InlineResponse20049} from '../model/InlineResponse20049';
import {InlineResponse20050} from '../model/InlineResponse20050';
import {InlineResponse20051} from '../model/InlineResponse20051';
import {RegistryCreate} from '../model/RegistryCreate';
import {RegistrySubscriptionBody} from '../model/RegistrySubscriptionBody';
import {Subscription} from '../model/Subscription';
import {UpdateRegistry} from '../model/UpdateRegistry';
import {ValidateRegistry} from '../model/ValidateRegistry';

/**
* ContainerRegistry service.
* @module api/ContainerRegistryApi
* @version 2.0
*/
export class ContainerRegistryApi {

    /**
    * Constructs a new ContainerRegistryApi. 
    * @alias module:api/ContainerRegistryApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the createRegistry operation.
     * @callback moduleapi/ContainerRegistryApi~createRegistryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20046{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Container Registry
     * To create your container registry, send a POST request to &#x60;/v2/registry&#x60;.  The &#x60;name&#x60; becomes part of the URL for images stored in the registry. For example, if your registry is called &#x60;example&#x60;, an image in it will have the URL &#x60;registry.digitalocean.com/example/image:tag&#x60;. 
     * @param {module:model/RegistryCreate} body 
     * @param {module:api/ContainerRegistryApi~createRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createRegistry(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createRegistry");
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
      let returnType = InlineResponse20046;

      return this.apiClient.callApi(
        '/v2/registry', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteRegistry operation.
     * @callback moduleapi/ContainerRegistryApi~deleteRegistryCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Container Registry
     * To delete your container registry, destroying all container image data stored in it, send a DELETE request to &#x60;/v2/registry&#x60;.
     * @param {module:api/ContainerRegistryApi~deleteRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRegistry(callback) {
      
      let postBody = null;

      let pathParams = {
        
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
        '/v2/registry', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteRepositoryManifest operation.
     * @callback moduleapi/ContainerRegistryApi~deleteRepositoryManifestCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Container Registry Repository Manifest
     * To delete a container repository manifest by digest, send a DELETE request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to delete &#x60;registry.digitalocean.com/example/my/repo@sha256:abcd&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
     * @param {String} registryName The name of a container registry.
     * @param {String} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {String} manifestDigest The manifest digest of a container registry repository tag.
     * @param {module:api/ContainerRegistryApi~deleteRepositoryManifestCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRepositoryManifest(registryName, repositoryName, manifestDigest, callback) {
      
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling deleteRepositoryManifest");
      }
      // verify the required parameter 'repositoryName' is set
      if (repositoryName === undefined || repositoryName === null) {
        throw new Error("Missing the required parameter 'repositoryName' when calling deleteRepositoryManifest");
      }
      // verify the required parameter 'manifestDigest' is set
      if (manifestDigest === undefined || manifestDigest === null) {
        throw new Error("Missing the required parameter 'manifestDigest' when calling deleteRepositoryManifest");
      }

      let pathParams = {
        'registry_name': registryName,'repository_name': repositoryName,'manifest_digest': manifestDigest
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
        '/v2/registry/{registry_name}/{repository_name}/digests/{manifest_digest}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteRepositoryTag operation.
     * @callback moduleapi/ContainerRegistryApi~deleteRepositoryTagCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Container Registry Repository Tag
     * To delete a container repository tag, send a DELETE request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to delete &#x60;registry.digitalocean.com/example/my/repo:mytag&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/tags/mytag&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
     * @param {String} registryName The name of a container registry.
     * @param {String} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {String} repositoryTag The name of a container registry repository tag.
     * @param {module:api/ContainerRegistryApi~deleteRepositoryTagCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteRepositoryTag(registryName, repositoryName, repositoryTag, callback) {
      
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling deleteRepositoryTag");
      }
      // verify the required parameter 'repositoryName' is set
      if (repositoryName === undefined || repositoryName === null) {
        throw new Error("Missing the required parameter 'repositoryName' when calling deleteRepositoryTag");
      }
      // verify the required parameter 'repositoryTag' is set
      if (repositoryTag === undefined || repositoryTag === null) {
        throw new Error("Missing the required parameter 'repositoryTag' when calling deleteRepositoryTag");
      }

      let pathParams = {
        'registry_name': registryName,'repository_name': repositoryName,'repository_tag': repositoryTag
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
        '/v2/registry/{registry_name}/{repository_name}/tags/{repository_tag}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getDockerCredentials operation.
     * @callback moduleapi/ContainerRegistryApi~getDockerCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DockerCredentials{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Docker Credentials for Container Registry
     * In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to &#x60;/v2/registry/docker-credentials&#x60;.  The response will be in the format of a Docker &#x60;config.json&#x60; file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file&#x3D;.dockerconfigjson&#x3D;config.json \\       --type&#x3D;kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: &#x60;/v2/registry/docker-credentials?read_write&#x3D;true&#x60;  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: &#x60;/v2/registry/docker-credentials?expiry_seconds&#x3D;3600&#x60; will return credentials that expire after one hour. 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expirySeconds The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire. (default to <.>)
     * @param {Boolean} opts.readWrite By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials. (default to <.>)
     * @param {module:api/ContainerRegistryApi~getDockerCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDockerCredentials(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'expiry_seconds': opts['expirySeconds'],'read_write': opts['readWrite']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = DockerCredentials;

      return this.apiClient.callApi(
        '/v2/registry/docker-credentials', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getGarbageCollection operation.
     * @callback moduleapi/ContainerRegistryApi~getGarbageCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20049{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Active Garbage Collection
     * To get information about the currently-active garbage collection for a registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {module:api/ContainerRegistryApi~getGarbageCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getGarbageCollection(registryName, callback) {
      
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling getGarbageCollection");
      }

      let pathParams = {
        'registry_name': registryName
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
      let returnType = InlineResponse20049;

      return this.apiClient.callApi(
        '/v2/registry/{registry_name}/garbage-collection', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getRegistry operation.
     * @callback moduleapi/ContainerRegistryApi~getRegistryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20046{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Container Registry Information
     * To get information about your container registry, send a GET request to &#x60;/v2/registry&#x60;.
     * @param {module:api/ContainerRegistryApi~getRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getRegistry(callback) {
      
      let postBody = null;

      let pathParams = {
        
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
      let returnType = InlineResponse20046;

      return this.apiClient.callApi(
        '/v2/registry', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getRegistryOptions operation.
     * @callback moduleapi/ContainerRegistryApi~getRegistryOptionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20051{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Available Subscription Tiers
     * There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to &#x60;/v2/registry/options&#x60;.
     * @param {module:api/ContainerRegistryApi~getRegistryOptionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getRegistryOptions(callback) {
      
      let postBody = null;

      let pathParams = {
        
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
      let returnType = InlineResponse20051;

      return this.apiClient.callApi(
        '/v2/registry/options', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getRegistrySubscription operation.
     * @callback moduleapi/ContainerRegistryApi~getRegistrySubscriptionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Subscription{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Subscription Information
     * A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to &#x60;/v2/registry/subscription&#x60;.
     * @param {module:api/ContainerRegistryApi~getRegistrySubscriptionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getRegistrySubscription(callback) {
      
      let postBody = null;

      let pathParams = {
        
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
      let returnType = Subscription;

      return this.apiClient.callApi(
        '/v2/registry/subscription', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listGarbageCollections operation.
     * @callback moduleapi/ContainerRegistryApi~listGarbageCollectionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20050{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Garbage Collections
     * To get information about past garbage collections for a registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collections&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ContainerRegistryApi~listGarbageCollectionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listGarbageCollections(registryName, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling listGarbageCollections");
      }

      let pathParams = {
        'registry_name': registryName
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
      let returnType = InlineResponse20050;

      return this.apiClient.callApi(
        '/v2/registry/{registry_name}/garbage-collections', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listRegistryRepositories operation.
     * @callback moduleapi/ContainerRegistryApi~listRegistryRepositoriesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20047{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List All Container Registry Repositories
     * To list all repositories in your container registry, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/repositories&#x60;.
     * @param {String} registryName The name of a container registry.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ContainerRegistryApi~listRegistryRepositoriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listRegistryRepositories(registryName, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling listRegistryRepositories");
      }

      let pathParams = {
        'registry_name': registryName
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
      let returnType = InlineResponse20047;

      return this.apiClient.callApi(
        '/v2/registry/{registry_name}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listRepositoryTags operation.
     * @callback moduleapi/ContainerRegistryApi~listRepositoryTagsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20048{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List All Container Registry Repository Tags
     * To list all tags in your container registry repository, send a GET request to &#x60;/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags&#x60;.  Note that if your repository name contains &#x60;/&#x60; characters, it must be URL-encoded in the request URL. For example, to list tags for &#x60;registry.digitalocean.com/example/my/repo&#x60;, the path would be &#x60;/v2/registry/example/repositories/my%2Frepo/tags&#x60;. 
     * @param {String} registryName The name of a container registry.
     * @param {String} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ContainerRegistryApi~listRepositoryTagsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listRepositoryTags(registryName, repositoryName, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling listRepositoryTags");
      }
      // verify the required parameter 'repositoryName' is set
      if (repositoryName === undefined || repositoryName === null) {
        throw new Error("Missing the required parameter 'repositoryName' when calling listRepositoryTags");
      }

      let pathParams = {
        'registry_name': registryName,'repository_name': repositoryName
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
      let returnType = InlineResponse20048;

      return this.apiClient.callApi(
        '/v2/registry/{registry_name}/{repository_name}/tags', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the postRegistrySubscription operation.
     * @callback moduleapi/ContainerRegistryApi~postRegistrySubscriptionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Subscription{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Subscription Tier
     * After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to &#x60;/v2/registry/subscription&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/RegistrySubscriptionBody} opts.body 
     * @param {module:api/ContainerRegistryApi~postRegistrySubscriptionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postRegistrySubscription(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

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
      let returnType = Subscription;

      return this.apiClient.callApi(
        '/v2/registry/subscription', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the runGarbageCollection operation.
     * @callback moduleapi/ContainerRegistryApi~runGarbageCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20049{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Start Garbage Collection
     * Garbage collection enables users to clear out unreferenced blobs (layer &amp; manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection&#x60;. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as &#x60;success&#x60;. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients. 
     * @param {String} registryName The name of a container registry.
     * @param {module:api/ContainerRegistryApi~runGarbageCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    runGarbageCollection(registryName, callback) {
      
      let postBody = null;
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling runGarbageCollection");
      }

      let pathParams = {
        'registry_name': registryName
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
      let returnType = InlineResponse20049;

      return this.apiClient.callApi(
        '/v2/registry/{registry_name}/garbage-collection', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the updateGarbageCollection operation.
     * @callback moduleapi/ContainerRegistryApi~updateGarbageCollectionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20049{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Garbage Collection
     * To cancel the currently-active garbage collection for a registry, send a PUT request to &#x60;/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID&#x60; and specify one or more of the attributes below.
     * @param {module:model/UpdateRegistry} body 
     * @param {String} registryName The name of a container registry.
     * @param {String} garbageCollectionUuid The UUID of a garbage collection run.
     * @param {module:api/ContainerRegistryApi~updateGarbageCollectionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateGarbageCollection(body, registryName, garbageCollectionUuid, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateGarbageCollection");
      }
      // verify the required parameter 'registryName' is set
      if (registryName === undefined || registryName === null) {
        throw new Error("Missing the required parameter 'registryName' when calling updateGarbageCollection");
      }
      // verify the required parameter 'garbageCollectionUuid' is set
      if (garbageCollectionUuid === undefined || garbageCollectionUuid === null) {
        throw new Error("Missing the required parameter 'garbageCollectionUuid' when calling updateGarbageCollection");
      }

      let pathParams = {
        'registry_name': registryName,'garbage_collection_uuid': garbageCollectionUuid
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
      let returnType = InlineResponse20049;

      return this.apiClient.callApi(
        '/v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the validateRegistryName operation.
     * @callback moduleapi/ContainerRegistryApi~validateRegistryNameCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Validate a Container Registry Name
     * To validate that a container registry name is available for use, send a POST request to &#x60;/v2/registry/validate-name&#x60;.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict. 
     * @param {module:model/ValidateRegistry} body 
     * @param {module:api/ContainerRegistryApi~validateRegistryNameCallback} callback The callback function, accepting three arguments: error, data, response
     */
    validateRegistryName(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling validateRegistryName");
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
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/registry/validate-name', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}
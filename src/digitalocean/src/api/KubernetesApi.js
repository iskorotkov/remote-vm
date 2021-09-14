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
import {AssociatedKubernetesResources} from '../model/AssociatedKubernetesResources';
import {Cluster} from '../model/Cluster';
import {ClusterIdUpgradeBody} from '../model/ClusterIdUpgradeBody';
import {ClusterRegistries} from '../model/ClusterRegistries';
import {ClusterUpdate} from '../model/ClusterUpdate';
import {ClusterlintRequest} from '../model/ClusterlintRequest';
import {ClusterlintResults} from '../model/ClusterlintResults';
import {Credentials} from '../model/Credentials';
import {DestroyAssociatedKubernetesResources} from '../model/DestroyAssociatedKubernetesResources';
import {Error} from '../model/Error';
import {InlineResponse20035} from '../model/InlineResponse20035';
import {InlineResponse20036} from '../model/InlineResponse20036';
import {InlineResponse20037} from '../model/InlineResponse20037';
import {InlineResponse20038} from '../model/InlineResponse20038';
import {InlineResponse20112} from '../model/InlineResponse20112';
import {InlineResponse20113} from '../model/InlineResponse20113';
import {InlineResponse2024} from '../model/InlineResponse2024';
import {InlineResponse2025} from '../model/InlineResponse2025';
import {KubernetesNodePool} from '../model/KubernetesNodePool';
import {KubernetesNodePoolUpdate} from '../model/KubernetesNodePoolUpdate';
import {KubernetesOptions} from '../model/KubernetesOptions';
import {NodePoolIdRecycleBody} from '../model/NodePoolIdRecycleBody';
import {User} from '../model/User';

/**
* Kubernetes service.
* @module api/KubernetesApi
* @version 2.0
*/
export class KubernetesApi {

    /**
    * Constructs a new KubernetesApi. 
    * @alias module:api/KubernetesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the addKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~addKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20113{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a Node Pool to a Kubernetes Cluster
     * To add an additional node pool to a Kubernetes clusters, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools&#x60; with the following attributes. 
     * @param {module:model/KubernetesNodePool} body 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~addKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    addKubernetesNodePool(body, clusterId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling addKubernetesNodePool");
      }
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling addKubernetesNodePool");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = InlineResponse20113;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/node_pools', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the addRegistry operation.
     * @callback moduleapi/KubernetesApi~addRegistryCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Container Registry to Kubernetes Clusters
     * To integrate the container registry with Kubernetes clusters, send a POST request to &#x60;/v2/kubernetes/registry&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/ClusterRegistries} opts.body 
     * @param {module:api/KubernetesApi~addRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addRegistry(opts, callback) {
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
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/kubernetes/registry', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the createKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~createKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20112{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a New Kubernetes Cluster
     * To create a new Kubernetes cluster, send a POST request to &#x60;/v2/kubernetes/clusters&#x60;. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details. 
     * @param {module:model/Cluster} body 
     * @param {module:api/KubernetesApi~createKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createKubernetesCluster(body, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createKubernetesCluster");
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
      let returnType = InlineResponse20112;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~deleteKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Kubernetes Cluster
     * To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60;.  A 204 status code with no body will be returned in response to a successful request. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~deleteKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKubernetesCluster(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling deleteKubernetesCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
        '/v2/kubernetes/clusters/{cluster_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteKubernetesNode operation.
     * @callback moduleapi/KubernetesApi~deleteKubernetesNodeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Node in a Kubernetes Cluster
     * To delete a single node in a pool, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID&#x60;.  Appending the &#x60;skip_drain&#x3D;1&#x60; query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.  Appending the &#x60;replace&#x3D;1&#x60; query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {String} nodeId A unique ID that can be used to reference a node in a Kubernetes node pool.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.skipDrain Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion. (default to <.>)
     * @param {Number} opts.replace Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement. (default to <.>)
     * @param {module:api/KubernetesApi~deleteKubernetesNodeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKubernetesNode(clusterId, nodePoolId, nodeId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling deleteKubernetesNode");
      }
      // verify the required parameter 'nodePoolId' is set
      if (nodePoolId === undefined || nodePoolId === null) {
        throw new Error("Missing the required parameter 'nodePoolId' when calling deleteKubernetesNode");
      }
      // verify the required parameter 'nodeId' is set
      if (nodeId === undefined || nodeId === null) {
        throw new Error("Missing the required parameter 'nodeId' when calling deleteKubernetesNode");
      }

      let pathParams = {
        'cluster_id': clusterId,'node_pool_id': nodePoolId,'node_id': nodeId
      };
      let queryParams = {
        'skip_drain': opts['skipDrain'],'replace': opts['replace']
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
        '/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the deleteKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~deleteKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Node Pool in a Kubernetes Cluster
     * To delete a node pool, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60;.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~deleteKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKubernetesNodePool(clusterId, nodePoolId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling deleteKubernetesNodePool");
      }
      // verify the required parameter 'nodePoolId' is set
      if (nodePoolId === undefined || nodePoolId === null) {
        throw new Error("Missing the required parameter 'nodePoolId' when calling deleteKubernetesNodePool");
      }

      let pathParams = {
        'cluster_id': clusterId,'node_pool_id': nodePoolId
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
        '/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the destroyKubernetesAssociatedResourcesDangerous operation.
     * @callback moduleapi/KubernetesApi~destroyKubernetesAssociatedResourcesDangerousCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Cluster and All of its Associated Resources (Dangerous)
     * To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous&#x60;. A 204 status code with no body will be returned in response to a successful request. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~destroyKubernetesAssociatedResourcesDangerousCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyKubernetesAssociatedResourcesDangerous(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling destroyKubernetesAssociatedResourcesDangerous");
      }

      let pathParams = {
        'cluster_id': clusterId
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
        '/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the destroyKubernetesAssociatedResourcesSelective operation.
     * @callback moduleapi/KubernetesApi~destroyKubernetesAssociatedResourcesSelectiveCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Selectively Delete a Cluster and its Associated Resources
     * To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective&#x60;.  The JSON body of the request should include &#x60;load_balancers&#x60;, &#x60;volumes&#x60;, or &#x60;volume_snapshots&#x60; keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster&#x27;s associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account. 
     * @param {module:model/DestroyAssociatedKubernetesResources} body 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~destroyKubernetesAssociatedResourcesSelectiveCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyKubernetesAssociatedResourcesSelective(body, clusterId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling destroyKubernetesAssociatedResourcesSelective");
      }
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling destroyKubernetesAssociatedResourcesSelective");
      }

      let pathParams = {
        'cluster_id': clusterId
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
        '/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getAvailableUpgrades operation.
     * @callback moduleapi/KubernetesApi~getAvailableUpgradesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20036{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve Available Upgrades for an Existing Kubernetes Cluster
     * To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades&#x60;. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~getAvailableUpgradesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getAvailableUpgrades(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getAvailableUpgrades");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = InlineResponse20036;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/upgrades', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getClusterUser operation.
     * @callback moduleapi/KubernetesApi~getClusterUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve User Information for a Kubernetes Cluster
     * To show information the user associated with a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user&#x60;. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~getClusterUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getClusterUser(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterUser");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = User;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/user', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getClusterlintResults operation.
     * @callback moduleapi/KubernetesApi~getClusterlintResultsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClusterlintResults{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fetch Clusterlint Diagnostics for a Kubernetes Cluster
     * To request clusterlint diagnostics for your cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint&#x60;. If the &#x60;run_id&#x60; query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {String} opts.runId Specifies the clusterlint run whose results will be retrieved.
     * @param {module:api/KubernetesApi~getClusterlintResultsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getClusterlintResults(clusterId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getClusterlintResults");
      }

      let pathParams = {
        'cluster_id': clusterId
      };
      let queryParams = {
        'run_id': opts['runId']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ClusterlintResults;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/clusterlint', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getCredentials operation.
     * @callback moduleapi/KubernetesApi~getCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Credentials{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve Credentials for a Kubernetes Cluster
     * This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \&quot;[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\&quot;.  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials&#x60;.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds&#x3D;$DURATION_IN_SECONDS&#x60;. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expirySeconds The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry. (default to <.>)
     * @param {module:api/KubernetesApi~getCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getCredentials(clusterId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getCredentials");
      }

      let pathParams = {
        'cluster_id': clusterId
      };
      let queryParams = {
        'expiry_seconds': opts['expirySeconds']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Credentials;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/credentials', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getKubeconfig operation.
     * @callback moduleapi/KubernetesApi~getKubeconfigCallback
     * @param {String} error Error message, if any.
     * @param {'String'{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve the kubeconfig for a Kubernetes Cluster
     * This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, &#x60;kubectl&#x60;, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \&quot;[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\&quot;.  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig&#x60;.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds&#x3D;$DURATION_IN_SECONDS&#x60;. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expirySeconds The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry. (default to <.>)
     * @param {module:api/KubernetesApi~getKubeconfigCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getKubeconfig(clusterId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getKubeconfig");
      }

      let pathParams = {
        'cluster_id': clusterId
      };
      let queryParams = {
        'expiry_seconds': opts['expirySeconds']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearer_auth'];
      let contentTypes = [];
      let accepts = ['application/yaml', 'application/json'];
      let returnType = 'String';

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/kubeconfig', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~getKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20112{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve an Existing Kubernetes Cluster
     * To show information about an existing Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60;. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~getKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getKubernetesCluster(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getKubernetesCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = InlineResponse20112;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the getNodePool operation.
     * @callback moduleapi/KubernetesApi~getNodePoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20038{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve a Node Pool for a Kubernetes Cluster
     * To show information about a specific node pool in a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60;. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~getNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getNodePool(clusterId, nodePoolId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling getNodePool");
      }
      // verify the required parameter 'nodePoolId' is set
      if (nodePoolId === undefined || nodePoolId === null) {
        throw new Error("Missing the required parameter 'nodePoolId' when calling getNodePool");
      }

      let pathParams = {
        'cluster_id': clusterId,'node_pool_id': nodePoolId
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
      let returnType = InlineResponse20038;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listAllKubernetesClusters operation.
     * @callback moduleapi/KubernetesApi~listAllKubernetesClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20035{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List All Kubernetes Clusters
     * To list all of the Kubernetes clusters on your account, send a GET request to &#x60;/v2/kubernetes/clusters&#x60;. 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/KubernetesApi~listAllKubernetesClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllKubernetesClusters(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
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
      let returnType = InlineResponse20035;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listKubernetesAssociatedResources operation.
     * @callback moduleapi/KubernetesApi~listKubernetesAssociatedResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssociatedKubernetesResources{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Associated Resources for Cluster Deletion
     * To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources&#x60; endpoint.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~listKubernetesAssociatedResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listKubernetesAssociatedResources(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling listKubernetesAssociatedResources");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = AssociatedKubernetesResources;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listKubernetesOptions operation.
     * @callback moduleapi/KubernetesApi~listKubernetesOptionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/KubernetesOptions{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Available Regions, Node Sizes, and Versions of Kubernetes
     * To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to &#x60;/v2/kubernetes/options&#x60;.
     * @param {module:api/KubernetesApi~listKubernetesOptionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listKubernetesOptions(callback) {
      
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
      let returnType = KubernetesOptions;

      return this.apiClient.callApi(
        '/v2/kubernetes/options', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the listNodePools operation.
     * @callback moduleapi/KubernetesApi~listNodePoolsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20037{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List All Node Pools in a Kubernetes Clusters
     * To list all of the node pools in a Kubernetes clusters, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools&#x60;. 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~listNodePoolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listNodePools(clusterId, callback) {
      
      let postBody = null;
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling listNodePools");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = InlineResponse20037;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/node_pools', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the recycleKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~recycleKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Recycle a Kubernetes Node Pool
     * The endpoint has been deprecated. Please use the DELETE &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID&#x60; method instead. 
     * @param {module:model/NodePoolIdRecycleBody} body 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~recycleKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     */
    recycleKubernetesNodePool(body, clusterId, nodePoolId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling recycleKubernetesNodePool");
      }
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling recycleKubernetesNodePool");
      }
      // verify the required parameter 'nodePoolId' is set
      if (nodePoolId === undefined || nodePoolId === null) {
        throw new Error("Missing the required parameter 'nodePoolId' when calling recycleKubernetesNodePool");
      }

      let pathParams = {
        'cluster_id': clusterId,'node_pool_id': nodePoolId
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
        '/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the removeRegistry operation.
     * @callback moduleapi/KubernetesApi~removeRegistryCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove Container Registry from Kubernetes Clusters
     * To remove the container registry from Kubernetes clusters, send a DELETE request to &#x60;/v2/kubernetes/registry&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/ClusterRegistries} opts.body 
     * @param {module:api/KubernetesApi~removeRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removeRegistry(opts, callback) {
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
      let returnType = null;

      return this.apiClient.callApi(
        '/v2/kubernetes/registry', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the runClusterlint operation.
     * @callback moduleapi/KubernetesApi~runClusterlintCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2025{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Run Clusterlint Checks on a Kubernetes Cluster
     * Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint&#x60;. This will run all checks present in the &#x60;doks&#x60; group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {module:model/ClusterlintRequest} opts.body 
     * @param {module:api/KubernetesApi~runClusterlintCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    runClusterlint(clusterId, opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling runClusterlint");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = InlineResponse2025;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/clusterlint', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the updateKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~updateKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20112{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a Kubernetes Cluster
     * To update a Kubernetes cluster, send a PUT request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60; and specify one or more of the attributes below. 
     * @param {module:model/ClusterUpdate} body 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~updateKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateKubernetesCluster(body, clusterId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateKubernetesCluster");
      }
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling updateKubernetesCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
      let returnType = InlineResponse20112;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the updateKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~updateKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2024{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a Node Pool in a Kubernetes Cluster
     * To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60; with the following attributes. 
     * @param {module:model/KubernetesNodePoolUpdate} body 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~updateKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateKubernetesNodePool(body, clusterId, nodePoolId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateKubernetesNodePool");
      }
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling updateKubernetesNodePool");
      }
      // verify the required parameter 'nodePoolId' is set
      if (nodePoolId === undefined || nodePoolId === null) {
        throw new Error("Missing the required parameter 'nodePoolId' when calling updateKubernetesNodePool");
      }

      let pathParams = {
        'cluster_id': clusterId,'node_pool_id': nodePoolId
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
      let returnType = InlineResponse2024;

      return this.apiClient.callApi(
        '/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the upgradeKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~upgradeKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upgrade a Kubernetes Cluster
     * To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade&#x60;. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades&#x60;. 
     * @param {module:model/ClusterIdUpgradeBody} body 
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~upgradeKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    upgradeKubernetesCluster(body, clusterId, callback) {
      
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling upgradeKubernetesCluster");
      }
      // verify the required parameter 'clusterId' is set
      if (clusterId === undefined || clusterId === null) {
        throw new Error("Missing the required parameter 'clusterId' when calling upgradeKubernetesCluster");
      }

      let pathParams = {
        'cluster_id': clusterId
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
        '/v2/kubernetes/clusters/{cluster_id}/upgrade', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}
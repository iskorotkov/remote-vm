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
import { AssociatedKubernetesResources } from '../models';
import { Cluster } from '../models';
import { ClusterIdUpgradeBody } from '../models';
import { ClusterRegistries } from '../models';
import { ClusterUpdate } from '../models';
import { ClusterlintRequest } from '../models';
import { ClusterlintResults } from '../models';
import { Credentials } from '../models';
import { DestroyAssociatedKubernetesResources } from '../models';
import { InlineResponse20035 } from '../models';
import { InlineResponse20036 } from '../models';
import { InlineResponse20037 } from '../models';
import { InlineResponse20038 } from '../models';
import { InlineResponse20112 } from '../models';
import { InlineResponse20113 } from '../models';
import { InlineResponse2024 } from '../models';
import { InlineResponse2025 } from '../models';
import { KubernetesNodePool } from '../models';
import { KubernetesNodePoolUpdate } from '../models';
import { KubernetesOptions } from '../models';
import { NodePoolIdRecycleBody } from '../models';
import { User } from '../models';
/**
 * KubernetesApi - axios parameter creator
 * @export
 */
export const KubernetesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * To add an additional node pool to a Kubernetes clusters, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools` with the following attributes. 
         * @summary Add a Node Pool to a Kubernetes Cluster
         * @param {KubernetesNodePool} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addKubernetesNodePool: async (body: KubernetesNodePool, clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addKubernetesNodePool.');
            }
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling addKubernetesNodePool.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To integrate the container registry with Kubernetes clusters, send a POST request to `/v2/kubernetes/registry`.
         * @summary Add Container Registry to Kubernetes Clusters
         * @param {ClusterRegistries} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addRegistry: async (body?: ClusterRegistries, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/kubernetes/registry`;
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
         * To create a new Kubernetes cluster, send a POST request to `/v2/kubernetes/clusters`. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details. 
         * @summary Create a New Kubernetes Cluster
         * @param {Cluster} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createKubernetesCluster: async (body: Cluster, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createKubernetesCluster.');
            }
            const localVarPath = `/v2/kubernetes/clusters`;
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
         * To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`.  A 204 status code with no body will be returned in response to a successful request. 
         * @summary Delete a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteKubernetesCluster: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling deleteKubernetesCluster.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To delete a single node in a pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID`.  Appending the `skip_drain=1` query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to `0` carries out draining prior to deletion.  Appending the `replace=1` query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to `0` deletes without replacement. 
         * @summary Delete a Node in a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {string} nodeId A unique ID that can be used to reference a node in a Kubernetes node pool.
         * @param {number} [skipDrain] Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.
         * @param {number} [replace] Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteKubernetesNode: async (clusterId: string, nodePoolId: string, nodeId: string, skipDrain?: number, replace?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling deleteKubernetesNode.');
            }
            // verify required parameter 'nodePoolId' is not null or undefined
            if (nodePoolId === null || nodePoolId === undefined) {
                throw new RequiredError('nodePoolId','Required parameter nodePoolId was null or undefined when calling deleteKubernetesNode.');
            }
            // verify required parameter 'nodeId' is not null or undefined
            if (nodeId === null || nodeId === undefined) {
                throw new RequiredError('nodeId','Required parameter nodeId was null or undefined when calling deleteKubernetesNode.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)))
                .replace(`{${"node_pool_id"}}`, encodeURIComponent(String(nodePoolId)))
                .replace(`{${"node_id"}}`, encodeURIComponent(String(nodeId)));
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

            if (skipDrain !== undefined) {
                localVarQueryParameter['skip_drain'] = skipDrain;
            }

            if (replace !== undefined) {
                localVarQueryParameter['replace'] = replace;
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
         * To delete a node pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted. 
         * @summary Delete a Node Pool in a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteKubernetesNodePool: async (clusterId: string, nodePoolId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling deleteKubernetesNodePool.');
            }
            // verify required parameter 'nodePoolId' is not null or undefined
            if (nodePoolId === null || nodePoolId === undefined) {
                throw new RequiredError('nodePoolId','Required parameter nodePoolId was null or undefined when calling deleteKubernetesNodePool.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)))
                .replace(`{${"node_pool_id"}}`, encodeURIComponent(String(nodePoolId)));
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
         * To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous`. A 204 status code with no body will be returned in response to a successful request. 
         * @summary Delete a Cluster and All of its Associated Resources (Dangerous)
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyKubernetesAssociatedResourcesDangerous: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling destroyKubernetesAssociatedResourcesDangerous.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective`.  The JSON body of the request should include `load_balancers`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster's associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account. 
         * @summary Selectively Delete a Cluster and its Associated Resources
         * @param {DestroyAssociatedKubernetesResources} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyKubernetesAssociatedResourcesSelective: async (body: DestroyAssociatedKubernetesResources, clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling destroyKubernetesAssociatedResourcesSelective.');
            }
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling destroyKubernetesAssociatedResourcesSelective.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
         * @summary Retrieve Available Upgrades for an Existing Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAvailableUpgrades: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getAvailableUpgrades.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/upgrades`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To show information the user associated with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user`. 
         * @summary Retrieve User Information for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getClusterUser: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getClusterUser.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/user`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To request clusterlint diagnostics for your cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. If the `run_id` query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
         * @summary Fetch Clusterlint Diagnostics for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} [runId] Specifies the clusterlint run whose results will be retrieved.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getClusterlintResults: async (clusterId: string, runId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getClusterlintResults.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/clusterlint`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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

            if (runId !== undefined) {
                localVarQueryParameter['run_id'] = runId;
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
         * This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
         * @summary Retrieve Credentials for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCredentials: async (clusterId: string, expirySeconds?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getCredentials.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/credentials`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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

            if (expirySeconds !== undefined) {
                localVarQueryParameter['expiry_seconds'] = expirySeconds;
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
         * This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, `kubectl`, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
         * @summary Retrieve the kubeconfig for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKubeconfig: async (clusterId: string, expirySeconds?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getKubeconfig.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/kubeconfig`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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

            if (expirySeconds !== undefined) {
                localVarQueryParameter['expiry_seconds'] = expirySeconds;
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
         * To show information about an existing Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`. 
         * @summary Retrieve an Existing Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKubernetesCluster: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getKubernetesCluster.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To show information about a specific node pool in a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`. 
         * @summary Retrieve a Node Pool for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNodePool: async (clusterId: string, nodePoolId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling getNodePool.');
            }
            // verify required parameter 'nodePoolId' is not null or undefined
            if (nodePoolId === null || nodePoolId === undefined) {
                throw new RequiredError('nodePoolId','Required parameter nodePoolId was null or undefined when calling getNodePool.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)))
                .replace(`{${"node_pool_id"}}`, encodeURIComponent(String(nodePoolId)));
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
         * To list all of the Kubernetes clusters on your account, send a GET request to `/v2/kubernetes/clusters`. 
         * @summary List All Kubernetes Clusters
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllKubernetesClusters: async (perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/kubernetes/clusters`;
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

            if (perPage !== undefined) {
                localVarQueryParameter['per_page'] = perPage;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
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
         * To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources` endpoint.
         * @summary List Associated Resources for Cluster Deletion
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listKubernetesAssociatedResources: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling listKubernetesAssociatedResources.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to `/v2/kubernetes/options`.
         * @summary List Available Regions, Node Sizes, and Versions of Kubernetes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listKubernetesOptions: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/kubernetes/options`;
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
         * To list all of the node pools in a Kubernetes clusters, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools`. 
         * @summary List All Node Pools in a Kubernetes Clusters
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listNodePools: async (clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling listNodePools.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * The endpoint has been deprecated. Please use the DELETE `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID` method instead. 
         * @summary Recycle a Kubernetes Node Pool
         * @param {NodePoolIdRecycleBody} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        recycleKubernetesNodePool: async (body: NodePoolIdRecycleBody, clusterId: string, nodePoolId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling recycleKubernetesNodePool.');
            }
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling recycleKubernetesNodePool.');
            }
            // verify required parameter 'nodePoolId' is not null or undefined
            if (nodePoolId === null || nodePoolId === undefined) {
                throw new RequiredError('nodePoolId','Required parameter nodePoolId was null or undefined when calling recycleKubernetesNodePool.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)))
                .replace(`{${"node_pool_id"}}`, encodeURIComponent(String(nodePoolId)));
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
         * To remove the container registry from Kubernetes clusters, send a DELETE request to `/v2/kubernetes/registry`.
         * @summary Remove Container Registry from Kubernetes Clusters
         * @param {ClusterRegistries} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeRegistry: async (body?: ClusterRegistries, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/kubernetes/registry`;
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
         * Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. This will run all checks present in the `doks` group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
         * @summary Run Clusterlint Checks on a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {ClusterlintRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        runClusterlint: async (clusterId: string, body?: ClusterlintRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling runClusterlint.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/clusterlint`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To update a Kubernetes cluster, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID` and specify one or more of the attributes below. 
         * @summary Update a Kubernetes Cluster
         * @param {ClusterUpdate} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateKubernetesCluster: async (body: ClusterUpdate, clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateKubernetesCluster.');
            }
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling updateKubernetesCluster.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
         * To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID` with the following attributes. 
         * @summary Update a Node Pool in a Kubernetes Cluster
         * @param {KubernetesNodePoolUpdate} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateKubernetesNodePool: async (body: KubernetesNodePoolUpdate, clusterId: string, nodePoolId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateKubernetesNodePool.');
            }
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling updateKubernetesNodePool.');
            }
            // verify required parameter 'nodePoolId' is not null or undefined
            if (nodePoolId === null || nodePoolId === undefined) {
                throw new RequiredError('nodePoolId','Required parameter nodePoolId was null or undefined when calling updateKubernetesNodePool.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)))
                .replace(`{${"node_pool_id"}}`, encodeURIComponent(String(nodePoolId)));
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
         * To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade`. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
         * @summary Upgrade a Kubernetes Cluster
         * @param {ClusterIdUpgradeBody} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        upgradeKubernetesCluster: async (body: ClusterIdUpgradeBody, clusterId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling upgradeKubernetesCluster.');
            }
            // verify required parameter 'clusterId' is not null or undefined
            if (clusterId === null || clusterId === undefined) {
                throw new RequiredError('clusterId','Required parameter clusterId was null or undefined when calling upgradeKubernetesCluster.');
            }
            const localVarPath = `/v2/kubernetes/clusters/{cluster_id}/upgrade`
                .replace(`{${"cluster_id"}}`, encodeURIComponent(String(clusterId)));
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
    }
};

/**
 * KubernetesApi - functional programming interface
 * @export
 */
export const KubernetesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * To add an additional node pool to a Kubernetes clusters, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools` with the following attributes. 
         * @summary Add a Node Pool to a Kubernetes Cluster
         * @param {KubernetesNodePool} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addKubernetesNodePool(body: KubernetesNodePool, clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20113>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).addKubernetesNodePool(body, clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To integrate the container registry with Kubernetes clusters, send a POST request to `/v2/kubernetes/registry`.
         * @summary Add Container Registry to Kubernetes Clusters
         * @param {ClusterRegistries} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addRegistry(body?: ClusterRegistries, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).addRegistry(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To create a new Kubernetes cluster, send a POST request to `/v2/kubernetes/clusters`. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details. 
         * @summary Create a New Kubernetes Cluster
         * @param {Cluster} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createKubernetesCluster(body: Cluster, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20112>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).createKubernetesCluster(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`.  A 204 status code with no body will be returned in response to a successful request. 
         * @summary Delete a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteKubernetesCluster(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).deleteKubernetesCluster(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a single node in a pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID`.  Appending the `skip_drain=1` query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to `0` carries out draining prior to deletion.  Appending the `replace=1` query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to `0` deletes without replacement. 
         * @summary Delete a Node in a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {string} nodeId A unique ID that can be used to reference a node in a Kubernetes node pool.
         * @param {number} [skipDrain] Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.
         * @param {number} [replace] Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteKubernetesNode(clusterId: string, nodePoolId: string, nodeId: string, skipDrain?: number, replace?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).deleteKubernetesNode(clusterId, nodePoolId, nodeId, skipDrain, replace, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a node pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted. 
         * @summary Delete a Node Pool in a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteKubernetesNodePool(clusterId: string, nodePoolId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).deleteKubernetesNodePool(clusterId, nodePoolId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous`. A 204 status code with no body will be returned in response to a successful request. 
         * @summary Delete a Cluster and All of its Associated Resources (Dangerous)
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyKubernetesAssociatedResourcesDangerous(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).destroyKubernetesAssociatedResourcesDangerous(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective`.  The JSON body of the request should include `load_balancers`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster's associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account. 
         * @summary Selectively Delete a Cluster and its Associated Resources
         * @param {DestroyAssociatedKubernetesResources} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyKubernetesAssociatedResourcesSelective(body: DestroyAssociatedKubernetesResources, clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).destroyKubernetesAssociatedResourcesSelective(body, clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
         * @summary Retrieve Available Upgrades for an Existing Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAvailableUpgrades(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20036>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getAvailableUpgrades(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information the user associated with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user`. 
         * @summary Retrieve User Information for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getClusterUser(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getClusterUser(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To request clusterlint diagnostics for your cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. If the `run_id` query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
         * @summary Fetch Clusterlint Diagnostics for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} [runId] Specifies the clusterlint run whose results will be retrieved.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getClusterlintResults(clusterId: string, runId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ClusterlintResults>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getClusterlintResults(clusterId, runId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
         * @summary Retrieve Credentials for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCredentials(clusterId: string, expirySeconds?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Credentials>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getCredentials(clusterId, expirySeconds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, `kubectl`, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
         * @summary Retrieve the kubeconfig for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getKubeconfig(clusterId: string, expirySeconds?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getKubeconfig(clusterId, expirySeconds, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an existing Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`. 
         * @summary Retrieve an Existing Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getKubernetesCluster(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20112>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getKubernetesCluster(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about a specific node pool in a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`. 
         * @summary Retrieve a Node Pool for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getNodePool(clusterId: string, nodePoolId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20038>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).getNodePool(clusterId, nodePoolId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the Kubernetes clusters on your account, send a GET request to `/v2/kubernetes/clusters`. 
         * @summary List All Kubernetes Clusters
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAllKubernetesClusters(perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20035>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).listAllKubernetesClusters(perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources` endpoint.
         * @summary List Associated Resources for Cluster Deletion
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listKubernetesAssociatedResources(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AssociatedKubernetesResources>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).listKubernetesAssociatedResources(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to `/v2/kubernetes/options`.
         * @summary List Available Regions, Node Sizes, and Versions of Kubernetes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listKubernetesOptions(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<KubernetesOptions>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).listKubernetesOptions(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the node pools in a Kubernetes clusters, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools`. 
         * @summary List All Node Pools in a Kubernetes Clusters
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listNodePools(clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20037>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).listNodePools(clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * The endpoint has been deprecated. Please use the DELETE `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID` method instead. 
         * @summary Recycle a Kubernetes Node Pool
         * @param {NodePoolIdRecycleBody} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async recycleKubernetesNodePool(body: NodePoolIdRecycleBody, clusterId: string, nodePoolId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).recycleKubernetesNodePool(body, clusterId, nodePoolId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To remove the container registry from Kubernetes clusters, send a DELETE request to `/v2/kubernetes/registry`.
         * @summary Remove Container Registry from Kubernetes Clusters
         * @param {ClusterRegistries} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeRegistry(body?: ClusterRegistries, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).removeRegistry(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. This will run all checks present in the `doks` group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
         * @summary Run Clusterlint Checks on a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {ClusterlintRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async runClusterlint(clusterId: string, body?: ClusterlintRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2025>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).runClusterlint(clusterId, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To update a Kubernetes cluster, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID` and specify one or more of the attributes below. 
         * @summary Update a Kubernetes Cluster
         * @param {ClusterUpdate} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateKubernetesCluster(body: ClusterUpdate, clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20112>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).updateKubernetesCluster(body, clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID` with the following attributes. 
         * @summary Update a Node Pool in a Kubernetes Cluster
         * @param {KubernetesNodePoolUpdate} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateKubernetesNodePool(body: KubernetesNodePoolUpdate, clusterId: string, nodePoolId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2024>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).updateKubernetesNodePool(body, clusterId, nodePoolId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade`. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
         * @summary Upgrade a Kubernetes Cluster
         * @param {ClusterIdUpgradeBody} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async upgradeKubernetesCluster(body: ClusterIdUpgradeBody, clusterId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await KubernetesApiAxiosParamCreator(configuration).upgradeKubernetesCluster(body, clusterId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * KubernetesApi - factory interface
 * @export
 */
export const KubernetesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * To add an additional node pool to a Kubernetes clusters, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools` with the following attributes. 
         * @summary Add a Node Pool to a Kubernetes Cluster
         * @param {KubernetesNodePool} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addKubernetesNodePool(body: KubernetesNodePool, clusterId: string, options?: any): AxiosPromise<InlineResponse20113> {
            return KubernetesApiFp(configuration).addKubernetesNodePool(body, clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To integrate the container registry with Kubernetes clusters, send a POST request to `/v2/kubernetes/registry`.
         * @summary Add Container Registry to Kubernetes Clusters
         * @param {ClusterRegistries} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addRegistry(body?: ClusterRegistries, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).addRegistry(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To create a new Kubernetes cluster, send a POST request to `/v2/kubernetes/clusters`. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details. 
         * @summary Create a New Kubernetes Cluster
         * @param {Cluster} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createKubernetesCluster(body: Cluster, options?: any): AxiosPromise<InlineResponse20112> {
            return KubernetesApiFp(configuration).createKubernetesCluster(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`.  A 204 status code with no body will be returned in response to a successful request. 
         * @summary Delete a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteKubernetesCluster(clusterId: string, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).deleteKubernetesCluster(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a single node in a pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID`.  Appending the `skip_drain=1` query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to `0` carries out draining prior to deletion.  Appending the `replace=1` query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to `0` deletes without replacement. 
         * @summary Delete a Node in a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {string} nodeId A unique ID that can be used to reference a node in a Kubernetes node pool.
         * @param {number} [skipDrain] Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.
         * @param {number} [replace] Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteKubernetesNode(clusterId: string, nodePoolId: string, nodeId: string, skipDrain?: number, replace?: number, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).deleteKubernetesNode(clusterId, nodePoolId, nodeId, skipDrain, replace, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a node pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted. 
         * @summary Delete a Node Pool in a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteKubernetesNodePool(clusterId: string, nodePoolId: string, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).deleteKubernetesNodePool(clusterId, nodePoolId, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous`. A 204 status code with no body will be returned in response to a successful request. 
         * @summary Delete a Cluster and All of its Associated Resources (Dangerous)
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyKubernetesAssociatedResourcesDangerous(clusterId: string, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).destroyKubernetesAssociatedResourcesDangerous(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective`.  The JSON body of the request should include `load_balancers`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster's associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account. 
         * @summary Selectively Delete a Cluster and its Associated Resources
         * @param {DestroyAssociatedKubernetesResources} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyKubernetesAssociatedResourcesSelective(body: DestroyAssociatedKubernetesResources, clusterId: string, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).destroyKubernetesAssociatedResourcesSelective(body, clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
         * @summary Retrieve Available Upgrades for an Existing Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAvailableUpgrades(clusterId: string, options?: any): AxiosPromise<InlineResponse20036> {
            return KubernetesApiFp(configuration).getAvailableUpgrades(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information the user associated with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user`. 
         * @summary Retrieve User Information for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getClusterUser(clusterId: string, options?: any): AxiosPromise<User> {
            return KubernetesApiFp(configuration).getClusterUser(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To request clusterlint diagnostics for your cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. If the `run_id` query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
         * @summary Fetch Clusterlint Diagnostics for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} [runId] Specifies the clusterlint run whose results will be retrieved.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getClusterlintResults(clusterId: string, runId?: string, options?: any): AxiosPromise<ClusterlintResults> {
            return KubernetesApiFp(configuration).getClusterlintResults(clusterId, runId, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
         * @summary Retrieve Credentials for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCredentials(clusterId: string, expirySeconds?: number, options?: any): AxiosPromise<Credentials> {
            return KubernetesApiFp(configuration).getCredentials(clusterId, expirySeconds, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, `kubectl`, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
         * @summary Retrieve the kubeconfig for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKubeconfig(clusterId: string, expirySeconds?: number, options?: any): AxiosPromise<string> {
            return KubernetesApiFp(configuration).getKubeconfig(clusterId, expirySeconds, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an existing Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`. 
         * @summary Retrieve an Existing Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getKubernetesCluster(clusterId: string, options?: any): AxiosPromise<InlineResponse20112> {
            return KubernetesApiFp(configuration).getKubernetesCluster(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about a specific node pool in a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`. 
         * @summary Retrieve a Node Pool for a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getNodePool(clusterId: string, nodePoolId: string, options?: any): AxiosPromise<InlineResponse20038> {
            return KubernetesApiFp(configuration).getNodePool(clusterId, nodePoolId, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the Kubernetes clusters on your account, send a GET request to `/v2/kubernetes/clusters`. 
         * @summary List All Kubernetes Clusters
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllKubernetesClusters(perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20035> {
            return KubernetesApiFp(configuration).listAllKubernetesClusters(perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources` endpoint.
         * @summary List Associated Resources for Cluster Deletion
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listKubernetesAssociatedResources(clusterId: string, options?: any): AxiosPromise<AssociatedKubernetesResources> {
            return KubernetesApiFp(configuration).listKubernetesAssociatedResources(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to `/v2/kubernetes/options`.
         * @summary List Available Regions, Node Sizes, and Versions of Kubernetes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listKubernetesOptions(options?: any): AxiosPromise<KubernetesOptions> {
            return KubernetesApiFp(configuration).listKubernetesOptions(options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the node pools in a Kubernetes clusters, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools`. 
         * @summary List All Node Pools in a Kubernetes Clusters
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listNodePools(clusterId: string, options?: any): AxiosPromise<InlineResponse20037> {
            return KubernetesApiFp(configuration).listNodePools(clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * The endpoint has been deprecated. Please use the DELETE `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID` method instead. 
         * @summary Recycle a Kubernetes Node Pool
         * @param {NodePoolIdRecycleBody} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        recycleKubernetesNodePool(body: NodePoolIdRecycleBody, clusterId: string, nodePoolId: string, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).recycleKubernetesNodePool(body, clusterId, nodePoolId, options).then((request) => request(axios, basePath));
        },
        /**
         * To remove the container registry from Kubernetes clusters, send a DELETE request to `/v2/kubernetes/registry`.
         * @summary Remove Container Registry from Kubernetes Clusters
         * @param {ClusterRegistries} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeRegistry(body?: ClusterRegistries, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).removeRegistry(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. This will run all checks present in the `doks` group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
         * @summary Run Clusterlint Checks on a Kubernetes Cluster
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {ClusterlintRequest} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        runClusterlint(clusterId: string, body?: ClusterlintRequest, options?: any): AxiosPromise<InlineResponse2025> {
            return KubernetesApiFp(configuration).runClusterlint(clusterId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * To update a Kubernetes cluster, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID` and specify one or more of the attributes below. 
         * @summary Update a Kubernetes Cluster
         * @param {ClusterUpdate} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateKubernetesCluster(body: ClusterUpdate, clusterId: string, options?: any): AxiosPromise<InlineResponse20112> {
            return KubernetesApiFp(configuration).updateKubernetesCluster(body, clusterId, options).then((request) => request(axios, basePath));
        },
        /**
         * To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID` with the following attributes. 
         * @summary Update a Node Pool in a Kubernetes Cluster
         * @param {KubernetesNodePoolUpdate} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateKubernetesNodePool(body: KubernetesNodePoolUpdate, clusterId: string, nodePoolId: string, options?: any): AxiosPromise<InlineResponse2024> {
            return KubernetesApiFp(configuration).updateKubernetesNodePool(body, clusterId, nodePoolId, options).then((request) => request(axios, basePath));
        },
        /**
         * To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade`. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
         * @summary Upgrade a Kubernetes Cluster
         * @param {ClusterIdUpgradeBody} body 
         * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        upgradeKubernetesCluster(body: ClusterIdUpgradeBody, clusterId: string, options?: any): AxiosPromise<void> {
            return KubernetesApiFp(configuration).upgradeKubernetesCluster(body, clusterId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * KubernetesApi - object-oriented interface
 * @export
 * @class KubernetesApi
 * @extends {BaseAPI}
 */
export class KubernetesApi extends BaseAPI {
    /**
     * To add an additional node pool to a Kubernetes clusters, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools` with the following attributes. 
     * @summary Add a Node Pool to a Kubernetes Cluster
     * @param {KubernetesNodePool} body 
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public addKubernetesNodePool(body: KubernetesNodePool, clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).addKubernetesNodePool(body, clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To integrate the container registry with Kubernetes clusters, send a POST request to `/v2/kubernetes/registry`.
     * @summary Add Container Registry to Kubernetes Clusters
     * @param {ClusterRegistries} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public addRegistry(body?: ClusterRegistries, options?: any) {
        return KubernetesApiFp(this.configuration).addRegistry(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To create a new Kubernetes cluster, send a POST request to `/v2/kubernetes/clusters`. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details. 
     * @summary Create a New Kubernetes Cluster
     * @param {Cluster} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public createKubernetesCluster(body: Cluster, options?: any) {
        return KubernetesApiFp(this.configuration).createKubernetesCluster(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`.  A 204 status code with no body will be returned in response to a successful request. 
     * @summary Delete a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public deleteKubernetesCluster(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).deleteKubernetesCluster(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a single node in a pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID`.  Appending the `skip_drain=1` query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to `0` carries out draining prior to deletion.  Appending the `replace=1` query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to `0` deletes without replacement. 
     * @summary Delete a Node in a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {string} nodeId A unique ID that can be used to reference a node in a Kubernetes node pool.
     * @param {number} [skipDrain] Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.
     * @param {number} [replace] Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public deleteKubernetesNode(clusterId: string, nodePoolId: string, nodeId: string, skipDrain?: number, replace?: number, options?: any) {
        return KubernetesApiFp(this.configuration).deleteKubernetesNode(clusterId, nodePoolId, nodeId, skipDrain, replace, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a node pool, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted. 
     * @summary Delete a Node Pool in a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public deleteKubernetesNodePool(clusterId: string, nodePoolId: string, options?: any) {
        return KubernetesApiFp(this.configuration).deleteKubernetesNodePool(clusterId, nodePoolId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous`. A 204 status code with no body will be returned in response to a successful request. 
     * @summary Delete a Cluster and All of its Associated Resources (Dangerous)
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public destroyKubernetesAssociatedResourcesDangerous(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).destroyKubernetesAssociatedResourcesDangerous(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective`.  The JSON body of the request should include `load_balancers`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster's associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account. 
     * @summary Selectively Delete a Cluster and its Associated Resources
     * @param {DestroyAssociatedKubernetesResources} body 
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public destroyKubernetesAssociatedResourcesSelective(body: DestroyAssociatedKubernetesResources, clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).destroyKubernetesAssociatedResourcesSelective(body, clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
     * @summary Retrieve Available Upgrades for an Existing Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getAvailableUpgrades(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).getAvailableUpgrades(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information the user associated with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user`. 
     * @summary Retrieve User Information for a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getClusterUser(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).getClusterUser(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To request clusterlint diagnostics for your cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. If the `run_id` query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
     * @summary Fetch Clusterlint Diagnostics for a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {string} [runId] Specifies the clusterlint run whose results will be retrieved.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getClusterlintResults(clusterId: string, runId?: string, options?: any) {
        return KubernetesApiFp(this.configuration).getClusterlintResults(clusterId, runId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
     * @summary Retrieve Credentials for a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getCredentials(clusterId: string, expirySeconds?: number, options?: any) {
        return KubernetesApiFp(this.configuration).getCredentials(clusterId, expirySeconds, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, `kubectl`, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \"[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\".  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig`.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds=$DURATION_IN_SECONDS`. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 
     * @summary Retrieve the kubeconfig for a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {number} [expirySeconds] The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getKubeconfig(clusterId: string, expirySeconds?: number, options?: any) {
        return KubernetesApiFp(this.configuration).getKubeconfig(clusterId, expirySeconds, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an existing Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID`. 
     * @summary Retrieve an Existing Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getKubernetesCluster(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).getKubernetesCluster(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about a specific node pool in a Kubernetes cluster, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID`. 
     * @summary Retrieve a Node Pool for a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public getNodePool(clusterId: string, nodePoolId: string, options?: any) {
        return KubernetesApiFp(this.configuration).getNodePool(clusterId, nodePoolId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the Kubernetes clusters on your account, send a GET request to `/v2/kubernetes/clusters`. 
     * @summary List All Kubernetes Clusters
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public listAllKubernetesClusters(perPage?: number, page?: number, options?: any) {
        return KubernetesApiFp(this.configuration).listAllKubernetesClusters(perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources` endpoint.
     * @summary List Associated Resources for Cluster Deletion
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public listKubernetesAssociatedResources(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).listKubernetesAssociatedResources(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to `/v2/kubernetes/options`.
     * @summary List Available Regions, Node Sizes, and Versions of Kubernetes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public listKubernetesOptions(options?: any) {
        return KubernetesApiFp(this.configuration).listKubernetesOptions(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the node pools in a Kubernetes clusters, send a GET request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools`. 
     * @summary List All Node Pools in a Kubernetes Clusters
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public listNodePools(clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).listNodePools(clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * The endpoint has been deprecated. Please use the DELETE `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID` method instead. 
     * @summary Recycle a Kubernetes Node Pool
     * @param {NodePoolIdRecycleBody} body 
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public recycleKubernetesNodePool(body: NodePoolIdRecycleBody, clusterId: string, nodePoolId: string, options?: any) {
        return KubernetesApiFp(this.configuration).recycleKubernetesNodePool(body, clusterId, nodePoolId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To remove the container registry from Kubernetes clusters, send a DELETE request to `/v2/kubernetes/registry`.
     * @summary Remove Container Registry from Kubernetes Clusters
     * @param {ClusterRegistries} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public removeRegistry(body?: ClusterRegistries, options?: any) {
        return KubernetesApiFp(this.configuration).removeRegistry(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint`. This will run all checks present in the `doks` group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 
     * @summary Run Clusterlint Checks on a Kubernetes Cluster
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {ClusterlintRequest} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public runClusterlint(clusterId: string, body?: ClusterlintRequest, options?: any) {
        return KubernetesApiFp(this.configuration).runClusterlint(clusterId, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To update a Kubernetes cluster, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID` and specify one or more of the attributes below. 
     * @summary Update a Kubernetes Cluster
     * @param {ClusterUpdate} body 
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public updateKubernetesCluster(body: ClusterUpdate, clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).updateKubernetesCluster(body, clusterId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID` with the following attributes. 
     * @summary Update a Node Pool in a Kubernetes Cluster
     * @param {KubernetesNodePoolUpdate} body 
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {string} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public updateKubernetesNodePool(body: KubernetesNodePoolUpdate, clusterId: string, nodePoolId: string, options?: any) {
        return KubernetesApiFp(this.configuration).updateKubernetesNodePool(body, clusterId, nodePoolId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade`. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from `/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades`. 
     * @summary Upgrade a Kubernetes Cluster
     * @param {ClusterIdUpgradeBody} body 
     * @param {string} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof KubernetesApi
     */
    public upgradeKubernetesCluster(body: ClusterIdUpgradeBody, clusterId: string, options?: any) {
        return KubernetesApiFp(this.configuration).upgradeKubernetesCluster(body, clusterId, options).then((request) => request(this.axios, this.basePath));
    }
}

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
import { DockerCredentials } from '../models';
import { InlineResponse20046 } from '../models';
import { InlineResponse20047 } from '../models';
import { InlineResponse20048 } from '../models';
import { InlineResponse20049 } from '../models';
import { InlineResponse20050 } from '../models';
import { InlineResponse20051 } from '../models';
import { RegistryCreate } from '../models';
import { RegistrySubscriptionBody } from '../models';
import { Subscription } from '../models';
import { UpdateRegistry } from '../models';
import { ValidateRegistry } from '../models';
/**
 * ContainerRegistryApi - axios parameter creator
 * @export
 */
export const ContainerRegistryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * To create your container registry, send a POST request to `/v2/registry`.  The `name` becomes part of the URL for images stored in the registry. For example, if your registry is called `example`, an image in it will have the URL `registry.digitalocean.com/example/image:tag`. 
         * @summary Create Container Registry
         * @param {RegistryCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRegistry: async (body: RegistryCreate, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createRegistry.');
            }
            const localVarPath = `/v2/registry`;
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
         * To delete your container registry, destroying all container image data stored in it, send a DELETE request to `/v2/registry`.
         * @summary Delete Container Registry
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRegistry: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/registry`;
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
         * To delete a container repository manifest by digest, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo@sha256:abcd`, the path would be `/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete Container Registry Repository Manifest
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {string} manifestDigest The manifest digest of a container registry repository tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRepositoryManifest: async (registryName: string, repositoryName: string, manifestDigest: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling deleteRepositoryManifest.');
            }
            // verify required parameter 'repositoryName' is not null or undefined
            if (repositoryName === null || repositoryName === undefined) {
                throw new RequiredError('repositoryName','Required parameter repositoryName was null or undefined when calling deleteRepositoryManifest.');
            }
            // verify required parameter 'manifestDigest' is not null or undefined
            if (manifestDigest === null || manifestDigest === undefined) {
                throw new RequiredError('manifestDigest','Required parameter manifestDigest was null or undefined when calling deleteRepositoryManifest.');
            }
            const localVarPath = `/v2/registry/{registry_name}/{repository_name}/digests/{manifest_digest}`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)))
                .replace(`{${"repository_name"}}`, encodeURIComponent(String(repositoryName)))
                .replace(`{${"manifest_digest"}}`, encodeURIComponent(String(manifestDigest)));
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
         * To delete a container repository tag, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo:mytag`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags/mytag`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete Container Registry Repository Tag
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {string} repositoryTag The name of a container registry repository tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRepositoryTag: async (registryName: string, repositoryName: string, repositoryTag: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling deleteRepositoryTag.');
            }
            // verify required parameter 'repositoryName' is not null or undefined
            if (repositoryName === null || repositoryName === undefined) {
                throw new RequiredError('repositoryName','Required parameter repositoryName was null or undefined when calling deleteRepositoryTag.');
            }
            // verify required parameter 'repositoryTag' is not null or undefined
            if (repositoryTag === null || repositoryTag === undefined) {
                throw new RequiredError('repositoryTag','Required parameter repositoryTag was null or undefined when calling deleteRepositoryTag.');
            }
            const localVarPath = `/v2/registry/{registry_name}/{repository_name}/tags/{repository_tag}`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)))
                .replace(`{${"repository_name"}}`, encodeURIComponent(String(repositoryName)))
                .replace(`{${"repository_tag"}}`, encodeURIComponent(String(repositoryTag)));
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
         * In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to `/v2/registry/docker-credentials`.  The response will be in the format of a Docker `config.json` file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file=.dockerconfigjson=config.json \\       --type=kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: `/v2/registry/docker-credentials?read_write=true`  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: `/v2/registry/docker-credentials?expiry_seconds=3600` will return credentials that expire after one hour. 
         * @summary Get Docker Credentials for Container Registry
         * @param {number} [expirySeconds] The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.
         * @param {boolean} [readWrite] By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDockerCredentials: async (expirySeconds?: number, readWrite?: boolean, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/registry/docker-credentials`;
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

            if (readWrite !== undefined) {
                localVarQueryParameter['read_write'] = readWrite;
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
         * To get information about the currently-active garbage collection for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collection`.
         * @summary Get Active Garbage Collection
         * @param {string} registryName The name of a container registry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGarbageCollection: async (registryName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling getGarbageCollection.');
            }
            const localVarPath = `/v2/registry/{registry_name}/garbage-collection`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)));
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
         * To get information about your container registry, send a GET request to `/v2/registry`.
         * @summary Get Container Registry Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRegistry: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/registry`;
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
         * There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to `/v2/registry/options`.
         * @summary List Available Subscription Tiers
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRegistryOptions: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/registry/options`;
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
         * A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to `/v2/registry/subscription`.
         * @summary Get Subscription Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRegistrySubscription: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/registry/subscription`;
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
         * To get information about past garbage collections for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collections`.
         * @summary List Garbage Collections
         * @param {string} registryName The name of a container registry.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listGarbageCollections: async (registryName: string, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling listGarbageCollections.');
            }
            const localVarPath = `/v2/registry/{registry_name}/garbage-collections`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)));
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
         * To list all repositories in your container registry, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories`.
         * @summary List All Container Registry Repositories
         * @param {string} registryName The name of a container registry.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRegistryRepositories: async (registryName: string, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling listRegistryRepositories.');
            }
            const localVarPath = `/v2/registry/{registry_name}`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)));
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
         * To list all tags in your container registry repository, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to list tags for `registry.digitalocean.com/example/my/repo`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags`. 
         * @summary List All Container Registry Repository Tags
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRepositoryTags: async (registryName: string, repositoryName: string, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling listRepositoryTags.');
            }
            // verify required parameter 'repositoryName' is not null or undefined
            if (repositoryName === null || repositoryName === undefined) {
                throw new RequiredError('repositoryName','Required parameter repositoryName was null or undefined when calling listRepositoryTags.');
            }
            const localVarPath = `/v2/registry/{registry_name}/{repository_name}/tags`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)))
                .replace(`{${"repository_name"}}`, encodeURIComponent(String(repositoryName)));
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
         * After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to `/v2/registry/subscription`.
         * @summary Update Subscription Tier
         * @param {RegistrySubscriptionBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postRegistrySubscription: async (body?: RegistrySubscriptionBody, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/registry/subscription`;
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
         * Garbage collection enables users to clear out unreferenced blobs (layer & manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to `/v2/registry/$REGISTRY_NAME/garbage-collection`. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as `success`. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients. 
         * @summary Start Garbage Collection
         * @param {string} registryName The name of a container registry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        runGarbageCollection: async (registryName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling runGarbageCollection.');
            }
            const localVarPath = `/v2/registry/{registry_name}/garbage-collection`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)));
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
         * To cancel the currently-active garbage collection for a registry, send a PUT request to `/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID` and specify one or more of the attributes below.
         * @summary Update Garbage Collection
         * @param {UpdateRegistry} body 
         * @param {string} registryName The name of a container registry.
         * @param {string} garbageCollectionUuid The UUID of a garbage collection run.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateGarbageCollection: async (body: UpdateRegistry, registryName: string, garbageCollectionUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateGarbageCollection.');
            }
            // verify required parameter 'registryName' is not null or undefined
            if (registryName === null || registryName === undefined) {
                throw new RequiredError('registryName','Required parameter registryName was null or undefined when calling updateGarbageCollection.');
            }
            // verify required parameter 'garbageCollectionUuid' is not null or undefined
            if (garbageCollectionUuid === null || garbageCollectionUuid === undefined) {
                throw new RequiredError('garbageCollectionUuid','Required parameter garbageCollectionUuid was null or undefined when calling updateGarbageCollection.');
            }
            const localVarPath = `/v2/registry/{registry_name}/garbage-collection/{garbage_collection_uuid}`
                .replace(`{${"registry_name"}}`, encodeURIComponent(String(registryName)))
                .replace(`{${"garbage_collection_uuid"}}`, encodeURIComponent(String(garbageCollectionUuid)));
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
         * To validate that a container registry name is available for use, send a POST request to `/v2/registry/validate-name`.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict. 
         * @summary Validate a Container Registry Name
         * @param {ValidateRegistry} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validateRegistryName: async (body: ValidateRegistry, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling validateRegistryName.');
            }
            const localVarPath = `/v2/registry/validate-name`;
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
 * ContainerRegistryApi - functional programming interface
 * @export
 */
export const ContainerRegistryApiFp = function(configuration?: Configuration) {
    return {
        /**
         * To create your container registry, send a POST request to `/v2/registry`.  The `name` becomes part of the URL for images stored in the registry. For example, if your registry is called `example`, an image in it will have the URL `registry.digitalocean.com/example/image:tag`. 
         * @summary Create Container Registry
         * @param {RegistryCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRegistry(body: RegistryCreate, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20046>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).createRegistry(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete your container registry, destroying all container image data stored in it, send a DELETE request to `/v2/registry`.
         * @summary Delete Container Registry
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRegistry(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).deleteRegistry(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a container repository manifest by digest, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo@sha256:abcd`, the path would be `/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete Container Registry Repository Manifest
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {string} manifestDigest The manifest digest of a container registry repository tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRepositoryManifest(registryName: string, repositoryName: string, manifestDigest: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).deleteRepositoryManifest(registryName, repositoryName, manifestDigest, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a container repository tag, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo:mytag`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags/mytag`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete Container Registry Repository Tag
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {string} repositoryTag The name of a container registry repository tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRepositoryTag(registryName: string, repositoryName: string, repositoryTag: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).deleteRepositoryTag(registryName, repositoryName, repositoryTag, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to `/v2/registry/docker-credentials`.  The response will be in the format of a Docker `config.json` file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file=.dockerconfigjson=config.json \\       --type=kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: `/v2/registry/docker-credentials?read_write=true`  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: `/v2/registry/docker-credentials?expiry_seconds=3600` will return credentials that expire after one hour. 
         * @summary Get Docker Credentials for Container Registry
         * @param {number} [expirySeconds] The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.
         * @param {boolean} [readWrite] By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDockerCredentials(expirySeconds?: number, readWrite?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DockerCredentials>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).getDockerCredentials(expirySeconds, readWrite, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To get information about the currently-active garbage collection for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collection`.
         * @summary Get Active Garbage Collection
         * @param {string} registryName The name of a container registry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGarbageCollection(registryName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20049>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).getGarbageCollection(registryName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To get information about your container registry, send a GET request to `/v2/registry`.
         * @summary Get Container Registry Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRegistry(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20046>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).getRegistry(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to `/v2/registry/options`.
         * @summary List Available Subscription Tiers
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRegistryOptions(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20051>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).getRegistryOptions(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to `/v2/registry/subscription`.
         * @summary Get Subscription Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRegistrySubscription(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).getRegistrySubscription(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To get information about past garbage collections for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collections`.
         * @summary List Garbage Collections
         * @param {string} registryName The name of a container registry.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listGarbageCollections(registryName: string, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20050>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).listGarbageCollections(registryName, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all repositories in your container registry, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories`.
         * @summary List All Container Registry Repositories
         * @param {string} registryName The name of a container registry.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listRegistryRepositories(registryName: string, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20047>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).listRegistryRepositories(registryName, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all tags in your container registry repository, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to list tags for `registry.digitalocean.com/example/my/repo`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags`. 
         * @summary List All Container Registry Repository Tags
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listRepositoryTags(registryName: string, repositoryName: string, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20048>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).listRepositoryTags(registryName, repositoryName, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to `/v2/registry/subscription`.
         * @summary Update Subscription Tier
         * @param {RegistrySubscriptionBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postRegistrySubscription(body?: RegistrySubscriptionBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).postRegistrySubscription(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Garbage collection enables users to clear out unreferenced blobs (layer & manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to `/v2/registry/$REGISTRY_NAME/garbage-collection`. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as `success`. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients. 
         * @summary Start Garbage Collection
         * @param {string} registryName The name of a container registry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async runGarbageCollection(registryName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20049>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).runGarbageCollection(registryName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To cancel the currently-active garbage collection for a registry, send a PUT request to `/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID` and specify one or more of the attributes below.
         * @summary Update Garbage Collection
         * @param {UpdateRegistry} body 
         * @param {string} registryName The name of a container registry.
         * @param {string} garbageCollectionUuid The UUID of a garbage collection run.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateGarbageCollection(body: UpdateRegistry, registryName: string, garbageCollectionUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20049>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).updateGarbageCollection(body, registryName, garbageCollectionUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To validate that a container registry name is available for use, send a POST request to `/v2/registry/validate-name`.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict. 
         * @summary Validate a Container Registry Name
         * @param {ValidateRegistry} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async validateRegistryName(body: ValidateRegistry, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContainerRegistryApiAxiosParamCreator(configuration).validateRegistryName(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ContainerRegistryApi - factory interface
 * @export
 */
export const ContainerRegistryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * To create your container registry, send a POST request to `/v2/registry`.  The `name` becomes part of the URL for images stored in the registry. For example, if your registry is called `example`, an image in it will have the URL `registry.digitalocean.com/example/image:tag`. 
         * @summary Create Container Registry
         * @param {RegistryCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRegistry(body: RegistryCreate, options?: any): AxiosPromise<InlineResponse20046> {
            return ContainerRegistryApiFp(configuration).createRegistry(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete your container registry, destroying all container image data stored in it, send a DELETE request to `/v2/registry`.
         * @summary Delete Container Registry
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRegistry(options?: any): AxiosPromise<void> {
            return ContainerRegistryApiFp(configuration).deleteRegistry(options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a container repository manifest by digest, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo@sha256:abcd`, the path would be `/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete Container Registry Repository Manifest
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {string} manifestDigest The manifest digest of a container registry repository tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRepositoryManifest(registryName: string, repositoryName: string, manifestDigest: string, options?: any): AxiosPromise<void> {
            return ContainerRegistryApiFp(configuration).deleteRepositoryManifest(registryName, repositoryName, manifestDigest, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a container repository tag, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo:mytag`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags/mytag`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete Container Registry Repository Tag
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {string} repositoryTag The name of a container registry repository tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRepositoryTag(registryName: string, repositoryName: string, repositoryTag: string, options?: any): AxiosPromise<void> {
            return ContainerRegistryApiFp(configuration).deleteRepositoryTag(registryName, repositoryName, repositoryTag, options).then((request) => request(axios, basePath));
        },
        /**
         * In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to `/v2/registry/docker-credentials`.  The response will be in the format of a Docker `config.json` file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file=.dockerconfigjson=config.json \\       --type=kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: `/v2/registry/docker-credentials?read_write=true`  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: `/v2/registry/docker-credentials?expiry_seconds=3600` will return credentials that expire after one hour. 
         * @summary Get Docker Credentials for Container Registry
         * @param {number} [expirySeconds] The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.
         * @param {boolean} [readWrite] By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDockerCredentials(expirySeconds?: number, readWrite?: boolean, options?: any): AxiosPromise<DockerCredentials> {
            return ContainerRegistryApiFp(configuration).getDockerCredentials(expirySeconds, readWrite, options).then((request) => request(axios, basePath));
        },
        /**
         * To get information about the currently-active garbage collection for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collection`.
         * @summary Get Active Garbage Collection
         * @param {string} registryName The name of a container registry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGarbageCollection(registryName: string, options?: any): AxiosPromise<InlineResponse20049> {
            return ContainerRegistryApiFp(configuration).getGarbageCollection(registryName, options).then((request) => request(axios, basePath));
        },
        /**
         * To get information about your container registry, send a GET request to `/v2/registry`.
         * @summary Get Container Registry Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRegistry(options?: any): AxiosPromise<InlineResponse20046> {
            return ContainerRegistryApiFp(configuration).getRegistry(options).then((request) => request(axios, basePath));
        },
        /**
         * There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to `/v2/registry/options`.
         * @summary List Available Subscription Tiers
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRegistryOptions(options?: any): AxiosPromise<InlineResponse20051> {
            return ContainerRegistryApiFp(configuration).getRegistryOptions(options).then((request) => request(axios, basePath));
        },
        /**
         * A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to `/v2/registry/subscription`.
         * @summary Get Subscription Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRegistrySubscription(options?: any): AxiosPromise<Subscription> {
            return ContainerRegistryApiFp(configuration).getRegistrySubscription(options).then((request) => request(axios, basePath));
        },
        /**
         * To get information about past garbage collections for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collections`.
         * @summary List Garbage Collections
         * @param {string} registryName The name of a container registry.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listGarbageCollections(registryName: string, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20050> {
            return ContainerRegistryApiFp(configuration).listGarbageCollections(registryName, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all repositories in your container registry, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories`.
         * @summary List All Container Registry Repositories
         * @param {string} registryName The name of a container registry.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRegistryRepositories(registryName: string, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20047> {
            return ContainerRegistryApiFp(configuration).listRegistryRepositories(registryName, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all tags in your container registry repository, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to list tags for `registry.digitalocean.com/example/my/repo`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags`. 
         * @summary List All Container Registry Repository Tags
         * @param {string} registryName The name of a container registry.
         * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRepositoryTags(registryName: string, repositoryName: string, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20048> {
            return ContainerRegistryApiFp(configuration).listRepositoryTags(registryName, repositoryName, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to `/v2/registry/subscription`.
         * @summary Update Subscription Tier
         * @param {RegistrySubscriptionBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postRegistrySubscription(body?: RegistrySubscriptionBody, options?: any): AxiosPromise<Subscription> {
            return ContainerRegistryApiFp(configuration).postRegistrySubscription(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Garbage collection enables users to clear out unreferenced blobs (layer & manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to `/v2/registry/$REGISTRY_NAME/garbage-collection`. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as `success`. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients. 
         * @summary Start Garbage Collection
         * @param {string} registryName The name of a container registry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        runGarbageCollection(registryName: string, options?: any): AxiosPromise<InlineResponse20049> {
            return ContainerRegistryApiFp(configuration).runGarbageCollection(registryName, options).then((request) => request(axios, basePath));
        },
        /**
         * To cancel the currently-active garbage collection for a registry, send a PUT request to `/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID` and specify one or more of the attributes below.
         * @summary Update Garbage Collection
         * @param {UpdateRegistry} body 
         * @param {string} registryName The name of a container registry.
         * @param {string} garbageCollectionUuid The UUID of a garbage collection run.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateGarbageCollection(body: UpdateRegistry, registryName: string, garbageCollectionUuid: string, options?: any): AxiosPromise<InlineResponse20049> {
            return ContainerRegistryApiFp(configuration).updateGarbageCollection(body, registryName, garbageCollectionUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To validate that a container registry name is available for use, send a POST request to `/v2/registry/validate-name`.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict. 
         * @summary Validate a Container Registry Name
         * @param {ValidateRegistry} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validateRegistryName(body: ValidateRegistry, options?: any): AxiosPromise<void> {
            return ContainerRegistryApiFp(configuration).validateRegistryName(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ContainerRegistryApi - object-oriented interface
 * @export
 * @class ContainerRegistryApi
 * @extends {BaseAPI}
 */
export class ContainerRegistryApi extends BaseAPI {
    /**
     * To create your container registry, send a POST request to `/v2/registry`.  The `name` becomes part of the URL for images stored in the registry. For example, if your registry is called `example`, an image in it will have the URL `registry.digitalocean.com/example/image:tag`. 
     * @summary Create Container Registry
     * @param {RegistryCreate} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public createRegistry(body: RegistryCreate, options?: any) {
        return ContainerRegistryApiFp(this.configuration).createRegistry(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete your container registry, destroying all container image data stored in it, send a DELETE request to `/v2/registry`.
     * @summary Delete Container Registry
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public deleteRegistry(options?: any) {
        return ContainerRegistryApiFp(this.configuration).deleteRegistry(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a container repository manifest by digest, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/digests/$MANIFEST_DIGEST`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo@sha256:abcd`, the path would be `/v2/registry/example/repositories/my%2Frepo/digests/sha256:abcd`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
     * @summary Delete Container Registry Repository Manifest
     * @param {string} registryName The name of a container registry.
     * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {string} manifestDigest The manifest digest of a container registry repository tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public deleteRepositoryManifest(registryName: string, repositoryName: string, manifestDigest: string, options?: any) {
        return ContainerRegistryApiFp(this.configuration).deleteRepositoryManifest(registryName, repositoryName, manifestDigest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a container repository tag, send a DELETE request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags/$TAG`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to delete `registry.digitalocean.com/example/my/repo:mytag`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags/mytag`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
     * @summary Delete Container Registry Repository Tag
     * @param {string} registryName The name of a container registry.
     * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {string} repositoryTag The name of a container registry repository tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public deleteRepositoryTag(registryName: string, repositoryName: string, repositoryTag: string, options?: any) {
        return ContainerRegistryApiFp(this.configuration).deleteRepositoryTag(registryName, repositoryName, repositoryTag, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * In order to access your container registry with the Docker client or from a Kubernetes cluster, you will need to configure authentication. The necessary JSON configuration can be retrieved by sending a GET request to `/v2/registry/docker-credentials`.  The response will be in the format of a Docker `config.json` file. To use the config in your Kubernetes cluster, create a Secret with:      kubectl create secret generic docr \\       --from-file=.dockerconfigjson=config.json \\       --type=kubernetes.io/dockerconfigjson  By default, the returned credentials have read-only access to your registry and cannot be used to push images. This is appropriate for most Kubernetes clusters. To retrieve read/write credentials, suitable for use with the Docker client or in a CI system, read_write may be provided as query parameter. For example: `/v2/registry/docker-credentials?read_write=true`  By default, the returned credentials will not expire. To retrieve credentials with an expiry set, expiry_seconds may be provided as a query parameter. For example: `/v2/registry/docker-credentials?expiry_seconds=3600` will return credentials that expire after one hour. 
     * @summary Get Docker Credentials for Container Registry
     * @param {number} [expirySeconds] The duration in seconds that the returned registry credentials will be valid. If not set or 0, the credentials will not expire.
     * @param {boolean} [readWrite] By default, the registry credentials allow for read-only access. Set this query parameter to &#x60;true&#x60; to obtain read-write credentials.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public getDockerCredentials(expirySeconds?: number, readWrite?: boolean, options?: any) {
        return ContainerRegistryApiFp(this.configuration).getDockerCredentials(expirySeconds, readWrite, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To get information about the currently-active garbage collection for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collection`.
     * @summary Get Active Garbage Collection
     * @param {string} registryName The name of a container registry.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public getGarbageCollection(registryName: string, options?: any) {
        return ContainerRegistryApiFp(this.configuration).getGarbageCollection(registryName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To get information about your container registry, send a GET request to `/v2/registry`.
     * @summary Get Container Registry Information
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public getRegistry(options?: any) {
        return ContainerRegistryApiFp(this.configuration).getRegistry(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * There are multiple subscription tiers available for container registry. Each tier allows a different number of image repositories to be created in your registry, and has a different amount of storage and transfer included. To list the available subscription tiers, send a GET request to `/v2/registry/options`.
     * @summary List Available Subscription Tiers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public getRegistryOptions(options?: any) {
        return ContainerRegistryApiFp(this.configuration).getRegistryOptions(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * A subscription is automatically created when you configure your container registry. To get information about your subscription, send a GET request to `/v2/registry/subscription`.
     * @summary Get Subscription Information
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public getRegistrySubscription(options?: any) {
        return ContainerRegistryApiFp(this.configuration).getRegistrySubscription(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To get information about past garbage collections for a registry, send a GET request to `/v2/registry/$REGISTRY_NAME/garbage-collections`.
     * @summary List Garbage Collections
     * @param {string} registryName The name of a container registry.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public listGarbageCollections(registryName: string, perPage?: number, page?: number, options?: any) {
        return ContainerRegistryApiFp(this.configuration).listGarbageCollections(registryName, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all repositories in your container registry, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories`.
     * @summary List All Container Registry Repositories
     * @param {string} registryName The name of a container registry.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public listRegistryRepositories(registryName: string, perPage?: number, page?: number, options?: any) {
        return ContainerRegistryApiFp(this.configuration).listRegistryRepositories(registryName, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all tags in your container registry repository, send a GET request to `/v2/registry/$REGISTRY_NAME/repositories/$REPOSITORY_NAME/tags`.  Note that if your repository name contains `/` characters, it must be URL-encoded in the request URL. For example, to list tags for `registry.digitalocean.com/example/my/repo`, the path would be `/v2/registry/example/repositories/my%2Frepo/tags`. 
     * @summary List All Container Registry Repository Tags
     * @param {string} registryName The name of a container registry.
     * @param {string} repositoryName The name of a container registry repository. If the name contains &#x60;/&#x60; characters, they must be URL-encoded, e.g. &#x60;%2F&#x60;.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public listRepositoryTags(registryName: string, repositoryName: string, perPage?: number, page?: number, options?: any) {
        return ContainerRegistryApiFp(this.configuration).listRepositoryTags(registryName, repositoryName, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * After creating your registry, you can switch to a different subscription tier to better suit your needs. To do this, send a POST request to `/v2/registry/subscription`.
     * @summary Update Subscription Tier
     * @param {RegistrySubscriptionBody} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public postRegistrySubscription(body?: RegistrySubscriptionBody, options?: any) {
        return ContainerRegistryApiFp(this.configuration).postRegistrySubscription(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Garbage collection enables users to clear out unreferenced blobs (layer & manifest data) after deleting one or more manifests from a repository. If there are no unreferenced blobs resulting from the deletion of one or more manifests, garbage collection is effectively a noop. [See here for more information](https://www.digitalocean.com/docs/container-registry/how-to/clean-up-container-registry/) about how and why you should clean up your container registry periodically.  To request a garbage collection run on your registry, send a POST request to `/v2/registry/$REGISTRY_NAME/garbage-collection`. This will initiate the following sequence of events on your registry.  * Set the registry to read-only mode, meaning no further write-scoped   JWTs will be issued to registry clients. Existing write-scoped JWTs will   continue to work until they expire which can take up to 15 minutes. * Wait until all existing write-scoped JWTs have expired. * Scan all registry manifests to determine which blobs are unreferenced. * Delete all unreferenced blobs from the registry. * Record the number of blobs deleted and bytes freed, mark the garbage   collection status as `success`. * Remove the read-only mode restriction from the registry, meaning write-scoped   JWTs will once again be issued to registry clients. 
     * @summary Start Garbage Collection
     * @param {string} registryName The name of a container registry.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public runGarbageCollection(registryName: string, options?: any) {
        return ContainerRegistryApiFp(this.configuration).runGarbageCollection(registryName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To cancel the currently-active garbage collection for a registry, send a PUT request to `/v2/registry/$REGISTRY_NAME/garbage-collection/$GC_UUID` and specify one or more of the attributes below.
     * @summary Update Garbage Collection
     * @param {UpdateRegistry} body 
     * @param {string} registryName The name of a container registry.
     * @param {string} garbageCollectionUuid The UUID of a garbage collection run.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public updateGarbageCollection(body: UpdateRegistry, registryName: string, garbageCollectionUuid: string, options?: any) {
        return ContainerRegistryApiFp(this.configuration).updateGarbageCollection(body, registryName, garbageCollectionUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To validate that a container registry name is available for use, send a POST request to `/v2/registry/validate-name`.  If the name is both formatted correctly and available, the response code will be 204 and contain no body. If the name is already in use, the response will be a 409 Conflict. 
     * @summary Validate a Container Registry Name
     * @param {ValidateRegistry} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContainerRegistryApi
     */
    public validateRegistryName(body: ValidateRegistry, options?: any) {
        return ContainerRegistryApiFp(this.configuration).validateRegistryName(body, options).then((request) => request(this.axios, this.basePath));
    }
}

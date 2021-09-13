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
import { InlineResponse20039 } from '../models';
import { InlineResponse2026 } from '../models';
import { LbIdDropletsBody } from '../models';
import { LbIdDropletsBody1 } from '../models';
import { LbIdForwardingRulesBody } from '../models';
import { LbIdForwardingRulesBody1 } from '../models';
import { LoadBalancerCreate } from '../models';
/**
 * LoadBalancersApi - axios parameter creator
 * @export
 */
export const LoadBalancersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * To assign a Droplet to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs. Individual Droplets can not be added to a load balancer configured with a Droplet tag. Attempting to do so will result in a \"422 Unprocessable Entity\" response from the API.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Add Droplets to a Load Balancer
         * @param {LbIdDropletsBody} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addLoadBalancerDroplets: async (body: LbIdDropletsBody, lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addLoadBalancerDroplets.');
            }
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling addLoadBalancerDroplets.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}/droplets`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
         * To add an additional forwarding rule to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Add Forwarding Rules to a Load Balancer
         * @param {LbIdForwardingRulesBody} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addLoadBalancerForwardingRules: async (body: LbIdForwardingRulesBody, lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling addLoadBalancerForwardingRules.');
            }
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling addLoadBalancerForwardingRules.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}/forwarding_rules`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
         * To create a new load balancer instance, send a POST request to `/v2/load_balancers`.  You can specify the Droplets that will sit behind the load balancer using one of two methods:  * Set `droplet_ids` to a list of specific Droplet IDs. * Set `tag` to the name of a tag. All Droplets with this tag applied will be   assigned to the load balancer. Additional Droplets will be automatically   assigned as they are tagged.  These methods are mutually exclusive. 
         * @summary Create a New Load Balancer
         * @param {LoadBalancerCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLoadBalancer: async (body: LoadBalancerCreate, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createLoadBalancer.');
            }
            const localVarPath = `/v2/load_balancers`;
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
         * To delete a load balancer instance, disassociating any Droplets assigned to it and removing it from your account, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete a Load Balancer
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLoadBalancer: async (lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling deleteLoadBalancer.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
         * To show information about a load balancer instance, send a GET request to `/v2/load_balancers/$LOAD_BALANCER_ID`. 
         * @summary Retrieve an Existing Load Balancer
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLoadBalancer: async (lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling getLoadBalancer.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
         * To list all of the load balancer instances on your account, send a GET request to `/v2/load_balancers`. 
         * @summary List All Load Balancers
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllLoadBalancers: async (perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/load_balancers`;
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
         * To remove a Droplet from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Remove Droplets from a Load Balancer
         * @param {LbIdDropletsBody1} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeLoadBalancerDroplets: async (body: LbIdDropletsBody1, lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling removeLoadBalancerDroplets.');
            }
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling removeLoadBalancerDroplets.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}/droplets`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
         * To remove forwarding rules from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Remove Forwarding Rules from a Load Balancer
         * @param {LbIdForwardingRulesBody1} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeLoadBalancerForwardingRules: async (body: LbIdForwardingRulesBody1, lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling removeLoadBalancerForwardingRules.');
            }
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling removeLoadBalancerForwardingRules.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}/forwarding_rules`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
         * To update a load balancer's settings, send a PUT request to `/v2/load_balancers/$LOAD_BALANCER_ID`. The request should contain a full representation of the load balancer including existing attributes. It may contain _one of_ the `droplets_ids` or `tag` attributes as they are mutually exclusive. **Note that any attribute that is not provided will be reset to its default value.** 
         * @summary Update a Load Balancer
         * @param {LoadBalancerCreate} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLoadBalancer: async (body: LoadBalancerCreate, lbId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateLoadBalancer.');
            }
            // verify required parameter 'lbId' is not null or undefined
            if (lbId === null || lbId === undefined) {
                throw new RequiredError('lbId','Required parameter lbId was null or undefined when calling updateLoadBalancer.');
            }
            const localVarPath = `/v2/load_balancers/{lb_id}`
                .replace(`{${"lb_id"}}`, encodeURIComponent(String(lbId)));
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
 * LoadBalancersApi - functional programming interface
 * @export
 */
export const LoadBalancersApiFp = function(configuration?: Configuration) {
    return {
        /**
         * To assign a Droplet to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs. Individual Droplets can not be added to a load balancer configured with a Droplet tag. Attempting to do so will result in a \"422 Unprocessable Entity\" response from the API.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Add Droplets to a Load Balancer
         * @param {LbIdDropletsBody} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addLoadBalancerDroplets(body: LbIdDropletsBody, lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).addLoadBalancerDroplets(body, lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To add an additional forwarding rule to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Add Forwarding Rules to a Load Balancer
         * @param {LbIdForwardingRulesBody} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addLoadBalancerForwardingRules(body: LbIdForwardingRulesBody, lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).addLoadBalancerForwardingRules(body, lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To create a new load balancer instance, send a POST request to `/v2/load_balancers`.  You can specify the Droplets that will sit behind the load balancer using one of two methods:  * Set `droplet_ids` to a list of specific Droplet IDs. * Set `tag` to the name of a tag. All Droplets with this tag applied will be   assigned to the load balancer. Additional Droplets will be automatically   assigned as they are tagged.  These methods are mutually exclusive. 
         * @summary Create a New Load Balancer
         * @param {LoadBalancerCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLoadBalancer(body: LoadBalancerCreate, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2026>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).createLoadBalancer(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a load balancer instance, disassociating any Droplets assigned to it and removing it from your account, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete a Load Balancer
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLoadBalancer(lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).deleteLoadBalancer(lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about a load balancer instance, send a GET request to `/v2/load_balancers/$LOAD_BALANCER_ID`. 
         * @summary Retrieve an Existing Load Balancer
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLoadBalancer(lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2026>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).getLoadBalancer(lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all of the load balancer instances on your account, send a GET request to `/v2/load_balancers`. 
         * @summary List All Load Balancers
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAllLoadBalancers(perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20039>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).listAllLoadBalancers(perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To remove a Droplet from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Remove Droplets from a Load Balancer
         * @param {LbIdDropletsBody1} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeLoadBalancerDroplets(body: LbIdDropletsBody1, lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).removeLoadBalancerDroplets(body, lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To remove forwarding rules from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Remove Forwarding Rules from a Load Balancer
         * @param {LbIdForwardingRulesBody1} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeLoadBalancerForwardingRules(body: LbIdForwardingRulesBody1, lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).removeLoadBalancerForwardingRules(body, lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To update a load balancer's settings, send a PUT request to `/v2/load_balancers/$LOAD_BALANCER_ID`. The request should contain a full representation of the load balancer including existing attributes. It may contain _one of_ the `droplets_ids` or `tag` attributes as they are mutually exclusive. **Note that any attribute that is not provided will be reset to its default value.** 
         * @summary Update a Load Balancer
         * @param {LoadBalancerCreate} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateLoadBalancer(body: LoadBalancerCreate, lbId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2026>> {
            const localVarAxiosArgs = await LoadBalancersApiAxiosParamCreator(configuration).updateLoadBalancer(body, lbId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LoadBalancersApi - factory interface
 * @export
 */
export const LoadBalancersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * To assign a Droplet to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs. Individual Droplets can not be added to a load balancer configured with a Droplet tag. Attempting to do so will result in a \"422 Unprocessable Entity\" response from the API.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Add Droplets to a Load Balancer
         * @param {LbIdDropletsBody} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addLoadBalancerDroplets(body: LbIdDropletsBody, lbId: string, options?: any): AxiosPromise<void> {
            return LoadBalancersApiFp(configuration).addLoadBalancerDroplets(body, lbId, options).then((request) => request(axios, basePath));
        },
        /**
         * To add an additional forwarding rule to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Add Forwarding Rules to a Load Balancer
         * @param {LbIdForwardingRulesBody} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addLoadBalancerForwardingRules(body: LbIdForwardingRulesBody, lbId: string, options?: any): AxiosPromise<void> {
            return LoadBalancersApiFp(configuration).addLoadBalancerForwardingRules(body, lbId, options).then((request) => request(axios, basePath));
        },
        /**
         * To create a new load balancer instance, send a POST request to `/v2/load_balancers`.  You can specify the Droplets that will sit behind the load balancer using one of two methods:  * Set `droplet_ids` to a list of specific Droplet IDs. * Set `tag` to the name of a tag. All Droplets with this tag applied will be   assigned to the load balancer. Additional Droplets will be automatically   assigned as they are tagged.  These methods are mutually exclusive. 
         * @summary Create a New Load Balancer
         * @param {LoadBalancerCreate} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLoadBalancer(body: LoadBalancerCreate, options?: any): AxiosPromise<InlineResponse2026> {
            return LoadBalancersApiFp(configuration).createLoadBalancer(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a load balancer instance, disassociating any Droplets assigned to it and removing it from your account, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
         * @summary Delete a Load Balancer
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLoadBalancer(lbId: string, options?: any): AxiosPromise<void> {
            return LoadBalancersApiFp(configuration).deleteLoadBalancer(lbId, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about a load balancer instance, send a GET request to `/v2/load_balancers/$LOAD_BALANCER_ID`. 
         * @summary Retrieve an Existing Load Balancer
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLoadBalancer(lbId: string, options?: any): AxiosPromise<InlineResponse2026> {
            return LoadBalancersApiFp(configuration).getLoadBalancer(lbId, options).then((request) => request(axios, basePath));
        },
        /**
         * To list all of the load balancer instances on your account, send a GET request to `/v2/load_balancers`. 
         * @summary List All Load Balancers
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllLoadBalancers(perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20039> {
            return LoadBalancersApiFp(configuration).listAllLoadBalancers(perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To remove a Droplet from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Remove Droplets from a Load Balancer
         * @param {LbIdDropletsBody1} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeLoadBalancerDroplets(body: LbIdDropletsBody1, lbId: string, options?: any): AxiosPromise<void> {
            return LoadBalancersApiFp(configuration).removeLoadBalancerDroplets(body, lbId, options).then((request) => request(axios, basePath));
        },
        /**
         * To remove forwarding rules from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
         * @summary Remove Forwarding Rules from a Load Balancer
         * @param {LbIdForwardingRulesBody1} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeLoadBalancerForwardingRules(body: LbIdForwardingRulesBody1, lbId: string, options?: any): AxiosPromise<void> {
            return LoadBalancersApiFp(configuration).removeLoadBalancerForwardingRules(body, lbId, options).then((request) => request(axios, basePath));
        },
        /**
         * To update a load balancer's settings, send a PUT request to `/v2/load_balancers/$LOAD_BALANCER_ID`. The request should contain a full representation of the load balancer including existing attributes. It may contain _one of_ the `droplets_ids` or `tag` attributes as they are mutually exclusive. **Note that any attribute that is not provided will be reset to its default value.** 
         * @summary Update a Load Balancer
         * @param {LoadBalancerCreate} body 
         * @param {string} lbId A unique identifier for a load balancer.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateLoadBalancer(body: LoadBalancerCreate, lbId: string, options?: any): AxiosPromise<InlineResponse2026> {
            return LoadBalancersApiFp(configuration).updateLoadBalancer(body, lbId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LoadBalancersApi - object-oriented interface
 * @export
 * @class LoadBalancersApi
 * @extends {BaseAPI}
 */
export class LoadBalancersApi extends BaseAPI {
    /**
     * To assign a Droplet to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs. Individual Droplets can not be added to a load balancer configured with a Droplet tag. Attempting to do so will result in a \"422 Unprocessable Entity\" response from the API.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
     * @summary Add Droplets to a Load Balancer
     * @param {LbIdDropletsBody} body 
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public addLoadBalancerDroplets(body: LbIdDropletsBody, lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).addLoadBalancerDroplets(body, lbId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To add an additional forwarding rule to a load balancer instance, send a POST request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
     * @summary Add Forwarding Rules to a Load Balancer
     * @param {LbIdForwardingRulesBody} body 
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public addLoadBalancerForwardingRules(body: LbIdForwardingRulesBody, lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).addLoadBalancerForwardingRules(body, lbId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To create a new load balancer instance, send a POST request to `/v2/load_balancers`.  You can specify the Droplets that will sit behind the load balancer using one of two methods:  * Set `droplet_ids` to a list of specific Droplet IDs. * Set `tag` to the name of a tag. All Droplets with this tag applied will be   assigned to the load balancer. Additional Droplets will be automatically   assigned as they are tagged.  These methods are mutually exclusive. 
     * @summary Create a New Load Balancer
     * @param {LoadBalancerCreate} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public createLoadBalancer(body: LoadBalancerCreate, options?: any) {
        return LoadBalancersApiFp(this.configuration).createLoadBalancer(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a load balancer instance, disassociating any Droplets assigned to it and removing it from your account, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully. 
     * @summary Delete a Load Balancer
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public deleteLoadBalancer(lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).deleteLoadBalancer(lbId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about a load balancer instance, send a GET request to `/v2/load_balancers/$LOAD_BALANCER_ID`. 
     * @summary Retrieve an Existing Load Balancer
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public getLoadBalancer(lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).getLoadBalancer(lbId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all of the load balancer instances on your account, send a GET request to `/v2/load_balancers`. 
     * @summary List All Load Balancers
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public listAllLoadBalancers(perPage?: number, page?: number, options?: any) {
        return LoadBalancersApiFp(this.configuration).listAllLoadBalancers(perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To remove a Droplet from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/droplets`. In the body of the request, there should be a `droplet_ids` attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
     * @summary Remove Droplets from a Load Balancer
     * @param {LbIdDropletsBody1} body 
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public removeLoadBalancerDroplets(body: LbIdDropletsBody1, lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).removeLoadBalancerDroplets(body, lbId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To remove forwarding rules from a load balancer instance, send a DELETE request to `/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules`. In the body of the request, there should be a `forwarding_rules` attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data. 
     * @summary Remove Forwarding Rules from a Load Balancer
     * @param {LbIdForwardingRulesBody1} body 
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public removeLoadBalancerForwardingRules(body: LbIdForwardingRulesBody1, lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).removeLoadBalancerForwardingRules(body, lbId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To update a load balancer's settings, send a PUT request to `/v2/load_balancers/$LOAD_BALANCER_ID`. The request should contain a full representation of the load balancer including existing attributes. It may contain _one of_ the `droplets_ids` or `tag` attributes as they are mutually exclusive. **Note that any attribute that is not provided will be reset to its default value.** 
     * @summary Update a Load Balancer
     * @param {LoadBalancerCreate} body 
     * @param {string} lbId A unique identifier for a load balancer.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApi
     */
    public updateLoadBalancer(body: LoadBalancerCreate, lbId: string, options?: any) {
        return LoadBalancersApiFp(this.configuration).updateLoadBalancer(body, lbId, options).then((request) => request(this.axios, this.basePath));
    }
}

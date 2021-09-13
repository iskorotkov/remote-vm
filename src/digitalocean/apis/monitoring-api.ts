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
import { AlertPolicy } from '../models';
import { AlertPolicyRequest } from '../models';
import { InlineResponse20040 } from '../models';
import { Metrics } from '../models';
/**
 * MonitoringApi - axios parameter creator
 * @export
 */
export const MonitoringApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * To create a new alert, send a POST request to `/v2/monitoring/alerts`.
         * @summary Create Alert Policy
         * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAlertPolicy: async (body: AlertPolicyRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createAlertPolicy.');
            }
            const localVarPath = `/v2/monitoring/alerts`;
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
         * To delete an alert policy, send a DELETE request to `/v2/monitoring/alerts/{alert_uuid}`
         * @summary Delete an Alert Policy
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAlertPolicy: async (alertUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'alertUuid' is not null or undefined
            if (alertUuid === null || alertUuid === undefined) {
                throw new RequiredError('alertUuid','Required parameter alertUuid was null or undefined when calling deleteAlertPolicy.');
            }
            const localVarPath = `/v2/monitoring/alerts/{alert_uuid}`
                .replace(`{${"alert_uuid"}}`, encodeURIComponent(String(alertUuid)));
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
         * To retrieve a given alert policy, send a GET request to `/v2/monitoring/alerts/{alert_uuid}`
         * @summary Retrieve an Existing Alert Policy
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAlertPolicy: async (alertUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'alertUuid' is not null or undefined
            if (alertUuid === null || alertUuid === undefined) {
                throw new RequiredError('alertUuid','Required parameter alertUuid was null or undefined when calling getAlertPolicy.');
            }
            const localVarPath = `/v2/monitoring/alerts/{alert_uuid}`
                .replace(`{${"alert_uuid"}}`, encodeURIComponent(String(alertUuid)));
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
         * To retrieve bandwidth metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/bandwidth`.
         * @summary Get Droplet Bandwidth Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} _interface The network interface.
         * @param {string} direction The traffic direction.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletBandwidthMetrics: async (hostId: string, _interface: string, direction: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletBandwidthMetrics.');
            }
            // verify required parameter '_interface' is not null or undefined
            if (_interface === null || _interface === undefined) {
                throw new RequiredError('_interface','Required parameter _interface was null or undefined when calling getDropletBandwidthMetrics.');
            }
            // verify required parameter 'direction' is not null or undefined
            if (direction === null || direction === undefined) {
                throw new RequiredError('direction','Required parameter direction was null or undefined when calling getDropletBandwidthMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletBandwidthMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletBandwidthMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/bandwidth`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (_interface !== undefined) {
                localVarQueryParameter['interface'] = _interface;
            }

            if (direction !== undefined) {
                localVarQueryParameter['direction'] = direction;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve CPU metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/cpu`.
         * @summary Get Droplet CPU Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletCpuMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletCpuMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletCpuMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletCpuMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/cpu`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve filesystem free metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_free`.
         * @summary Get Droplet Filesystem Free Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletFilesystemFreeMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletFilesystemFreeMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletFilesystemFreeMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletFilesystemFreeMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/filesystem_free`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve filesystem size metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_size`.
         * @summary Get Droplet Filesystem Size Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletFilesystemSizeMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletFilesystemSizeMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletFilesystemSizeMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletFilesystemSizeMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/filesystem_size`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve 15 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_15`.
         * @summary Get Droplet Load15 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletLoad15Metrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletLoad15Metrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletLoad15Metrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletLoad15Metrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/load_15`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve 1 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_1`.
         * @summary Get Droplet Load1 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletLoad1Metrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletLoad1Metrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletLoad1Metrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletLoad1Metrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/load_1`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve 5 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_5`.
         * @summary Get Droplet Load5 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletLoad5Metrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletLoad5Metrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletLoad5Metrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletLoad5Metrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/load_5`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve available memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_available`.
         * @summary Get Droplet Available Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryAvailableMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletMemoryAvailableMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletMemoryAvailableMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletMemoryAvailableMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/memory_available`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve cached memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_cached`.
         * @summary Get Droplet Cached Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryCachedMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletMemoryCachedMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletMemoryCachedMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletMemoryCachedMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/memory_cached`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve free memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_free`.
         * @summary Get Droplet Free Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryFreeMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletMemoryFreeMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletMemoryFreeMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletMemoryFreeMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/memory_free`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * To retrieve total memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_total`.
         * @summary Get Droplet Total Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryTotalMetrics: async (hostId: string, start: string, end: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'hostId' is not null or undefined
            if (hostId === null || hostId === undefined) {
                throw new RequiredError('hostId','Required parameter hostId was null or undefined when calling getDropletMemoryTotalMetrics.');
            }
            // verify required parameter 'start' is not null or undefined
            if (start === null || start === undefined) {
                throw new RequiredError('start','Required parameter start was null or undefined when calling getDropletMemoryTotalMetrics.');
            }
            // verify required parameter 'end' is not null or undefined
            if (end === null || end === undefined) {
                throw new RequiredError('end','Required parameter end was null or undefined when calling getDropletMemoryTotalMetrics.');
            }
            const localVarPath = `/v2/monitoring/metrics/droplet/memory_total`;
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

            if (hostId !== undefined) {
                localVarQueryParameter['host_id'] = hostId;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
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
         * Returns all alert policies that are configured for the given account. To List all alert policies, send a GET request to `/v2/monitoring/alerts`.
         * @summary List Alert Policies
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAlertPolicies: async (perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/monitoring/alerts`;
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
         * To update en existing policy, send a PUT request to `v2/monitoring/alerts/{alert_uuid}`.
         * @summary Update an Alert Policy
         * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateAlertPolicy: async (body: AlertPolicyRequest, alertUuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateAlertPolicy.');
            }
            // verify required parameter 'alertUuid' is not null or undefined
            if (alertUuid === null || alertUuid === undefined) {
                throw new RequiredError('alertUuid','Required parameter alertUuid was null or undefined when calling updateAlertPolicy.');
            }
            const localVarPath = `/v2/monitoring/alerts/{alert_uuid}`
                .replace(`{${"alert_uuid"}}`, encodeURIComponent(String(alertUuid)));
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
 * MonitoringApi - functional programming interface
 * @export
 */
export const MonitoringApiFp = function(configuration?: Configuration) {
    return {
        /**
         * To create a new alert, send a POST request to `/v2/monitoring/alerts`.
         * @summary Create Alert Policy
         * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createAlertPolicy(body: AlertPolicyRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AlertPolicy>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).createAlertPolicy(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete an alert policy, send a DELETE request to `/v2/monitoring/alerts/{alert_uuid}`
         * @summary Delete an Alert Policy
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAlertPolicy(alertUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).deleteAlertPolicy(alertUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve a given alert policy, send a GET request to `/v2/monitoring/alerts/{alert_uuid}`
         * @summary Retrieve an Existing Alert Policy
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAlertPolicy(alertUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AlertPolicy>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getAlertPolicy(alertUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve bandwidth metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/bandwidth`.
         * @summary Get Droplet Bandwidth Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} _interface The network interface.
         * @param {string} direction The traffic direction.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletBandwidthMetrics(hostId: string, _interface: string, direction: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletBandwidthMetrics(hostId, _interface, direction, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve CPU metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/cpu`.
         * @summary Get Droplet CPU Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletCpuMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletCpuMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve filesystem free metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_free`.
         * @summary Get Droplet Filesystem Free Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletFilesystemFreeMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletFilesystemFreeMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve filesystem size metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_size`.
         * @summary Get Droplet Filesystem Size Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletFilesystemSizeMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletFilesystemSizeMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve 15 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_15`.
         * @summary Get Droplet Load15 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletLoad15Metrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletLoad15Metrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve 1 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_1`.
         * @summary Get Droplet Load1 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletLoad1Metrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletLoad1Metrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve 5 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_5`.
         * @summary Get Droplet Load5 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletLoad5Metrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletLoad5Metrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve available memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_available`.
         * @summary Get Droplet Available Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletMemoryAvailableMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletMemoryAvailableMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve cached memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_cached`.
         * @summary Get Droplet Cached Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletMemoryCachedMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletMemoryCachedMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve free memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_free`.
         * @summary Get Droplet Free Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletMemoryFreeMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletMemoryFreeMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve total memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_total`.
         * @summary Get Droplet Total Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDropletMemoryTotalMetrics(hostId: string, start: string, end: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Metrics>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).getDropletMemoryTotalMetrics(hostId, start, end, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Returns all alert policies that are configured for the given account. To List all alert policies, send a GET request to `/v2/monitoring/alerts`.
         * @summary List Alert Policies
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAlertPolicies(perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20040>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).listAlertPolicies(perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To update en existing policy, send a PUT request to `v2/monitoring/alerts/{alert_uuid}`.
         * @summary Update an Alert Policy
         * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateAlertPolicy(body: AlertPolicyRequest, alertUuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AlertPolicy>> {
            const localVarAxiosArgs = await MonitoringApiAxiosParamCreator(configuration).updateAlertPolicy(body, alertUuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * MonitoringApi - factory interface
 * @export
 */
export const MonitoringApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * To create a new alert, send a POST request to `/v2/monitoring/alerts`.
         * @summary Create Alert Policy
         * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAlertPolicy(body: AlertPolicyRequest, options?: any): AxiosPromise<AlertPolicy> {
            return MonitoringApiFp(configuration).createAlertPolicy(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete an alert policy, send a DELETE request to `/v2/monitoring/alerts/{alert_uuid}`
         * @summary Delete an Alert Policy
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAlertPolicy(alertUuid: string, options?: any): AxiosPromise<void> {
            return MonitoringApiFp(configuration).deleteAlertPolicy(alertUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve a given alert policy, send a GET request to `/v2/monitoring/alerts/{alert_uuid}`
         * @summary Retrieve an Existing Alert Policy
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAlertPolicy(alertUuid: string, options?: any): AxiosPromise<AlertPolicy> {
            return MonitoringApiFp(configuration).getAlertPolicy(alertUuid, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve bandwidth metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/bandwidth`.
         * @summary Get Droplet Bandwidth Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} _interface The network interface.
         * @param {string} direction The traffic direction.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletBandwidthMetrics(hostId: string, _interface: string, direction: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletBandwidthMetrics(hostId, _interface, direction, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve CPU metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/cpu`.
         * @summary Get Droplet CPU Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletCpuMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletCpuMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve filesystem free metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_free`.
         * @summary Get Droplet Filesystem Free Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletFilesystemFreeMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletFilesystemFreeMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve filesystem size metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_size`.
         * @summary Get Droplet Filesystem Size Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletFilesystemSizeMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletFilesystemSizeMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve 15 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_15`.
         * @summary Get Droplet Load15 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletLoad15Metrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletLoad15Metrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve 1 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_1`.
         * @summary Get Droplet Load1 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletLoad1Metrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletLoad1Metrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve 5 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_5`.
         * @summary Get Droplet Load5 Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletLoad5Metrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletLoad5Metrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve available memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_available`.
         * @summary Get Droplet Available Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryAvailableMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletMemoryAvailableMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve cached memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_cached`.
         * @summary Get Droplet Cached Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryCachedMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletMemoryCachedMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve free memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_free`.
         * @summary Get Droplet Free Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryFreeMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletMemoryFreeMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve total memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_total`.
         * @summary Get Droplet Total Memory Metrics
         * @param {string} hostId The droplet ID.
         * @param {string} start Timestamp to start metric window.
         * @param {string} end Timestamp to end metric window.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDropletMemoryTotalMetrics(hostId: string, start: string, end: string, options?: any): AxiosPromise<Metrics> {
            return MonitoringApiFp(configuration).getDropletMemoryTotalMetrics(hostId, start, end, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all alert policies that are configured for the given account. To List all alert policies, send a GET request to `/v2/monitoring/alerts`.
         * @summary List Alert Policies
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAlertPolicies(perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20040> {
            return MonitoringApiFp(configuration).listAlertPolicies(perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To update en existing policy, send a PUT request to `v2/monitoring/alerts/{alert_uuid}`.
         * @summary Update an Alert Policy
         * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
         * @param {string} alertUuid A unique identifier for an alert policy.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateAlertPolicy(body: AlertPolicyRequest, alertUuid: string, options?: any): AxiosPromise<AlertPolicy> {
            return MonitoringApiFp(configuration).updateAlertPolicy(body, alertUuid, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MonitoringApi - object-oriented interface
 * @export
 * @class MonitoringApi
 * @extends {BaseAPI}
 */
export class MonitoringApi extends BaseAPI {
    /**
     * To create a new alert, send a POST request to `/v2/monitoring/alerts`.
     * @summary Create Alert Policy
     * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public createAlertPolicy(body: AlertPolicyRequest, options?: any) {
        return MonitoringApiFp(this.configuration).createAlertPolicy(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete an alert policy, send a DELETE request to `/v2/monitoring/alerts/{alert_uuid}`
     * @summary Delete an Alert Policy
     * @param {string} alertUuid A unique identifier for an alert policy.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public deleteAlertPolicy(alertUuid: string, options?: any) {
        return MonitoringApiFp(this.configuration).deleteAlertPolicy(alertUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve a given alert policy, send a GET request to `/v2/monitoring/alerts/{alert_uuid}`
     * @summary Retrieve an Existing Alert Policy
     * @param {string} alertUuid A unique identifier for an alert policy.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getAlertPolicy(alertUuid: string, options?: any) {
        return MonitoringApiFp(this.configuration).getAlertPolicy(alertUuid, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve bandwidth metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/bandwidth`.
     * @summary Get Droplet Bandwidth Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} _interface The network interface.
     * @param {string} direction The traffic direction.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletBandwidthMetrics(hostId: string, _interface: string, direction: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletBandwidthMetrics(hostId, _interface, direction, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve CPU metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/cpu`.
     * @summary Get Droplet CPU Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletCpuMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletCpuMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve filesystem free metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_free`.
     * @summary Get Droplet Filesystem Free Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletFilesystemFreeMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletFilesystemFreeMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve filesystem size metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/filesystem_size`.
     * @summary Get Droplet Filesystem Size Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletFilesystemSizeMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletFilesystemSizeMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve 15 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_15`.
     * @summary Get Droplet Load15 Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletLoad15Metrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletLoad15Metrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve 1 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_1`.
     * @summary Get Droplet Load1 Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletLoad1Metrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletLoad1Metrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve 5 minute load average metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/load_5`.
     * @summary Get Droplet Load5 Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletLoad5Metrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletLoad5Metrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve available memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_available`.
     * @summary Get Droplet Available Memory Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletMemoryAvailableMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletMemoryAvailableMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve cached memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_cached`.
     * @summary Get Droplet Cached Memory Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletMemoryCachedMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletMemoryCachedMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve free memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_free`.
     * @summary Get Droplet Free Memory Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletMemoryFreeMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletMemoryFreeMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve total memory metrics for a given droplet, send a GET request to `/v2/monitoring/metrics/droplet/memory_total`.
     * @summary Get Droplet Total Memory Metrics
     * @param {string} hostId The droplet ID.
     * @param {string} start Timestamp to start metric window.
     * @param {string} end Timestamp to end metric window.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public getDropletMemoryTotalMetrics(hostId: string, start: string, end: string, options?: any) {
        return MonitoringApiFp(this.configuration).getDropletMemoryTotalMetrics(hostId, start, end, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Returns all alert policies that are configured for the given account. To List all alert policies, send a GET request to `/v2/monitoring/alerts`.
     * @summary List Alert Policies
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public listAlertPolicies(perPage?: number, page?: number, options?: any) {
        return MonitoringApiFp(this.configuration).listAlertPolicies(perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To update en existing policy, send a PUT request to `v2/monitoring/alerts/{alert_uuid}`.
     * @summary Update an Alert Policy
     * @param {AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
     * @param {string} alertUuid A unique identifier for an alert policy.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MonitoringApi
     */
    public updateAlertPolicy(body: AlertPolicyRequest, alertUuid: string, options?: any) {
        return MonitoringApiFp(this.configuration).updateAlertPolicy(body, alertUuid, options).then((request) => request(this.axios, this.basePath));
    }
}

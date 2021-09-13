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
import { AssociatedResourceStatus } from '../models';
import { InlineResponse20022 } from '../models';
import { InlineResponse20023 } from '../models';
import { InlineResponse20024 } from '../models';
import { InlineResponse20025 } from '../models';
import { InlineResponse20026 } from '../models';
import { InlineResponse20027 } from '../models';
import { InlineResponse20028 } from '../models';
import { InlineResponse20029 } from '../models';
import { InlineResponse202 } from '../models';
import { NeighborIds } from '../models';
import { V2DropletsBody } from '../models';
import { URL, URLSearchParams } from 'url'
/**
 * DropletsApi - axios parameter creator
 * @export
 */
export const DropletsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * To create a new Droplet, send a POST request to `/v2/droplets` setting the required attributes.  A Droplet will be created using the provided information. The response body will contain a JSON object with a key called `droplet`. The value will be an object containing the standard attributes for your new Droplet. The response code, 202 Accepted, does not indicate the success or failure of the operation, just that the request has been accepted for processing. The `actions` returned as part of the response's `links` object can be used to check the status of the Droplet create event.  ### Create Multiple Droplets  Creating multiple Droplets is very similar to creating a single Droplet. Instead of sending `name` as a string, send `names` as an array of strings. A Droplet will be created for each name you send using the associated information. Up to ten Droplets may be created this way at a time.  Rather than returning a single Droplet, the response body will contain a JSON array with a key called `droplets`. This will be set to an array of JSON objects, each of which will contain the standard Droplet attributes. The response code, 202 Accepted, does not indicate the success or failure of any operation, just that the request has been accepted for processing. The array of `actions` returned as part of the response's `links` object can be used to check the status of each individual Droplet create event.
         * @summary Create a New Droplet
         * @param {V2DropletsBody} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDroplet: async (body?: V2DropletsBody, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/droplets`;
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
         * To delete a Droplet, send a DELETE request to `/v2/droplets/$DROPLET_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
         * @summary Delete an Existing Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyDroplet: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling destroyDroplet.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To delete **all** Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your DELETE request. For example,  `/v2/droplets?tag_name=$TAG_NAME`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
         * @summary Deleting Droplets by Tag
         * @param {string} tagName Specifies Droplets to be deleted by tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyDropletsByTag: async (tagName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'tagName' is not null or undefined
            if (tagName === null || tagName === undefined) {
                throw new RequiredError('tagName','Required parameter tagName was null or undefined when calling destroyDropletsByTag.');
            }
            const localVarPath = `/v2/droplets`;
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
         * To destroy a Droplet along with all of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/dangerous` endpoint. The headers of this request must include an `X-Dangerous` key set to `true`. To preview which resources will be destroyed, first query the Droplet's associated resources. This operation _can not_ be reverse and should be used with caution.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
         * @summary Destroy a Droplet and All of its Associated Resources (Dangerous)
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {boolean} xDangerous Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyWithAssociatedResourcesDangerous: async (dropletId: number, xDangerous: boolean, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling destroyWithAssociatedResourcesDangerous.');
            }
            // verify required parameter 'xDangerous' is not null or undefined
            if (xDangerous === null || xDangerous === undefined) {
                throw new RequiredError('xDangerous','Required parameter xDangerous was null or undefined when calling destroyWithAssociatedResourcesDangerous.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/destroy_with_associated_resources/dangerous`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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

            if (xDangerous !== undefined && xDangerous !== null) {
                localVarHeaderParameter['X-Dangerous'] = String(JSON.stringify(xDangerous));
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
         * To destroy a Droplet along with a sub-set of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/selective` endpoint. The JSON body of the request should include `snapshots`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed. The IDs can be found by querying the Droplet's associated resources. Any associated resource not included in the request will remain and continue to accrue changes on your account.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
         * @summary Selectively Destroy a Droplet and its Associated Resources
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyWithAssociatedResourcesSelective: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling destroyWithAssociatedResourcesSelective.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/destroy_with_associated_resources/selective`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To check on the status of a request to destroy a Droplet with its associated resources, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/status` endpoint.
         * @summary Check Status of a Droplet Destroy with Associated Resources Request
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDestroyWithAssociatedResourcesStatus: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling getDestroyWithAssociatedResourcesStatus.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/destroy_with_associated_resources/status`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To show information about an individual Droplet, send a GET request to `/v2/droplets/$DROPLET_ID`.
         * @summary Retrieve an Existing Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDroplet: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling getDroplet.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To retrieve a list of all Droplets that are co-located on the same physical hardware, send a GET request to `/v2/reports/droplet_neighbors_ids`.  The results will be returned as a JSON object with a key of `neighbor_ids`. This will be set to an array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server. An empty array indicates that all Droplets associated with your account are located on separate physical hardware.
         * @summary List All Droplet Neighbors
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllDropletNeighborsIds: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/reports/droplet_neighbors_ids`;
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
         * To list all Droplets in your account, send a GET request to `/v2/droplets`.  The response body will be a JSON object with a key of `droplets`. This will be set to an array containing objects each representing a Droplet. These will contain the standard Droplet attributes.  ### Filtering Results by Tag  It's possible to request filtered results by including certain query parameters. To only list Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your GET request. For example, `/v2/droplets?tag_name=$TAG_NAME`.
         * @summary List All Droplets
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {string} [tagName] Used to filter Droplets by a specific tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllDroplets: async (perPage?: number, page?: number, tagName?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/droplets`;
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
         * To list the associated billable resources that can be destroyed along with a Droplet, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources` endpoint.  The response will be a JSON object containing `snapshots`, `volumes`, and `volume_snapshots` keys. Each will be set to an array of objects containing information about the associated resources.
         * @summary List Associated Resources for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletAssociatedResources: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling listDropletAssociatedResources.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/destroy_with_associated_resources`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To retrieve any backups associated with a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/backups`.  You will get back a JSON object that has a `backups` key. This will be set to an array of backup objects, each of which contain the standard Droplet backup attributes.
         * @summary List Backups for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletBackups: async (dropletId: number, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling listDropletBackups.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/backups`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To retrieve a list of all firewalls available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/firewalls`  The response will be a JSON object that has a key called `firewalls`. This will be set to an array of `firewall` objects, each of which contain the standard `firewall` attributes.
         * @summary List all Firewalls Applied to a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletFirewalls: async (dropletId: number, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling listDropletFirewalls.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/firewalls`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To retrieve a list of all kernels available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/kernels`  The response will be a JSON object that has a key called `kernels`. This will be set to an array of `kernel` objects, each of which contain the standard `kernel` attributes.
         * @summary List All Available Kernels for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletKernels: async (dropletId: number, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling listDropletKernels.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/kernels`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To retrieve a list of any \"neighbors\" (i.e. Droplets that are co-located on the same physical hardware) for a specific Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/neighbors`.  The results will be returned as a JSON object with a key of `droplets`. This will be set to an array containing objects representing any other Droplets that share the same physical hardware. An empty array indicates that the Droplet is not co-located any other Droplets associated with your account.
         * @summary List Neighbors for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletNeighbors: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling listDropletNeighbors.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/neighbors`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * To retrieve the snapshots that have been created from a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/snapshots`.  You will get back a JSON object that has a `snapshots` key. This will be set to an array of snapshot objects, each of which contain the standard Droplet snapshot attributes.
         * @summary List Snapshots for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletSnapshots: async (dropletId: number, perPage?: number, page?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling listDropletSnapshots.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/snapshots`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
         * If the status of a request to destroy a Droplet with its associated resources reported any errors, it can be retried by sending a POST request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/retry` endpoint.  Only one destroy can be active at a time per Droplet. If a retry is issued while another destroy is in progress for the Droplet a 409 status code will be returned. A successful response will include a 202 response code and no content.
         * @summary Retry a Droplet Destroy with Associated Resources Request
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retryDestroyWithAssociatedResource: async (dropletId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'dropletId' is not null or undefined
            if (dropletId === null || dropletId === undefined) {
                throw new RequiredError('dropletId','Required parameter dropletId was null or undefined when calling retryDestroyWithAssociatedResource.');
            }
            const localVarPath = `/v2/droplets/{droplet_id}/destroy_with_associated_resources/retry`
                .replace(`{${"droplet_id"}}`, encodeURIComponent(String(dropletId)));
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
    }
};

/**
 * DropletsApi - functional programming interface
 * @export
 */
export const DropletsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * To create a new Droplet, send a POST request to `/v2/droplets` setting the required attributes.  A Droplet will be created using the provided information. The response body will contain a JSON object with a key called `droplet`. The value will be an object containing the standard attributes for your new Droplet. The response code, 202 Accepted, does not indicate the success or failure of the operation, just that the request has been accepted for processing. The `actions` returned as part of the response's `links` object can be used to check the status of the Droplet create event.  ### Create Multiple Droplets  Creating multiple Droplets is very similar to creating a single Droplet. Instead of sending `name` as a string, send `names` as an array of strings. A Droplet will be created for each name you send using the associated information. Up to ten Droplets may be created this way at a time.  Rather than returning a single Droplet, the response body will contain a JSON array with a key called `droplets`. This will be set to an array of JSON objects, each of which will contain the standard Droplet attributes. The response code, 202 Accepted, does not indicate the success or failure of any operation, just that the request has been accepted for processing. The array of `actions` returned as part of the response's `links` object can be used to check the status of each individual Droplet create event.
         * @summary Create a New Droplet
         * @param {V2DropletsBody} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createDroplet(body?: V2DropletsBody, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse202>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).createDroplet(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete a Droplet, send a DELETE request to `/v2/droplets/$DROPLET_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
         * @summary Delete an Existing Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyDroplet(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).destroyDroplet(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To delete **all** Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your DELETE request. For example,  `/v2/droplets?tag_name=$TAG_NAME`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
         * @summary Deleting Droplets by Tag
         * @param {string} tagName Specifies Droplets to be deleted by tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyDropletsByTag(tagName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).destroyDropletsByTag(tagName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To destroy a Droplet along with all of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/dangerous` endpoint. The headers of this request must include an `X-Dangerous` key set to `true`. To preview which resources will be destroyed, first query the Droplet's associated resources. This operation _can not_ be reverse and should be used with caution.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
         * @summary Destroy a Droplet and All of its Associated Resources (Dangerous)
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {boolean} xDangerous Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyWithAssociatedResourcesDangerous(dropletId: number, xDangerous: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).destroyWithAssociatedResourcesDangerous(dropletId, xDangerous, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To destroy a Droplet along with a sub-set of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/selective` endpoint. The JSON body of the request should include `snapshots`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed. The IDs can be found by querying the Droplet's associated resources. Any associated resource not included in the request will remain and continue to accrue changes on your account.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
         * @summary Selectively Destroy a Droplet and its Associated Resources
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async destroyWithAssociatedResourcesSelective(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).destroyWithAssociatedResourcesSelective(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To check on the status of a request to destroy a Droplet with its associated resources, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/status` endpoint.
         * @summary Check Status of a Droplet Destroy with Associated Resources Request
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDestroyWithAssociatedResourcesStatus(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AssociatedResourceStatus>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).getDestroyWithAssociatedResourcesStatus(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To show information about an individual Droplet, send a GET request to `/v2/droplets/$DROPLET_ID`.
         * @summary Retrieve an Existing Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDroplet(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20023>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).getDroplet(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve a list of all Droplets that are co-located on the same physical hardware, send a GET request to `/v2/reports/droplet_neighbors_ids`.  The results will be returned as a JSON object with a key of `neighbor_ids`. This will be set to an array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server. An empty array indicates that all Droplets associated with your account are located on separate physical hardware.
         * @summary List All Droplet Neighbors
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAllDropletNeighborsIds(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NeighborIds>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listAllDropletNeighborsIds(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list all Droplets in your account, send a GET request to `/v2/droplets`.  The response body will be a JSON object with a key of `droplets`. This will be set to an array containing objects each representing a Droplet. These will contain the standard Droplet attributes.  ### Filtering Results by Tag  It's possible to request filtered results by including certain query parameters. To only list Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your GET request. For example, `/v2/droplets?tag_name=$TAG_NAME`.
         * @summary List All Droplets
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {string} [tagName] Used to filter Droplets by a specific tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAllDroplets(perPage?: number, page?: number, tagName?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20022>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listAllDroplets(perPage, page, tagName, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To list the associated billable resources that can be destroyed along with a Droplet, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources` endpoint.  The response will be a JSON object containing `snapshots`, `volumes`, and `volume_snapshots` keys. Each will be set to an array of objects containing information about the associated resources.
         * @summary List Associated Resources for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDropletAssociatedResources(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20029>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listDropletAssociatedResources(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve any backups associated with a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/backups`.  You will get back a JSON object that has a `backups` key. This will be set to an array of backup objects, each of which contain the standard Droplet backup attributes.
         * @summary List Backups for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDropletBackups(dropletId: number, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20024>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listDropletBackups(dropletId, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve a list of all firewalls available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/firewalls`  The response will be a JSON object that has a key called `firewalls`. This will be set to an array of `firewall` objects, each of which contain the standard `firewall` attributes.
         * @summary List all Firewalls Applied to a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDropletFirewalls(dropletId: number, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20027>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listDropletFirewalls(dropletId, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve a list of all kernels available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/kernels`  The response will be a JSON object that has a key called `kernels`. This will be set to an array of `kernel` objects, each of which contain the standard `kernel` attributes.
         * @summary List All Available Kernels for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDropletKernels(dropletId: number, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20026>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listDropletKernels(dropletId, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve a list of any \"neighbors\" (i.e. Droplets that are co-located on the same physical hardware) for a specific Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/neighbors`.  The results will be returned as a JSON object with a key of `droplets`. This will be set to an array containing objects representing any other Droplets that share the same physical hardware. An empty array indicates that the Droplet is not co-located any other Droplets associated with your account.
         * @summary List Neighbors for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDropletNeighbors(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20028>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listDropletNeighbors(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To retrieve the snapshots that have been created from a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/snapshots`.  You will get back a JSON object that has a `snapshots` key. This will be set to an array of snapshot objects, each of which contain the standard Droplet snapshot attributes.
         * @summary List Snapshots for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDropletSnapshots(dropletId: number, perPage?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse20025>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).listDropletSnapshots(dropletId, perPage, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * If the status of a request to destroy a Droplet with its associated resources reported any errors, it can be retried by sending a POST request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/retry` endpoint.  Only one destroy can be active at a time per Droplet. If a retry is issued while another destroy is in progress for the Droplet a 409 status code will be returned. A successful response will include a 202 response code and no content.
         * @summary Retry a Droplet Destroy with Associated Resources Request
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async retryDestroyWithAssociatedResource(dropletId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DropletsApiAxiosParamCreator(configuration).retryDestroyWithAssociatedResource(dropletId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DropletsApi - factory interface
 * @export
 */
export const DropletsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * To create a new Droplet, send a POST request to `/v2/droplets` setting the required attributes.  A Droplet will be created using the provided information. The response body will contain a JSON object with a key called `droplet`. The value will be an object containing the standard attributes for your new Droplet. The response code, 202 Accepted, does not indicate the success or failure of the operation, just that the request has been accepted for processing. The `actions` returned as part of the response's `links` object can be used to check the status of the Droplet create event.  ### Create Multiple Droplets  Creating multiple Droplets is very similar to creating a single Droplet. Instead of sending `name` as a string, send `names` as an array of strings. A Droplet will be created for each name you send using the associated information. Up to ten Droplets may be created this way at a time.  Rather than returning a single Droplet, the response body will contain a JSON array with a key called `droplets`. This will be set to an array of JSON objects, each of which will contain the standard Droplet attributes. The response code, 202 Accepted, does not indicate the success or failure of any operation, just that the request has been accepted for processing. The array of `actions` returned as part of the response's `links` object can be used to check the status of each individual Droplet create event.
         * @summary Create a New Droplet
         * @param {V2DropletsBody} [body]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDroplet(body?: V2DropletsBody, options?: any): AxiosPromise<InlineResponse202> {
            return DropletsApiFp(configuration).createDroplet(body, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete a Droplet, send a DELETE request to `/v2/droplets/$DROPLET_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
         * @summary Delete an Existing Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyDroplet(dropletId: number, options?: any): AxiosPromise<void> {
            return DropletsApiFp(configuration).destroyDroplet(dropletId, options).then((request) => request(axios, basePath));
        },
        /**
         * To delete **all** Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your DELETE request. For example,  `/v2/droplets?tag_name=$TAG_NAME`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
         * @summary Deleting Droplets by Tag
         * @param {string} tagName Specifies Droplets to be deleted by tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyDropletsByTag(tagName: string, options?: any): AxiosPromise<void> {
            return DropletsApiFp(configuration).destroyDropletsByTag(tagName, options).then((request) => request(axios, basePath));
        },
        /**
         * To destroy a Droplet along with all of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/dangerous` endpoint. The headers of this request must include an `X-Dangerous` key set to `true`. To preview which resources will be destroyed, first query the Droplet's associated resources. This operation _can not_ be reverse and should be used with caution.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
         * @summary Destroy a Droplet and All of its Associated Resources (Dangerous)
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {boolean} xDangerous Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyWithAssociatedResourcesDangerous(dropletId: number, xDangerous: boolean, options?: any): AxiosPromise<void> {
            return DropletsApiFp(configuration).destroyWithAssociatedResourcesDangerous(dropletId, xDangerous, options).then((request) => request(axios, basePath));
        },
        /**
         * To destroy a Droplet along with a sub-set of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/selective` endpoint. The JSON body of the request should include `snapshots`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed. The IDs can be found by querying the Droplet's associated resources. Any associated resource not included in the request will remain and continue to accrue changes on your account.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
         * @summary Selectively Destroy a Droplet and its Associated Resources
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        destroyWithAssociatedResourcesSelective(dropletId: number, options?: any): AxiosPromise<void> {
            return DropletsApiFp(configuration).destroyWithAssociatedResourcesSelective(dropletId, options).then((request) => request(axios, basePath));
        },
        /**
         * To check on the status of a request to destroy a Droplet with its associated resources, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/status` endpoint.
         * @summary Check Status of a Droplet Destroy with Associated Resources Request
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDestroyWithAssociatedResourcesStatus(dropletId: number, options?: any): AxiosPromise<AssociatedResourceStatus> {
            return DropletsApiFp(configuration).getDestroyWithAssociatedResourcesStatus(dropletId, options).then((request) => request(axios, basePath));
        },
        /**
         * To show information about an individual Droplet, send a GET request to `/v2/droplets/$DROPLET_ID`.
         * @summary Retrieve an Existing Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDroplet(dropletId: number, options?: any): AxiosPromise<InlineResponse20023> {
            return DropletsApiFp(configuration).getDroplet(dropletId, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve a list of all Droplets that are co-located on the same physical hardware, send a GET request to `/v2/reports/droplet_neighbors_ids`.  The results will be returned as a JSON object with a key of `neighbor_ids`. This will be set to an array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server. An empty array indicates that all Droplets associated with your account are located on separate physical hardware.
         * @summary List All Droplet Neighbors
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllDropletNeighborsIds(options?: any): AxiosPromise<NeighborIds> {
            return DropletsApiFp(configuration).listAllDropletNeighborsIds(options).then((request) => request(axios, basePath));
        },
        /**
         * To list all Droplets in your account, send a GET request to `/v2/droplets`.  The response body will be a JSON object with a key of `droplets`. This will be set to an array containing objects each representing a Droplet. These will contain the standard Droplet attributes.  ### Filtering Results by Tag  It's possible to request filtered results by including certain query parameters. To only list Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your GET request. For example, `/v2/droplets?tag_name=$TAG_NAME`.
         * @summary List All Droplets
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {string} [tagName] Used to filter Droplets by a specific tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAllDroplets(perPage?: number, page?: number, tagName?: string, options?: any): AxiosPromise<InlineResponse20022> {
            return DropletsApiFp(configuration).listAllDroplets(perPage, page, tagName, options).then((request) => request(axios, basePath));
        },
        /**
         * To list the associated billable resources that can be destroyed along with a Droplet, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources` endpoint.  The response will be a JSON object containing `snapshots`, `volumes`, and `volume_snapshots` keys. Each will be set to an array of objects containing information about the associated resources.
         * @summary List Associated Resources for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletAssociatedResources(dropletId: number, options?: any): AxiosPromise<InlineResponse20029> {
            return DropletsApiFp(configuration).listDropletAssociatedResources(dropletId, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve any backups associated with a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/backups`.  You will get back a JSON object that has a `backups` key. This will be set to an array of backup objects, each of which contain the standard Droplet backup attributes.
         * @summary List Backups for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletBackups(dropletId: number, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20024> {
            return DropletsApiFp(configuration).listDropletBackups(dropletId, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve a list of all firewalls available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/firewalls`  The response will be a JSON object that has a key called `firewalls`. This will be set to an array of `firewall` objects, each of which contain the standard `firewall` attributes.
         * @summary List all Firewalls Applied to a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletFirewalls(dropletId: number, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20027> {
            return DropletsApiFp(configuration).listDropletFirewalls(dropletId, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve a list of all kernels available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/kernels`  The response will be a JSON object that has a key called `kernels`. This will be set to an array of `kernel` objects, each of which contain the standard `kernel` attributes.
         * @summary List All Available Kernels for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletKernels(dropletId: number, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20026> {
            return DropletsApiFp(configuration).listDropletKernels(dropletId, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve a list of any \"neighbors\" (i.e. Droplets that are co-located on the same physical hardware) for a specific Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/neighbors`.  The results will be returned as a JSON object with a key of `droplets`. This will be set to an array containing objects representing any other Droplets that share the same physical hardware. An empty array indicates that the Droplet is not co-located any other Droplets associated with your account.
         * @summary List Neighbors for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletNeighbors(dropletId: number, options?: any): AxiosPromise<InlineResponse20028> {
            return DropletsApiFp(configuration).listDropletNeighbors(dropletId, options).then((request) => request(axios, basePath));
        },
        /**
         * To retrieve the snapshots that have been created from a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/snapshots`.  You will get back a JSON object that has a `snapshots` key. This will be set to an array of snapshot objects, each of which contain the standard Droplet snapshot attributes.
         * @summary List Snapshots for a Droplet
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {number} [perPage] Number of items returned per page
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDropletSnapshots(dropletId: number, perPage?: number, page?: number, options?: any): AxiosPromise<InlineResponse20025> {
            return DropletsApiFp(configuration).listDropletSnapshots(dropletId, perPage, page, options).then((request) => request(axios, basePath));
        },
        /**
         * If the status of a request to destroy a Droplet with its associated resources reported any errors, it can be retried by sending a POST request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/retry` endpoint.  Only one destroy can be active at a time per Droplet. If a retry is issued while another destroy is in progress for the Droplet a 409 status code will be returned. A successful response will include a 202 response code and no content.
         * @summary Retry a Droplet Destroy with Associated Resources Request
         * @param {number} dropletId A unique identifier for a Droplet instance.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retryDestroyWithAssociatedResource(dropletId: number, options?: any): AxiosPromise<void> {
            return DropletsApiFp(configuration).retryDestroyWithAssociatedResource(dropletId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DropletsApi - object-oriented interface
 * @export
 * @class DropletsApi
 * @extends {BaseAPI}
 */
export class DropletsApi extends BaseAPI {
    /**
     * To create a new Droplet, send a POST request to `/v2/droplets` setting the required attributes.  A Droplet will be created using the provided information. The response body will contain a JSON object with a key called `droplet`. The value will be an object containing the standard attributes for your new Droplet. The response code, 202 Accepted, does not indicate the success or failure of the operation, just that the request has been accepted for processing. The `actions` returned as part of the response's `links` object can be used to check the status of the Droplet create event.  ### Create Multiple Droplets  Creating multiple Droplets is very similar to creating a single Droplet. Instead of sending `name` as a string, send `names` as an array of strings. A Droplet will be created for each name you send using the associated information. Up to ten Droplets may be created this way at a time.  Rather than returning a single Droplet, the response body will contain a JSON array with a key called `droplets`. This will be set to an array of JSON objects, each of which will contain the standard Droplet attributes. The response code, 202 Accepted, does not indicate the success or failure of any operation, just that the request has been accepted for processing. The array of `actions` returned as part of the response's `links` object can be used to check the status of each individual Droplet create event.
     * @summary Create a New Droplet
     * @param {V2DropletsBody} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public createDroplet(body?: V2DropletsBody, options?: any) {
        return DropletsApiFp(this.configuration).createDroplet(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete a Droplet, send a DELETE request to `/v2/droplets/$DROPLET_ID`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @summary Delete an Existing Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public destroyDroplet(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).destroyDroplet(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To delete **all** Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your DELETE request. For example,  `/v2/droplets?tag_name=$TAG_NAME`.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @summary Deleting Droplets by Tag
     * @param {string} tagName Specifies Droplets to be deleted by tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public destroyDropletsByTag(tagName: string, options?: any) {
        return DropletsApiFp(this.configuration).destroyDropletsByTag(tagName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To destroy a Droplet along with all of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/dangerous` endpoint. The headers of this request must include an `X-Dangerous` key set to `true`. To preview which resources will be destroyed, first query the Droplet's associated resources. This operation _can not_ be reverse and should be used with caution.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
     * @summary Destroy a Droplet and All of its Associated Resources (Dangerous)
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {boolean} xDangerous Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public destroyWithAssociatedResourcesDangerous(dropletId: number, xDangerous: boolean, options?: any) {
        return DropletsApiFp(this.configuration).destroyWithAssociatedResourcesDangerous(dropletId, xDangerous, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To destroy a Droplet along with a sub-set of its associated resources, send a DELETE request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/selective` endpoint. The JSON body of the request should include `snapshots`, `volumes`, or `volume_snapshots` keys each set to an array of IDs for the associated resources to be destroyed. The IDs can be found by querying the Droplet's associated resources. Any associated resource not included in the request will remain and continue to accrue changes on your account.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
     * @summary Selectively Destroy a Droplet and its Associated Resources
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public destroyWithAssociatedResourcesSelective(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).destroyWithAssociatedResourcesSelective(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To check on the status of a request to destroy a Droplet with its associated resources, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/status` endpoint.
     * @summary Check Status of a Droplet Destroy with Associated Resources Request
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public getDestroyWithAssociatedResourcesStatus(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).getDestroyWithAssociatedResourcesStatus(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To show information about an individual Droplet, send a GET request to `/v2/droplets/$DROPLET_ID`.
     * @summary Retrieve an Existing Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public getDroplet(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).getDroplet(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve a list of all Droplets that are co-located on the same physical hardware, send a GET request to `/v2/reports/droplet_neighbors_ids`.  The results will be returned as a JSON object with a key of `neighbor_ids`. This will be set to an array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server. An empty array indicates that all Droplets associated with your account are located on separate physical hardware.
     * @summary List All Droplet Neighbors
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listAllDropletNeighborsIds(options?: any) {
        return DropletsApiFp(this.configuration).listAllDropletNeighborsIds(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list all Droplets in your account, send a GET request to `/v2/droplets`.  The response body will be a JSON object with a key of `droplets`. This will be set to an array containing objects each representing a Droplet. These will contain the standard Droplet attributes.  ### Filtering Results by Tag  It's possible to request filtered results by including certain query parameters. To only list Droplets assigned to a specific tag, include the `tag_name` query parameter set to the name of the tag in your GET request. For example, `/v2/droplets?tag_name=$TAG_NAME`.
     * @summary List All Droplets
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {string} [tagName] Used to filter Droplets by a specific tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listAllDroplets(perPage?: number, page?: number, tagName?: string, options?: any) {
        return DropletsApiFp(this.configuration).listAllDroplets(perPage, page, tagName, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To list the associated billable resources that can be destroyed along with a Droplet, send a GET request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources` endpoint.  The response will be a JSON object containing `snapshots`, `volumes`, and `volume_snapshots` keys. Each will be set to an array of objects containing information about the associated resources.
     * @summary List Associated Resources for a Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listDropletAssociatedResources(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).listDropletAssociatedResources(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve any backups associated with a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/backups`.  You will get back a JSON object that has a `backups` key. This will be set to an array of backup objects, each of which contain the standard Droplet backup attributes.
     * @summary List Backups for a Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listDropletBackups(dropletId: number, perPage?: number, page?: number, options?: any) {
        return DropletsApiFp(this.configuration).listDropletBackups(dropletId, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve a list of all firewalls available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/firewalls`  The response will be a JSON object that has a key called `firewalls`. This will be set to an array of `firewall` objects, each of which contain the standard `firewall` attributes.
     * @summary List all Firewalls Applied to a Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listDropletFirewalls(dropletId: number, perPage?: number, page?: number, options?: any) {
        return DropletsApiFp(this.configuration).listDropletFirewalls(dropletId, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve a list of all kernels available to a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/kernels`  The response will be a JSON object that has a key called `kernels`. This will be set to an array of `kernel` objects, each of which contain the standard `kernel` attributes.
     * @summary List All Available Kernels for a Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listDropletKernels(dropletId: number, perPage?: number, page?: number, options?: any) {
        return DropletsApiFp(this.configuration).listDropletKernels(dropletId, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve a list of any \"neighbors\" (i.e. Droplets that are co-located on the same physical hardware) for a specific Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/neighbors`.  The results will be returned as a JSON object with a key of `droplets`. This will be set to an array containing objects representing any other Droplets that share the same physical hardware. An empty array indicates that the Droplet is not co-located any other Droplets associated with your account.
     * @summary List Neighbors for a Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listDropletNeighbors(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).listDropletNeighbors(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To retrieve the snapshots that have been created from a Droplet, send a GET request to `/v2/droplets/$DROPLET_ID/snapshots`.  You will get back a JSON object that has a `snapshots` key. This will be set to an array of snapshot objects, each of which contain the standard Droplet snapshot attributes.
     * @summary List Snapshots for a Droplet
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {number} [perPage] Number of items returned per page
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public listDropletSnapshots(dropletId: number, perPage?: number, page?: number, options?: any) {
        return DropletsApiFp(this.configuration).listDropletSnapshots(dropletId, perPage, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * If the status of a request to destroy a Droplet with its associated resources reported any errors, it can be retried by sending a POST request to the `/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/retry` endpoint.  Only one destroy can be active at a time per Droplet. If a retry is issued while another destroy is in progress for the Droplet a 409 status code will be returned. A successful response will include a 202 response code and no content.
     * @summary Retry a Droplet Destroy with Associated Resources Request
     * @param {number} dropletId A unique identifier for a Droplet instance.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DropletsApi
     */
    public retryDestroyWithAssociatedResource(dropletId: number, options?: any) {
        return DropletsApiFp(this.configuration).retryDestroyWithAssociatedResource(dropletId, options).then((request) => request(this.axios, this.basePath));
    }
}

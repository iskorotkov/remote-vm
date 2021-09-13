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
import { AppPropose } from '../models';
import { AppProposeResponse } from '../models';
import { AppResponse } from '../models';
import { AppsCreateAppRequest } from '../models';
import { AppsCreateDeploymentRequest } from '../models';
import { AppsDeleteAppResponse } from '../models';
import { AppsDeploymentResponse } from '../models';
import { AppsDeploymentsResponse } from '../models';
import { AppsGetInstanceSizeResponse } from '../models';
import { AppsGetLogsResponse } from '../models';
import { AppsGetTierResponse } from '../models';
import { AppsListInstanceSizesResponse } from '../models';
import { AppsListRegionsResponse } from '../models';
import { AppsListTiersResponse } from '../models';
import { AppsResponse } from '../models';
import { AppsUpdateAppRequest } from '../models';
import { URL, URLSearchParams } from 'url'
/**
 * AppsApi - axios parameter creator
 * @export
 */
export const AppsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new app by submitting an app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
         * @summary Create a New App
         * @param {AppsCreateAppRequest} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createApp: async (body: AppsCreateAppRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createApp.');
            }
            const localVarPath = `/v2/apps`;
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
         * Creating an app deployment will pull the latest changes from your repository and schedule a new deployment for your app.
         * @summary Create an App Deployment
         * @param {AppsCreateDeploymentRequest} body
         * @param {string} appId The app ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDeployment: async (body: AppsCreateDeploymentRequest, appId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createDeployment.');
            }
            // verify required parameter 'appId' is not null or undefined
            if (appId === null || appId === undefined) {
                throw new RequiredError('appId','Required parameter appId was null or undefined when calling createDeployment.');
            }
            const localVarPath = `/v2/apps/{app_id}/deployments`
                .replace(`{${"app_id"}}`, encodeURIComponent(String(appId)));
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
         * Delete an existing app. Once deleted, all active deployments will be permanently shut down and the app deleted. If needed, be sure to back up your app specification so that you may re-create it at a later time.
         * @summary Delete an App
         * @param {string} id The ID of the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteApp: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteApp.');
            }
            const localVarPath = `/v2/apps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * Retrieve details about an existing app by either its ID or name. To retrieve an app by its name, do not include an ID in the request path. Information about the current active deployment as well as any in progress ones will also be included in the response.
         * @summary Retrieve an Existing App
         * @param {string} id The ID of the app
         * @param {string} [name] The name of the app to retrieve.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApp: async (id: string, name?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getApp.');
            }
            const localVarPath = `/v2/apps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
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
         * Retrieve information about an app deployment.
         * @summary Retrieve an App Deployment
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDeployment: async (appId: string, deploymentId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'appId' is not null or undefined
            if (appId === null || appId === undefined) {
                throw new RequiredError('appId','Required parameter appId was null or undefined when calling getDeployment.');
            }
            // verify required parameter 'deploymentId' is not null or undefined
            if (deploymentId === null || deploymentId === undefined) {
                throw new RequiredError('deploymentId','Required parameter deploymentId was null or undefined when calling getDeployment.');
            }
            const localVarPath = `/v2/apps/{app_id}/deployments/{deployment_id}`
                .replace(`{${"app_id"}}`, encodeURIComponent(String(appId)))
                .replace(`{${"deployment_id"}}`, encodeURIComponent(String(deploymentId)));
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
         * Retrieve information about a specific instance size for `service`, `worker`, and `job` components.
         * @summary Retrieve an Instance Size
         * @param {string} slug The slug of the instance size
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstanceSize: async (slug: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            if (slug === null || slug === undefined) {
                throw new RequiredError('slug','Required parameter slug was null or undefined when calling getInstanceSize.');
            }
            const localVarPath = `/v2/apps/tiers/instance_sizes/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
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
         * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
         * @summary Retrieve Deployment Logs
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {string} componentName An optional component name. If set, logs will be limited to this component only.
         * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
         * @param {boolean} [follow] Whether the logs should follow live updates.
         * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLogs: async (appId: string, deploymentId: string, componentName: string, type: string, follow?: boolean, podConnectionTimeout?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'appId' is not null or undefined
            if (appId === null || appId === undefined) {
                throw new RequiredError('appId','Required parameter appId was null or undefined when calling getLogs.');
            }
            // verify required parameter 'deploymentId' is not null or undefined
            if (deploymentId === null || deploymentId === undefined) {
                throw new RequiredError('deploymentId','Required parameter deploymentId was null or undefined when calling getLogs.');
            }
            // verify required parameter 'componentName' is not null or undefined
            if (componentName === null || componentName === undefined) {
                throw new RequiredError('componentName','Required parameter componentName was null or undefined when calling getLogs.');
            }
            // verify required parameter 'type' is not null or undefined
            if (type === null || type === undefined) {
                throw new RequiredError('type','Required parameter type was null or undefined when calling getLogs.');
            }
            const localVarPath = `/v2/apps/{app_id}/deployments/{deployment_id}/components/{component_name}/logs`
                .replace(`{${"app_id"}}`, encodeURIComponent(String(appId)))
                .replace(`{${"deployment_id"}}`, encodeURIComponent(String(deploymentId)))
                .replace(`{${"component_name"}}`, encodeURIComponent(String(componentName)));
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

            if (follow !== undefined) {
                localVarQueryParameter['follow'] = follow;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (podConnectionTimeout !== undefined) {
                localVarQueryParameter['pod_connection_timeout'] = podConnectionTimeout;
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
         * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
         * @summary Retrieve Aggregate Deployment Logs
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
         * @param {boolean} [follow] Whether the logs should follow live updates.
         * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLogsAggregate: async (appId: string, deploymentId: string, type: string, follow?: boolean, podConnectionTimeout?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'appId' is not null or undefined
            if (appId === null || appId === undefined) {
                throw new RequiredError('appId','Required parameter appId was null or undefined when calling getLogsAggregate.');
            }
            // verify required parameter 'deploymentId' is not null or undefined
            if (deploymentId === null || deploymentId === undefined) {
                throw new RequiredError('deploymentId','Required parameter deploymentId was null or undefined when calling getLogsAggregate.');
            }
            // verify required parameter 'type' is not null or undefined
            if (type === null || type === undefined) {
                throw new RequiredError('type','Required parameter type was null or undefined when calling getLogsAggregate.');
            }
            const localVarPath = `/v2/apps/{app_id}/deployments/{deployment_id}/logs`
                .replace(`{${"app_id"}}`, encodeURIComponent(String(appId)))
                .replace(`{${"deployment_id"}}`, encodeURIComponent(String(deploymentId)));
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

            if (follow !== undefined) {
                localVarQueryParameter['follow'] = follow;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (podConnectionTimeout !== undefined) {
                localVarQueryParameter['pod_connection_timeout'] = podConnectionTimeout;
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
         * Retrieve information about a specific app tier.
         * @summary Retrieve an App Tier
         * @param {string} slug The slug of the tier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTier: async (slug: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'slug' is not null or undefined
            if (slug === null || slug === undefined) {
                throw new RequiredError('slug','Required parameter slug was null or undefined when calling getTier.');
            }
            const localVarPath = `/v2/apps/tiers/{slug}`
                .replace(`{${"slug"}}`, encodeURIComponent(String(slug)));
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
         * List all apps on your account. Information about the current active deployment as well as any in progress ones will also be included for each app.
         * @summary List All Apps
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {number} [perPage] Number of items returned per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listApps: async (page?: number, perPage?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/apps`;
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

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (perPage !== undefined) {
                localVarQueryParameter['per_page'] = perPage;
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
         * List all deployments of an app.
         * @summary List App Deployments
         * @param {string} appId The app ID
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {number} [perPage] Number of items returned per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDeployments: async (appId: string, page?: number, perPage?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'appId' is not null or undefined
            if (appId === null || appId === undefined) {
                throw new RequiredError('appId','Required parameter appId was null or undefined when calling listDeployments.');
            }
            const localVarPath = `/v2/apps/{app_id}/deployments`
                .replace(`{${"app_id"}}`, encodeURIComponent(String(appId)));
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

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (perPage !== undefined) {
                localVarQueryParameter['per_page'] = perPage;
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
         * List all instance sizes for `service`, `worker`, and `job` components.
         * @summary List Instance Sizes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listInstanceSizes: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/apps/tiers/instance_sizes`;
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
         * List all regions supported by App Platform.
         * @summary List App Regions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRegions: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/apps/regions`;
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
         * List all app tiers.
         * @summary List App Tiers
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTiers: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v2/apps/tiers`;
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
         * Immediately cancel an in-progress deployment.
         * @summary Cancel a Deployment
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postCancelDeployment: async (appId: string, deploymentId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'appId' is not null or undefined
            if (appId === null || appId === undefined) {
                throw new RequiredError('appId','Required parameter appId was null or undefined when calling postCancelDeployment.');
            }
            // verify required parameter 'deploymentId' is not null or undefined
            if (deploymentId === null || deploymentId === undefined) {
                throw new RequiredError('deploymentId','Required parameter deploymentId was null or undefined when calling postCancelDeployment.');
            }
            const localVarPath = `/v2/apps/{app_id}/deployments/{deployment_id}/cancel`
                .replace(`{${"app_id"}}`, encodeURIComponent(String(appId)))
                .replace(`{${"deployment_id"}}`, encodeURIComponent(String(deploymentId)));
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
         * Update an existing app by submitting a new app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
         * @summary Update an App
         * @param {AppsUpdateAppRequest} body
         * @param {string} id The ID of the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateApp: async (body: AppsUpdateAppRequest, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateApp.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateApp.');
            }
            const localVarPath = `/v2/apps/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * To propose and validate a spec for a new or existing app, send a PUT request to the `/v2/apps/propose` endpoint. The request returns some information about the proposed app, including app cost and upgrade cost. If an existing app ID is specified, the app spec is treated as a proposed update to the existing app.
         * @summary Propose an App Spec
         * @param {AppPropose} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validateAppSpec: async (body: AppPropose, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling validateAppSpec.');
            }
            const localVarPath = `/v2/apps/propose`;
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
 * AppsApi - functional programming interface
 * @export
 */
export const AppsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new app by submitting an app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
         * @summary Create a New App
         * @param {AppsCreateAppRequest} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createApp(body: AppsCreateAppRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).createApp(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Creating an app deployment will pull the latest changes from your repository and schedule a new deployment for your app.
         * @summary Create an App Deployment
         * @param {AppsCreateDeploymentRequest} body
         * @param {string} appId The app ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createDeployment(body: AppsCreateDeploymentRequest, appId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsDeploymentResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).createDeployment(body, appId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete an existing app. Once deleted, all active deployments will be permanently shut down and the app deleted. If needed, be sure to back up your app specification so that you may re-create it at a later time.
         * @summary Delete an App
         * @param {string} id The ID of the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteApp(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsDeleteAppResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).deleteApp(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve details about an existing app by either its ID or name. To retrieve an app by its name, do not include an ID in the request path. Information about the current active deployment as well as any in progress ones will also be included in the response.
         * @summary Retrieve an Existing App
         * @param {string} id The ID of the app
         * @param {string} [name] The name of the app to retrieve.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getApp(id: string, name?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).getApp(id, name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve information about an app deployment.
         * @summary Retrieve an App Deployment
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDeployment(appId: string, deploymentId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsDeploymentResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).getDeployment(appId, deploymentId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve information about a specific instance size for `service`, `worker`, and `job` components.
         * @summary Retrieve an Instance Size
         * @param {string} slug The slug of the instance size
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getInstanceSize(slug: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsGetInstanceSizeResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).getInstanceSize(slug, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
         * @summary Retrieve Deployment Logs
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {string} componentName An optional component name. If set, logs will be limited to this component only.
         * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
         * @param {boolean} [follow] Whether the logs should follow live updates.
         * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLogs(appId: string, deploymentId: string, componentName: string, type: string, follow?: boolean, podConnectionTimeout?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsGetLogsResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).getLogs(appId, deploymentId, componentName, type, follow, podConnectionTimeout, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
         * @summary Retrieve Aggregate Deployment Logs
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
         * @param {boolean} [follow] Whether the logs should follow live updates.
         * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLogsAggregate(appId: string, deploymentId: string, type: string, follow?: boolean, podConnectionTimeout?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsGetLogsResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).getLogsAggregate(appId, deploymentId, type, follow, podConnectionTimeout, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve information about a specific app tier.
         * @summary Retrieve an App Tier
         * @param {string} slug The slug of the tier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTier(slug: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsGetTierResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).getTier(slug, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all apps on your account. Information about the current active deployment as well as any in progress ones will also be included for each app.
         * @summary List All Apps
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {number} [perPage] Number of items returned per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listApps(page?: number, perPage?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).listApps(page, perPage, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all deployments of an app.
         * @summary List App Deployments
         * @param {string} appId The app ID
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {number} [perPage] Number of items returned per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDeployments(appId: string, page?: number, perPage?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsDeploymentsResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).listDeployments(appId, page, perPage, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all instance sizes for `service`, `worker`, and `job` components.
         * @summary List Instance Sizes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listInstanceSizes(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsListInstanceSizesResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).listInstanceSizes(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all regions supported by App Platform.
         * @summary List App Regions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listRegions(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsListRegionsResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).listRegions(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all app tiers.
         * @summary List App Tiers
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTiers(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsListTiersResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).listTiers(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Immediately cancel an in-progress deployment.
         * @summary Cancel a Deployment
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postCancelDeployment(appId: string, deploymentId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppsDeploymentResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).postCancelDeployment(appId, deploymentId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update an existing app by submitting a new app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
         * @summary Update an App
         * @param {AppsUpdateAppRequest} body
         * @param {string} id The ID of the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateApp(body: AppsUpdateAppRequest, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).updateApp(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * To propose and validate a spec for a new or existing app, send a PUT request to the `/v2/apps/propose` endpoint. The request returns some information about the proposed app, including app cost and upgrade cost. If an existing app ID is specified, the app spec is treated as a proposed update to the existing app.
         * @summary Propose an App Spec
         * @param {AppPropose} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async validateAppSpec(body: AppPropose, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppProposeResponse>> {
            const localVarAxiosArgs = await AppsApiAxiosParamCreator(configuration).validateAppSpec(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AppsApi - factory interface
 * @export
 */
export const AppsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new app by submitting an app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
         * @summary Create a New App
         * @param {AppsCreateAppRequest} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createApp(body: AppsCreateAppRequest, options?: any): AxiosPromise<AppResponse> {
            return AppsApiFp(configuration).createApp(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Creating an app deployment will pull the latest changes from your repository and schedule a new deployment for your app.
         * @summary Create an App Deployment
         * @param {AppsCreateDeploymentRequest} body
         * @param {string} appId The app ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDeployment(body: AppsCreateDeploymentRequest, appId: string, options?: any): AxiosPromise<AppsDeploymentResponse> {
            return AppsApiFp(configuration).createDeployment(body, appId, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete an existing app. Once deleted, all active deployments will be permanently shut down and the app deleted. If needed, be sure to back up your app specification so that you may re-create it at a later time.
         * @summary Delete an App
         * @param {string} id The ID of the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteApp(id: string, options?: any): AxiosPromise<AppsDeleteAppResponse> {
            return AppsApiFp(configuration).deleteApp(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve details about an existing app by either its ID or name. To retrieve an app by its name, do not include an ID in the request path. Information about the current active deployment as well as any in progress ones will also be included in the response.
         * @summary Retrieve an Existing App
         * @param {string} id The ID of the app
         * @param {string} [name] The name of the app to retrieve.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApp(id: string, name?: string, options?: any): AxiosPromise<AppResponse> {
            return AppsApiFp(configuration).getApp(id, name, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve information about an app deployment.
         * @summary Retrieve an App Deployment
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDeployment(appId: string, deploymentId: string, options?: any): AxiosPromise<AppsDeploymentResponse> {
            return AppsApiFp(configuration).getDeployment(appId, deploymentId, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve information about a specific instance size for `service`, `worker`, and `job` components.
         * @summary Retrieve an Instance Size
         * @param {string} slug The slug of the instance size
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstanceSize(slug: string, options?: any): AxiosPromise<AppsGetInstanceSizeResponse> {
            return AppsApiFp(configuration).getInstanceSize(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
         * @summary Retrieve Deployment Logs
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {string} componentName An optional component name. If set, logs will be limited to this component only.
         * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
         * @param {boolean} [follow] Whether the logs should follow live updates.
         * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLogs(appId: string, deploymentId: string, componentName: string, type: string, follow?: boolean, podConnectionTimeout?: string, options?: any): AxiosPromise<AppsGetLogsResponse> {
            return AppsApiFp(configuration).getLogs(appId, deploymentId, componentName, type, follow, podConnectionTimeout, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
         * @summary Retrieve Aggregate Deployment Logs
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
         * @param {boolean} [follow] Whether the logs should follow live updates.
         * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLogsAggregate(appId: string, deploymentId: string, type: string, follow?: boolean, podConnectionTimeout?: string, options?: any): AxiosPromise<AppsGetLogsResponse> {
            return AppsApiFp(configuration).getLogsAggregate(appId, deploymentId, type, follow, podConnectionTimeout, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve information about a specific app tier.
         * @summary Retrieve an App Tier
         * @param {string} slug The slug of the tier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTier(slug: string, options?: any): AxiosPromise<AppsGetTierResponse> {
            return AppsApiFp(configuration).getTier(slug, options).then((request) => request(axios, basePath));
        },
        /**
         * List all apps on your account. Information about the current active deployment as well as any in progress ones will also be included for each app.
         * @summary List All Apps
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {number} [perPage] Number of items returned per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listApps(page?: number, perPage?: number, options?: any): AxiosPromise<AppsResponse> {
            return AppsApiFp(configuration).listApps(page, perPage, options).then((request) => request(axios, basePath));
        },
        /**
         * List all deployments of an app.
         * @summary List App Deployments
         * @param {string} appId The app ID
         * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
         * @param {number} [perPage] Number of items returned per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDeployments(appId: string, page?: number, perPage?: number, options?: any): AxiosPromise<AppsDeploymentsResponse> {
            return AppsApiFp(configuration).listDeployments(appId, page, perPage, options).then((request) => request(axios, basePath));
        },
        /**
         * List all instance sizes for `service`, `worker`, and `job` components.
         * @summary List Instance Sizes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listInstanceSizes(options?: any): AxiosPromise<AppsListInstanceSizesResponse> {
            return AppsApiFp(configuration).listInstanceSizes(options).then((request) => request(axios, basePath));
        },
        /**
         * List all regions supported by App Platform.
         * @summary List App Regions
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRegions(options?: any): AxiosPromise<AppsListRegionsResponse> {
            return AppsApiFp(configuration).listRegions(options).then((request) => request(axios, basePath));
        },
        /**
         * List all app tiers.
         * @summary List App Tiers
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTiers(options?: any): AxiosPromise<AppsListTiersResponse> {
            return AppsApiFp(configuration).listTiers(options).then((request) => request(axios, basePath));
        },
        /**
         * Immediately cancel an in-progress deployment.
         * @summary Cancel a Deployment
         * @param {string} appId The app ID
         * @param {string} deploymentId The deployment ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postCancelDeployment(appId: string, deploymentId: string, options?: any): AxiosPromise<AppsDeploymentResponse> {
            return AppsApiFp(configuration).postCancelDeployment(appId, deploymentId, options).then((request) => request(axios, basePath));
        },
        /**
         * Update an existing app by submitting a new app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
         * @summary Update an App
         * @param {AppsUpdateAppRequest} body
         * @param {string} id The ID of the app
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateApp(body: AppsUpdateAppRequest, id: string, options?: any): AxiosPromise<AppResponse> {
            return AppsApiFp(configuration).updateApp(body, id, options).then((request) => request(axios, basePath));
        },
        /**
         * To propose and validate a spec for a new or existing app, send a PUT request to the `/v2/apps/propose` endpoint. The request returns some information about the proposed app, including app cost and upgrade cost. If an existing app ID is specified, the app spec is treated as a proposed update to the existing app.
         * @summary Propose an App Spec
         * @param {AppPropose} body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        validateAppSpec(body: AppPropose, options?: any): AxiosPromise<AppProposeResponse> {
            return AppsApiFp(configuration).validateAppSpec(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AppsApi - object-oriented interface
 * @export
 * @class AppsApi
 * @extends {BaseAPI}
 */
export class AppsApi extends BaseAPI {
    /**
     * Create a new app by submitting an app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
     * @summary Create a New App
     * @param {AppsCreateAppRequest} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public createApp(body: AppsCreateAppRequest, options?: any) {
        return AppsApiFp(this.configuration).createApp(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Creating an app deployment will pull the latest changes from your repository and schedule a new deployment for your app.
     * @summary Create an App Deployment
     * @param {AppsCreateDeploymentRequest} body
     * @param {string} appId The app ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public createDeployment(body: AppsCreateDeploymentRequest, appId: string, options?: any) {
        return AppsApiFp(this.configuration).createDeployment(body, appId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Delete an existing app. Once deleted, all active deployments will be permanently shut down and the app deleted. If needed, be sure to back up your app specification so that you may re-create it at a later time.
     * @summary Delete an App
     * @param {string} id The ID of the app
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public deleteApp(id: string, options?: any) {
        return AppsApiFp(this.configuration).deleteApp(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve details about an existing app by either its ID or name. To retrieve an app by its name, do not include an ID in the request path. Information about the current active deployment as well as any in progress ones will also be included in the response.
     * @summary Retrieve an Existing App
     * @param {string} id The ID of the app
     * @param {string} [name] The name of the app to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public getApp(id: string, name?: string, options?: any) {
        return AppsApiFp(this.configuration).getApp(id, name, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve information about an app deployment.
     * @summary Retrieve an App Deployment
     * @param {string} appId The app ID
     * @param {string} deploymentId The deployment ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public getDeployment(appId: string, deploymentId: string, options?: any) {
        return AppsApiFp(this.configuration).getDeployment(appId, deploymentId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve information about a specific instance size for `service`, `worker`, and `job` components.
     * @summary Retrieve an Instance Size
     * @param {string} slug The slug of the instance size
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public getInstanceSize(slug: string, options?: any) {
        return AppsApiFp(this.configuration).getInstanceSize(slug, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
     * @summary Retrieve Deployment Logs
     * @param {string} appId The app ID
     * @param {string} deploymentId The deployment ID
     * @param {string} componentName An optional component name. If set, logs will be limited to this component only.
     * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
     * @param {boolean} [follow] Whether the logs should follow live updates.
     * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public getLogs(appId: string, deploymentId: string, componentName: string, type: string, follow?: boolean, podConnectionTimeout?: string, options?: any) {
        return AppsApiFp(this.configuration).getLogs(appId, deploymentId, componentName, type, follow, podConnectionTimeout, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
     * @summary Retrieve Aggregate Deployment Logs
     * @param {string} appId The app ID
     * @param {string} deploymentId The deployment ID
     * @param {string} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
     * @param {boolean} [follow] Whether the logs should follow live updates.
     * @param {string} [podConnectionTimeout] An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public getLogsAggregate(appId: string, deploymentId: string, type: string, follow?: boolean, podConnectionTimeout?: string, options?: any) {
        return AppsApiFp(this.configuration).getLogsAggregate(appId, deploymentId, type, follow, podConnectionTimeout, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve information about a specific app tier.
     * @summary Retrieve an App Tier
     * @param {string} slug The slug of the tier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public getTier(slug: string, options?: any) {
        return AppsApiFp(this.configuration).getTier(slug, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * List all apps on your account. Information about the current active deployment as well as any in progress ones will also be included for each app.
     * @summary List All Apps
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {number} [perPage] Number of items returned per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public listApps(page?: number, perPage?: number, options?: any) {
        return AppsApiFp(this.configuration).listApps(page, perPage, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * List all deployments of an app.
     * @summary List App Deployments
     * @param {string} appId The app ID
     * @param {number} [page] Which &#x27;page&#x27; of paginated results to return.
     * @param {number} [perPage] Number of items returned per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public listDeployments(appId: string, page?: number, perPage?: number, options?: any) {
        return AppsApiFp(this.configuration).listDeployments(appId, page, perPage, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * List all instance sizes for `service`, `worker`, and `job` components.
     * @summary List Instance Sizes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public listInstanceSizes(options?: any) {
        return AppsApiFp(this.configuration).listInstanceSizes(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * List all regions supported by App Platform.
     * @summary List App Regions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public listRegions(options?: any) {
        return AppsApiFp(this.configuration).listRegions(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * List all app tiers.
     * @summary List App Tiers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public listTiers(options?: any) {
        return AppsApiFp(this.configuration).listTiers(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Immediately cancel an in-progress deployment.
     * @summary Cancel a Deployment
     * @param {string} appId The app ID
     * @param {string} deploymentId The deployment ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public postCancelDeployment(appId: string, deploymentId: string, options?: any) {
        return AppsApiFp(this.configuration).postCancelDeployment(appId, deploymentId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Update an existing app by submitting a new app specification. For documentation on app specifications (`AppSpec` objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
     * @summary Update an App
     * @param {AppsUpdateAppRequest} body
     * @param {string} id The ID of the app
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public updateApp(body: AppsUpdateAppRequest, id: string, options?: any) {
        return AppsApiFp(this.configuration).updateApp(body, id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * To propose and validate a spec for a new or existing app, send a PUT request to the `/v2/apps/propose` endpoint. The request returns some information about the proposed app, including app cost and upgrade cost. If an existing app ID is specified, the app spec is treated as a proposed update to the existing app.
     * @summary Propose an App Spec
     * @param {AppPropose} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppsApi
     */
    public validateAppSpec(body: AppPropose, options?: any) {
        return AppsApiFp(this.configuration).validateAppSpec(body, options).then((request) => request(this.axios, this.basePath));
    }
}

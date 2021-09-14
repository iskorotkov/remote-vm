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
import {ApiClient} from '../ApiClient';
import {Alerts} from './Alerts';

/**
 * The AlertPolicy model module.
 * @module model/AlertPolicy
 * @version 2.0
 */
export class AlertPolicy {
  /**
   * Constructs a new <code>AlertPolicy</code>.
   * @alias module:model/AlertPolicy
   * @class
   * @param alerts {module:model/Alerts} 
   * @param compare {module:model/AlertPolicy.CompareEnum} 
   * @param description {String} 
   * @param enabled {Boolean} 
   * @param entities {Array.<String>} 
   * @param tags {Array.<String>} 
   * @param type {module:model/AlertPolicy.TypeEnum} 
   * @param uuid {String} 
   * @param value {Number} 
   * @param window {module:model/AlertPolicy.WindowEnum} 
   */
  constructor(alerts, compare, description, enabled, entities, tags, type, uuid, value, window) {
    this.alerts = alerts;
    this.compare = compare;
    this.description = description;
    this.enabled = enabled;
    this.entities = entities;
    this.tags = tags;
    this.type = type;
    this.uuid = uuid;
    this.value = value;
    this.window = window;
  }

  /**
   * Constructs a <code>AlertPolicy</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AlertPolicy} obj Optional instance to populate.
   * @return {module:model/AlertPolicy} The populated <code>AlertPolicy</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AlertPolicy();
      if (data.hasOwnProperty('alerts'))
        obj.alerts = Alerts.constructFromObject(data['alerts']);
      if (data.hasOwnProperty('compare'))
        obj.compare = ApiClient.convertToType(data['compare'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
      if (data.hasOwnProperty('enabled'))
        obj.enabled = ApiClient.convertToType(data['enabled'], 'Boolean');
      if (data.hasOwnProperty('entities'))
        obj.entities = ApiClient.convertToType(data['entities'], ['String']);
      if (data.hasOwnProperty('tags'))
        obj.tags = ApiClient.convertToType(data['tags'], ['String']);
      if (data.hasOwnProperty('type'))
        obj.type = ApiClient.convertToType(data['type'], 'String');
      if (data.hasOwnProperty('uuid'))
        obj.uuid = ApiClient.convertToType(data['uuid'], 'String');
      if (data.hasOwnProperty('value'))
        obj.value = ApiClient.convertToType(data['value'], 'Number');
      if (data.hasOwnProperty('window'))
        obj.window = ApiClient.convertToType(data['window'], 'String');
    }
    return obj;
  }
}

/**
 * @member {module:model/Alerts} alerts
 */
AlertPolicy.prototype.alerts = undefined;

/**
 * Allowed values for the <code>compare</code> property.
 * @enum {String}
 * @readonly
 */
AlertPolicy.CompareEnum = {
  /**
   * value: "GreaterThan"
   * @const
   */
  greaterThan: "GreaterThan",

  /**
   * value: "LessThan"
   * @const
   */
  lessThan: "LessThan"
};
/**
 * @member {module:model/AlertPolicy.CompareEnum} compare
 */
AlertPolicy.prototype.compare = undefined;

/**
 * @member {String} description
 */
AlertPolicy.prototype.description = undefined;

/**
 * @member {Boolean} enabled
 */
AlertPolicy.prototype.enabled = undefined;

/**
 * @member {Array.<String>} entities
 */
AlertPolicy.prototype.entities = undefined;

/**
 * @member {Array.<String>} tags
 */
AlertPolicy.prototype.tags = undefined;

/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
AlertPolicy.TypeEnum = {
  /**
   * value: "v1/insights/droplet/load_1"
   * @const
   */
  load1: "v1/insights/droplet/load_1",

  /**
   * value: "v1/insights/droplet/load_5"
   * @const
   */
  load5: "v1/insights/droplet/load_5",

  /**
   * value: "v1/insights/droplet/load_15"
   * @const
   */
  load15: "v1/insights/droplet/load_15",

  /**
   * value: "v1/insights/droplet/memory_utilization_percent"
   * @const
   */
  memoryUtilizationPercent: "v1/insights/droplet/memory_utilization_percent",

  /**
   * value: "v1/insights/droplet/disk_utilization_percent"
   * @const
   */
  diskUtilizationPercent: "v1/insights/droplet/disk_utilization_percent",

  /**
   * value: "v1/insights/droplet/cpu"
   * @const
   */
  cpu: "v1/insights/droplet/cpu",

  /**
   * value: "v1/insights/droplet/disk_read"
   * @const
   */
  diskRead: "v1/insights/droplet/disk_read",

  /**
   * value: "v1/insights/droplet/disk_write"
   * @const
   */
  diskWrite: "v1/insights/droplet/disk_write",

  /**
   * value: "v1/insights/droplet/public_outbound_bandwidth"
   * @const
   */
  publicOutboundBandwidth: "v1/insights/droplet/public_outbound_bandwidth",

  /**
   * value: "v1/insights/droplet/public_inbound_bandwidth"
   * @const
   */
  publicInboundBandwidth: "v1/insights/droplet/public_inbound_bandwidth",

  /**
   * value: "v1/insights/droplet/private_outbound_bandwidth"
   * @const
   */
  privateOutboundBandwidth: "v1/insights/droplet/private_outbound_bandwidth",

  /**
   * value: "v1/insights/droplet/private_inbound_bandwidth"
   * @const
   */
  privateInboundBandwidth: "v1/insights/droplet/private_inbound_bandwidth"
};
/**
 * @member {module:model/AlertPolicy.TypeEnum} type
 */
AlertPolicy.prototype.type = undefined;

/**
 * @member {String} uuid
 */
AlertPolicy.prototype.uuid = undefined;

/**
 * @member {Number} value
 */
AlertPolicy.prototype.value = undefined;

/**
 * Allowed values for the <code>window</code> property.
 * @enum {String}
 * @readonly
 */
AlertPolicy.WindowEnum = {
  /**
   * value: "5m"
   * @const
   */
  _5m: "5m",

  /**
   * value: "10m"
   * @const
   */
  _10m: "10m",

  /**
   * value: "30m"
   * @const
   */
  _30m: "30m",

  /**
   * value: "1h"
   * @const
   */
  _1h: "1h"
};
/**
 * @member {module:model/AlertPolicy.WindowEnum} window
 */
AlertPolicy.prototype.window = undefined;


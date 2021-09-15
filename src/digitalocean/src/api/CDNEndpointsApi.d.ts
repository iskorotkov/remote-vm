/**
* CDNEndpoints service.
* @module api/CDNEndpointsApi
* @version 2.0
*/
export class CDNEndpointsApi {
    /**
    * Constructs a new CDNEndpointsApi.
    * @alias module:api/CDNEndpointsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createCdnEndpoint operation.
     * @callback moduleapi/CDNEndpointsApi~createCdnEndpointCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2011{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New CDN Endpoint
     * To create a new CDN endpoint, send a POST request to &#x60;/v2/cdn/endpoints&#x60;. The origin attribute must be set to the fully qualified domain name (FQDN) of a DigitalOcean Space. Optionally, the TTL may be configured by setting the &#x60;ttl&#x60; attribute.  A custom subdomain may be configured by specifying the &#x60;custom_domain&#x60; and &#x60;certificate_id&#x60; attributes.
     * @param {module:model/CdnEndpoint} body
     * @param {module:api/CDNEndpointsApi~createCdnEndpointCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createCdnEndpoint(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteCdnEndpoint operation.
     * @callback moduleapi/CDNEndpointsApi~deleteCdnEndpointCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a CDN Endpoint
     * To delete a specific CDN endpoint, send a DELETE request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {String} cdnId A unique identifier for a CDN endpoint.
     * @param {module:api/CDNEndpointsApi~deleteCdnEndpointCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteCdnEndpoint(cdnId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getCdnEndpoint operation.
     * @callback moduleapi/CDNEndpointsApi~getCdnEndpointCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2011{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing CDN Endpoint
     * To show information about an existing CDN endpoint, send a GET request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID&#x60;.
     * @param {String} cdnId A unique identifier for a CDN endpoint.
     * @param {module:api/CDNEndpointsApi~getCdnEndpointCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getCdnEndpoint(cdnId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listCdnEndpoints operation.
     * @callback moduleapi/CDNEndpointsApi~listCdnEndpointsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2006{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All CDN Endpoints
     * To list all of the CDN endpoints available on your account, send a GET request to &#x60;/v2/cdn/endpoints&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/CDNEndpointsApi~listCdnEndpointsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listCdnEndpoints(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the purgeCdnCache operation.
     * @callback moduleapi/CDNEndpointsApi~purgeCdnCacheCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Purge the Cache for an Existing CDN Endpoint
     * To purge cached content from a CDN endpoint, send a DELETE request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID/cache&#x60;. The body of the request should include a &#x60;files&#x60; attribute containing a list of cached file paths to be purged. A path may be for a single file or may contain a wildcard (&#x60;*&#x60;) to recursively purge all files under a directory. When only a wildcard is provided, all cached files will be purged.
     * @param {module:model/PurgeCache} body
     * @param {String} cdnId A unique identifier for a CDN endpoint.
     * @param {module:api/CDNEndpointsApi~purgeCdnCacheCallback} callback The callback function, accepting three arguments: error, data, response
     */
    purgeCdnCache(body: any, cdnId: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateCdnEndpoint operation.
     * @callback moduleapi/CDNEndpointsApi~updateCdnEndpointCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2011{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a CDN Endpoint
     * To update the TTL, certificate ID, or the FQDN of the custom subdomain for an existing CDN endpoint, send a PUT request to &#x60;/v2/cdn/endpoints/$ENDPOINT_ID&#x60;.
     * @param {module:model/UpdateEndpoint} body
     * @param {String} cdnId A unique identifier for a CDN endpoint.
     * @param {module:api/CDNEndpointsApi~updateCdnEndpointCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateCdnEndpoint(body: any, cdnId: string, callback: any): any;
}
/**
 * /CDNEndpointsApi~createCdnEndpointCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

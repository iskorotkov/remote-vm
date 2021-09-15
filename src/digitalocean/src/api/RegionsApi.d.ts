/**
* Regions service.
* @module api/RegionsApi
* @version 2.0
*/
export class RegionsApi {
    /**
    * Constructs a new RegionsApi.
    * @alias module:api/RegionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the listAllRegions operation.
     * @callback moduleapi/RegionsApi~listAllRegionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20045{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Data Center Regions
     * To list all of the regions that are available, send a GET request to &#x60;/v2/regions&#x60;. The response will be a JSON object with a key called &#x60;regions&#x60;. The value of this will be an array of &#x60;region&#x60; objects, each of which will contain the standard region attributes.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/RegionsApi~listAllRegionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllRegions(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
}
/**
 * /RegionsApi~listAllRegionsCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

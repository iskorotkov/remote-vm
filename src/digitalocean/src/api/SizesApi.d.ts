/**
* Sizes service.
* @module api/SizesApi
* @version 2.0
*/
export class SizesApi {
    /**
    * Constructs a new SizesApi.
    * @alias module:api/SizesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the listAllSizes operation.
     * @callback moduleapi/SizesApi~listAllSizesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20052{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Droplet Sizes
     * To list all of available Droplet sizes, send a GET request to &#x60;/v2/sizes&#x60;. The response will be a JSON object with a key called &#x60;sizes&#x60;. The value of this will be an array of &#x60;size&#x60; objects each of which contain the standard size attributes.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/SizesApi~listAllSizesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllSizes(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
}
/**
 * /SizesApi~listAllSizesCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

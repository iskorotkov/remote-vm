/**
* Actions service.
* @module api/ActionsApi
* @version 2.0
*/
export class ActionsApi {
    /**
    * Constructs a new ActionsApi.
    * @alias module:api/ActionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getAction operation.
     * @callback moduleapi/ActionsApi~getActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2005{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Action
     * To retrieve a specific action object, send a GET request to &#x60;/v2/actions/$ACTION_ID&#x60;.
     * @param {Number} actionId A unique numeric ID that can be used to identify and reference an action.
     * @param {module:api/ActionsApi~getActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getAction(actionId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listAllActions operation.
     * @callback moduleapi/ActionsApi~listAllActionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2004{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Actions
     * This will be the entire list of actions taken on your account, so it will be quite large. As with any large collection returned by the API, the results will be paginated with only 20 on each page by default.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ActionsApi~listAllActionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllActions(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
}
/**
 * /ActionsApi~getActionCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

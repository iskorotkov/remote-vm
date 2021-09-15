/**
* Account service.
* @module api/AccountApi
* @version 2.0
*/
export class AccountApi {
    /**
    * Constructs a new AccountApi.
    * @alias module:api/AccountApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getUserInformation operation.
     * @callback moduleapi/AccountApi~getUserInformationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2002{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get User Information
     * To show information about the current user account, send a GET request to &#x60;/v2/account&#x60;.
     * @param {module:api/AccountApi~getUserInformationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getUserInformation(callback: any): any;
}
/**
 * /AccountApi~getUserInformationCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

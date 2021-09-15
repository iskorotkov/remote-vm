/**
* SSHKeys service.
* @module api/SSHKeysApi
* @version 2.0
*/
export class SSHKeysApi {
    /**
    * Constructs a new SSHKeysApi.
    * @alias module:api/SSHKeysApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createSshKey operation.
     * @callback moduleapi/SSHKeysApi~createSshKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse201{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New SSH Key
     * To add a new SSH public key to your DigitalOcean account, send a POST request to &#x60;/v2/account/keys&#x60;. Set the &#x60;name&#x60; attribute to the name you wish to use and the &#x60;public_key&#x60; attribute to the full public key you are adding.
     * @param {module:model/SshKey} body
     * @param {module:api/SSHKeysApi~createSshKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createSshKey(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the destroySshKey operation.
     * @callback moduleapi/SSHKeysApi~destroySshKeyCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete an SSH Key
     * To destroy a public SSH key that you have in your account, send a DELETE request to &#x60;/v2/account/keys/$KEY_ID&#x60; or &#x60;/v2/account/keys/$KEY_FINGERPRINT&#x60;. A 204 status will be returned, indicating that the action was successful and that the response body is empty.
     * @param {module:model/SshKeyIdentifier} sshKeyIdentifier Either the ID or the fingerprint of an existing SSH key.
     * @param {module:api/SSHKeysApi~destroySshKeyCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroySshKey(sshKeyIdentifier: any, callback: any): any;
    /**
     * Callback function to receive the result of the getSshKey operation.
     * @callback moduleapi/SSHKeysApi~getSshKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse201{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing SSH Key
     * To get information about a key, send a GET request to &#x60;/v2/account/keys/$KEY_ID&#x60; or &#x60;/v2/account/keys/$KEY_FINGERPRINT&#x60;. The response will be a JSON object with the key &#x60;ssh_key&#x60; and value an ssh_key object which contains the standard ssh_key attributes.
     * @param {module:model/SshKeyIdentifier} sshKeyIdentifier Either the ID or the fingerprint of an existing SSH key.
     * @param {module:api/SSHKeysApi~getSshKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getSshKey(sshKeyIdentifier: any, callback: any): any;
    /**
     * Callback function to receive the result of the listAllKeys operation.
     * @callback moduleapi/SSHKeysApi~listAllKeysCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2003{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All SSH Keys
     * To list all of the keys in your account, send a GET request to &#x60;/v2/account/keys&#x60;. The response will be a JSON object with a key set to &#x60;ssh_keys&#x60;. The value of this will be an array of ssh_key objects, each of which contains the standard ssh_key attributes.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/SSHKeysApi~listAllKeysCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllKeys(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the updateSshKey operation.
     * @callback moduleapi/SSHKeysApi~updateSshKeyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse201{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update an SSH Key&#x27;s Name
     * To update the name of an SSH key, send a PUT request to either &#x60;/v2/account/keys/$SSH_KEY_ID&#x60; or &#x60;/v2/account/keys/$SSH_KEY_FINGERPRINT&#x60;. Set the &#x60;name&#x60; attribute to the new name you want to use.
     * @param {module:model/KeysSshKeyIdentifierBody} body Set the &#x60;name&#x60; attribute to the new name you want to use.
     * @param {module:model/SshKeyIdentifier} sshKeyIdentifier Either the ID or the fingerprint of an existing SSH key.
     * @param {module:api/SSHKeysApi~updateSshKeyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateSshKey(body: any, sshKeyIdentifier: any, callback: any): any;
}
/**
 * /SSHKeysApi~createSshKeyCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

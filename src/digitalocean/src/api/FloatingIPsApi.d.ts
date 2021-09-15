/**
* FloatingIPs service.
* @module api/FloatingIPsApi
* @version 2.0
*/
export class FloatingIPsApi {
    /**
    * Constructs a new FloatingIPsApi.
    * @alias module:api/FloatingIPsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createFloatingIp operation.
     * @callback moduleapi/FloatingIPsApi~createFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2022{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Floating IP
     * On creation, a floating IP must be either assigned to a Droplet or reserved to a region. * To create a new floating IP assigned to a Droplet, send a POST   request to &#x60;/v2/floating_ips&#x60; with the &#x60;droplet_id&#x60; attribute.  * To create a new floating IP reserved to a region, send a POST request to   &#x60;/v2/floating_ips&#x60; with the &#x60;region&#x60; attribute.  **Note**:  In addition to the standard rate limiting, only 12 floating IPs may be created per 60 seconds.
     * @param {module:model/FloatingIpCreate} body
     * @param {module:api/FloatingIPsApi~createFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createFloatingIp(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteFloatingIp operation.
     * @callback moduleapi/FloatingIPsApi~deleteFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Floating IPs
     * To delete a floating IP and remove it from your account, send a DELETE request to &#x60;/v2/floating_ips/$FLOATING_IP_ADDR&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {String} floatingIp A floating IP address.
     * @param {module:api/FloatingIPsApi~deleteFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteFloatingIp(floatingIp: string, callback: any): any;
    /**
     * Callback function to receive the result of the getFloatingIp operation.
     * @callback moduleapi/FloatingIPsApi~getFloatingIpCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20031{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Floating IP
     * To show information about a floating IP, send a GET request to &#x60;/v2/floating_ips/$FLOATING_IP_ADDR&#x60;.
     * @param {String} floatingIp A floating IP address.
     * @param {module:api/FloatingIPsApi~getFloatingIpCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getFloatingIp(floatingIp: string, callback: any): any;
    /**
     * Callback function to receive the result of the listFloatingIps operation.
     * @callback moduleapi/FloatingIPsApi~listFloatingIpsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20030{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Floating IPs
     * To list all of the floating IPs available on your account, send a GET request to &#x60;/v2/floating_ips&#x60;.
     * @param {module:api/FloatingIPsApi~listFloatingIpsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listFloatingIps(callback: any): any;
}
/**
 * /FloatingIPsApi~createFloatingIpCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

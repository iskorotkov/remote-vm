/**
* FloatingIPActions service.
* @module api/FloatingIPActionsApi
* @version 2.0
*/
export class FloatingIPActionsApi {
    /**
    * Constructs a new FloatingIPActionsApi.
    * @alias module:api/FloatingIPActionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getFloatingIpAction operation.
     * @callback moduleapi/FloatingIPActionsApi~getFloatingIpActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20111{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Floating IP Action
     * To retrieve the status of a floating IP action, send a GET request to &#x60;/v2/floating_ips/$FLOATING_IP/actions/$ACTION_ID&#x60;.
     * @param {String} floatingIp A floating IP address.
     * @param {Number} actionId A unique numeric ID that can be used to identify and reference an action.
     * @param {module:api/FloatingIPActionsApi~getFloatingIpActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getFloatingIpAction(floatingIp: string, actionId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listFloatingIpActions operation.
     * @callback moduleapi/FloatingIPActionsApi~listFloatingIpActionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20032{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Actions for a Floating IP
     * To retrieve all actions that have been executed on a floating IP, send a GET request to &#x60;/v2/floating_ips/$FLOATING_IP/actions&#x60;.
     * @param {String} floatingIp A floating IP address.
     * @param {module:api/FloatingIPActionsApi~listFloatingIpActionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listFloatingIpActions(floatingIp: string, callback: any): any;
    /**
     * Callback function to receive the result of the postFloatingIpAction operation.
     * @callback moduleapi/FloatingIPActionsApi~postFloatingIpActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20111{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Initiate a Floating IP Action
     * To initiate an action on a floating IP send a POST request to &#x60;/v2/floating_ips/$FLOATING_IP/actions&#x60;. In the JSON body to the request, set the &#x60;type&#x60; attribute to on of the supported action types:  | Action     | Details |------------|-------- | &#x60;assign&#x60;   | Assigns a floating IP to a Droplet | &#x60;unassign&#x60; | Unassign a floating IP from a Droplet
     * @param {String} floatingIp A floating IP address.
     * @param {Object} opts Optional parameters
     * @param {module:model/FloatingIpActionsBody} opts.body The &#x60;type&#x60; attribute set in the request body will specify the action that
will be taken on the floating IP.

     * @param {module:api/FloatingIPActionsApi~postFloatingIpActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postFloatingIpAction(floatingIp: string, opts: {
        body: any;
    }, callback: any): any;
}
/**
 * /FloatingIPActionsApi~getFloatingIpActionCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

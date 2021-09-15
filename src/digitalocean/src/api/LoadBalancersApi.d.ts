/**
* LoadBalancers service.
* @module api/LoadBalancersApi
* @version 2.0
*/
export class LoadBalancersApi {
    /**
    * Constructs a new LoadBalancersApi.
    * @alias module:api/LoadBalancersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the addLoadBalancerDroplets operation.
     * @callback moduleapi/LoadBalancersApi~addLoadBalancerDropletsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Droplets to a Load Balancer
     * To assign a Droplet to a load balancer instance, send a POST request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs. Individual Droplets can not be added to a load balancer configured with a Droplet tag. Attempting to do so will result in a \&quot;422 Unprocessable Entity\&quot; response from the API.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {module:model/LbIdDropletsBody} body
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~addLoadBalancerDropletsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addLoadBalancerDroplets(body: any, lbId: string, callback: any): any;
    /**
     * Callback function to receive the result of the addLoadBalancerForwardingRules operation.
     * @callback moduleapi/LoadBalancersApi~addLoadBalancerForwardingRulesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Forwarding Rules to a Load Balancer
     * To add an additional forwarding rule to a load balancer instance, send a POST request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules&#x60;. In the body of the request, there should be a &#x60;forwarding_rules&#x60; attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {module:model/LbIdForwardingRulesBody} body
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~addLoadBalancerForwardingRulesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addLoadBalancerForwardingRules(body: any, lbId: string, callback: any): any;
    /**
     * Callback function to receive the result of the createLoadBalancer operation.
     * @callback moduleapi/LoadBalancersApi~createLoadBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2026{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Load Balancer
     * To create a new load balancer instance, send a POST request to &#x60;/v2/load_balancers&#x60;.  You can specify the Droplets that will sit behind the load balancer using one of two methods:  * Set &#x60;droplet_ids&#x60; to a list of specific Droplet IDs. * Set &#x60;tag&#x60; to the name of a tag. All Droplets with this tag applied will be   assigned to the load balancer. Additional Droplets will be automatically   assigned as they are tagged.  These methods are mutually exclusive.
     * @param {module:model/LoadBalancerCreate} body
     * @param {module:api/LoadBalancersApi~createLoadBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createLoadBalancer(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteLoadBalancer operation.
     * @callback moduleapi/LoadBalancersApi~deleteLoadBalancerCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Load Balancer
     * To delete a load balancer instance, disassociating any Droplets assigned to it and removing it from your account, send a DELETE request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~deleteLoadBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteLoadBalancer(lbId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getLoadBalancer operation.
     * @callback moduleapi/LoadBalancersApi~getLoadBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2026{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Load Balancer
     * To show information about a load balancer instance, send a GET request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID&#x60;.
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~getLoadBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getLoadBalancer(lbId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listAllLoadBalancers operation.
     * @callback moduleapi/LoadBalancersApi~listAllLoadBalancersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20039{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Load Balancers
     * To list all of the load balancer instances on your account, send a GET request to &#x60;/v2/load_balancers&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/LoadBalancersApi~listAllLoadBalancersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllLoadBalancers(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the removeLoadBalancerDroplets operation.
     * @callback moduleapi/LoadBalancersApi~removeLoadBalancerDropletsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Droplets from a Load Balancer
     * To remove a Droplet from a load balancer instance, send a DELETE request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {module:model/LbIdDropletsBody1} body
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~removeLoadBalancerDropletsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removeLoadBalancerDroplets(body: any, lbId: string, callback: any): any;
    /**
     * Callback function to receive the result of the removeLoadBalancerForwardingRules operation.
     * @callback moduleapi/LoadBalancersApi~removeLoadBalancerForwardingRulesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Forwarding Rules from a Load Balancer
     * To remove forwarding rules from a load balancer instance, send a DELETE request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID/forwarding_rules&#x60;. In the body of the request, there should be a &#x60;forwarding_rules&#x60; attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {module:model/LbIdForwardingRulesBody1} body
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~removeLoadBalancerForwardingRulesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removeLoadBalancerForwardingRules(body: any, lbId: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateLoadBalancer operation.
     * @callback moduleapi/LoadBalancersApi~updateLoadBalancerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2026{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Load Balancer
     * To update a load balancer&#x27;s settings, send a PUT request to &#x60;/v2/load_balancers/$LOAD_BALANCER_ID&#x60;. The request should contain a full representation of the load balancer including existing attributes. It may contain _one of_ the &#x60;droplets_ids&#x60; or &#x60;tag&#x60; attributes as they are mutually exclusive. **Note that any attribute that is not provided will be reset to its default value.**
     * @param {module:model/LoadBalancerCreate} body
     * @param {String} lbId A unique identifier for a load balancer.
     * @param {module:api/LoadBalancersApi~updateLoadBalancerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateLoadBalancer(body: any, lbId: string, callback: any): any;
}
/**
 * /LoadBalancersApi~addLoadBalancerDropletsCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

/**
* Firewalls service.
* @module api/FirewallsApi
* @version 2.0
*/
export class FirewallsApi {
    /**
    * Constructs a new FirewallsApi.
    * @alias module:api/FirewallsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the addFirewallDroplets operation.
     * @callback moduleapi/FirewallsApi~addFirewallDropletsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Droplets to a Firewall
     * To assign a Droplet to a firewall, send a POST request to &#x60;/v2/firewalls/$FIREWALL_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallIdDropletsBody} opts.body
     * @param {module:api/FirewallsApi~addFirewallDropletsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addFirewallDroplets(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the addFirewallRules operation.
     * @callback moduleapi/FirewallsApi~addFirewallRulesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Rules to a Firewall
     * To add additional access rules to a firewall, send a POST request to &#x60;/v2/firewalls/$FIREWALL_ID/rules&#x60;. The body of the request may include an inbound_rules and/or outbound_rules attribute containing an array of rules to be added.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallIdRulesBody} opts.body
     * @param {module:api/FirewallsApi~addFirewallRulesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addFirewallRules(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the addFirewallTags operation.
     * @callback moduleapi/FirewallsApi~addFirewallTagsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Tags to a Firewall
     * To assign a tag representing a group of Droplets to a firewall, send a POST request to &#x60;/v2/firewalls/$FIREWALL_ID/tags&#x60;. In the body of the request, there should be a &#x60;tags&#x60; attribute containing a list of tag names.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallIdTagsBody} opts.body
     * @param {module:api/FirewallsApi~addFirewallTagsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addFirewallTags(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the createFirewall operation.
     * @callback moduleapi/FirewallsApi~createFirewallCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2021{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Firewall
     * To create a new firewall, send a POST request to &#x60;/v2/firewalls&#x60;. The request must contain at least one inbound or outbound access rule.
     * @param {Object} opts Optional parameters
     * @param {module:model/V2FirewallsBody} opts.body
     * @param {module:api/FirewallsApi~createFirewallCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createFirewall(opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteFirewall operation.
     * @callback moduleapi/FirewallsApi~deleteFirewallCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Firewall
     * To delete a firewall send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID&#x60;.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {module:api/FirewallsApi~deleteFirewallCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteFirewall(firewallId: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteFirewallDroplets operation.
     * @callback moduleapi/FirewallsApi~deleteFirewallDropletsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Droplets from a Firewall
     * To remove a Droplet from a firewall, send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID/droplets&#x60;. In the body of the request, there should be a &#x60;droplet_ids&#x60; attribute containing a list of Droplet IDs.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallIdDropletsBody1} opts.body
     * @param {module:api/FirewallsApi~deleteFirewallDropletsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteFirewallDroplets(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteFirewallRules operation.
     * @callback moduleapi/FirewallsApi~deleteFirewallRulesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Rules from a Firewall
     * To remove access rules from a firewall, send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID/rules&#x60;. The body of the request may include an &#x60;inbound_rules&#x60; and/or &#x60;outbound_rules&#x60; attribute containing an array of rules to be removed.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallIdRulesBody1} opts.body
     * @param {module:api/FirewallsApi~deleteFirewallRulesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteFirewallRules(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteFirewallTags operation.
     * @callback moduleapi/FirewallsApi~deleteFirewallTagsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Tags from a Firewall
     * To remove a tag representing a group of Droplets from a firewall, send a DELETE request to &#x60;/v2/firewalls/$FIREWALL_ID/tags&#x60;. In the body of the request, there should be a &#x60;tags&#x60; attribute containing a list of tag names.  No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallIdTagsBody1} opts.body
     * @param {module:api/FirewallsApi~deleteFirewallTagsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteFirewallTags(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getFirewall operation.
     * @callback moduleapi/FirewallsApi~getFirewallCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2021{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Firewall
     * To show information about an existing firewall, send a GET request to &#x60;/v2/firewalls/$FIREWALL_ID&#x60;.
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {module:api/FirewallsApi~getFirewallCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getFirewall(firewallId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listFirewalls operation.
     * @callback moduleapi/FirewallsApi~listFirewallsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20027{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Firewalls
     * To list all of the firewalls available on your account, send a GET request to &#x60;/v2/firewalls&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/FirewallsApi~listFirewallsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listFirewalls(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the updateFirewall operation.
     * @callback moduleapi/FirewallsApi~updateFirewallCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2021{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Firewall
     * To update the configuration of an existing firewall, send a PUT request to &#x60;/v2/firewalls/$FIREWALL_ID&#x60;. The request should contain a full representation of the firewall including existing attributes. **Note that any attributes that are not provided will be reset to their default values.**
     * @param {String} firewallId A unique ID that can be used to identify and reference a firewall.
     * @param {Object} opts Optional parameters
     * @param {module:model/FirewallsFirewallIdBody} opts.body
     * @param {module:api/FirewallsApi~updateFirewallCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateFirewall(firewallId: string, opts: {
        body: any;
    }, callback: any): any;
}
/**
 * /FirewallsApi~addFirewallDropletsCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

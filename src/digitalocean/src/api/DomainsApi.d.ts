/**
* Domains service.
* @module api/DomainsApi
* @version 2.0
*/
export class DomainsApi {
    /**
    * Constructs a new DomainsApi.
    * @alias module:api/DomainsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createDomain operation.
     * @callback moduleapi/DomainsApi~createDomainCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2018{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Domain
     * To create a new domain, send a POST request to &#x60;/v2/domains&#x60;. Set the \&quot;name\&quot; attribute to the domain name you are adding. Optionally, you may set the \&quot;ip_address\&quot; attribute, and an A record will be automatically created pointing to the apex domain.
     * @param {Object} opts Optional parameters
     * @param {module:model/Domain} opts.body
     * @param {module:api/DomainsApi~createDomainCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createDomain(opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteDomain operation.
     * @callback moduleapi/DomainsApi~deleteDomainCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Domain
     * To delete a domain, send a DELETE request to &#x60;/v2/domains/$DOMAIN_NAME&#x60;.
     * @param {String} domainName The name of the domain itself.
     * @param {module:api/DomainsApi~deleteDomainCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDomain(domainName: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDomain operation.
     * @callback moduleapi/DomainsApi~getDomainCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20019{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Domain
     * To get details about a specific domain, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME&#x60;.
     * @param {String} domainName The name of the domain itself.
     * @param {module:api/DomainsApi~getDomainCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDomain(domainName: string, callback: any): any;
    /**
     * Callback function to receive the result of the listAllDomains operation.
     * @callback moduleapi/DomainsApi~listAllDomainsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20018{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Domains
     * To retrieve a list of all of the domains in your account, send a GET request to &#x60;/v2/domains&#x60;.
     * @param {module:api/DomainsApi~listAllDomainsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllDomains(callback: any): any;
}
/**
 * /DomainsApi~createDomainCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

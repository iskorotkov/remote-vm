/**
* DomainRecords service.
* @module api/DomainRecordsApi
* @version 2.0
*/
export class DomainRecordsApi {
    /**
    * Constructs a new DomainRecordsApi.
    * @alias module:api/DomainRecordsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createDomainRecord operation.
     * @callback moduleapi/DomainRecordsApi~createDomainRecordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2019{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Domain Record
     * To create a new record to a domain, send a POST request to &#x60;/v2/domains/$DOMAIN_NAME/records&#x60;.  The request must include all of the required fields for the domain record type being added.  See the [attribute table](#tag/Domain-Records) for details regarding record types and their respective required attributes.
     * @param {String} domainName The name of the domain itself.
     * @param {Object} opts Optional parameters
     * @param {module:model/DomainNameRecordsBody} opts.body
     * @param {module:api/DomainRecordsApi~createDomainRecordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createDomainRecord(domainName: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteDomainRecord operation.
     * @callback moduleapi/DomainRecordsApi~deleteDomainRecordCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Domain Record
     * To delete a record for a domain, send a DELETE request to &#x60;/v2/domains/$DOMAIN_NAME/records/$DOMAIN_RECORD_ID&#x60;.  The record will be deleted and the response status will be a 204. This indicates a successful request with no body returned.
     * @param {String} domainName The name of the domain itself.
     * @param {Number} domainRecordId The unique identifier of the domain record.
     * @param {module:api/DomainRecordsApi~deleteDomainRecordCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteDomainRecord(domainName: string, domainRecordId: number, callback: any): any;
    /**
     * Callback function to receive the result of the getDomainRecord operation.
     * @callback moduleapi/DomainRecordsApi~getDomainRecordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20021{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Domain Record
     * To retrieve a specific domain record, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records/$RECORD_ID&#x60;.
     * @param {String} domainName The name of the domain itself.
     * @param {Number} domainRecordId The unique identifier of the domain record.
     * @param {module:api/DomainRecordsApi~getDomainRecordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDomainRecord(domainName: string, domainRecordId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listAllDomainRecords operation.
     * @callback moduleapi/DomainRecordsApi~listAllDomainRecordsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20020{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Domain Records
     * To get a listing of all records configured for a domain, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records&#x60;. The list of records returned can be filtered by using the &#x60;name&#x60; and &#x60;type&#x60; query parameters. For example, to only include A records for a domain, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records?type&#x3D;A&#x60;. &#x60;name&#x60; must be a fully qualified record name. For example, to only include records matching &#x60;sub.example.com&#x60;, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records?name&#x3D;sub.example.com&#x60;. Both name and type may be used together.
     * @param {String} domainName The name of the domain itself.
     * @param {Object} opts Optional parameters
     * @param {String} opts.name A fully qualified record name. For example, to only include records matching sub.example.com, send a GET request to &#x60;/v2/domains/$DOMAIN_NAME/records?name&#x3D;sub.example.com&#x60;.
     * @param {module:model/String} opts.type The type of the DNS record. For example: A, CNAME, TXT, ...
     * @param {module:api/DomainRecordsApi~listAllDomainRecordsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllDomainRecords(domainName: string, opts: {
        name: string;
        type: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the patchUpdateDomainRecord operation.
     * @callback moduleapi/DomainRecordsApi~patchUpdateDomainRecordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20021{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Domain Record
     * To update an existing record, send a PATCH request to &#x60;/v2/domains/$DOMAIN_NAME/records/$DOMAIN_RECORD_ID&#x60;. Any attribute valid for the record type can be set to a new value for the record.  See the [attribute table](#tag/Domain-Records) for details regarding record types and their respective attributes.
     * @param {String} domainName The name of the domain itself.
     * @param {Number} domainRecordId The unique identifier of the domain record.
     * @param {Object} opts Optional parameters
     * @param {module:model/DomainRecord} opts.body
     * @param {module:api/DomainRecordsApi~patchUpdateDomainRecordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    patchUpdateDomainRecord(domainName: string, domainRecordId: number, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the updateDomainRecord operation.
     * @callback moduleapi/DomainRecordsApi~updateDomainRecordCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20021{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Domain Record
     * To update an existing record, send a PUT request to &#x60;/v2/domains/$DOMAIN_NAME/records/$DOMAIN_RECORD_ID&#x60;. Any attribute valid for the record type can be set to a new value for the record.  See the [attribute table](#tag/Domain-Records) for details regarding record types and their respective attributes.
     * @param {String} domainName The name of the domain itself.
     * @param {Number} domainRecordId The unique identifier of the domain record.
     * @param {Object} opts Optional parameters
     * @param {module:model/DomainRecord} opts.body
     * @param {module:api/DomainRecordsApi~updateDomainRecordCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateDomainRecord(domainName: string, domainRecordId: number, opts: {
        body: any;
    }, callback: any): any;
}
/**
 * /DomainRecordsApi~createDomainRecordCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

/**
* Billing service.
* @module api/BillingApi
* @version 2.0
*/
export class BillingApi {
    /**
    * Constructs a new BillingApi.
    * @alias module:api/BillingApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getCustomerBalance operation.
     * @callback moduleapi/BillingApi~getCustomerBalanceCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Balance{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Customer Balance
     * To retrieve the balances on a customer&#x27;s account, send a GET request to &#x60;/v2/customers/my/balance&#x60;.
     * @param {module:api/BillingApi~getCustomerBalanceCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getCustomerBalance(callback: any): any;
    /**
     * Callback function to receive the result of the getInvoiceByUuid operation.
     * @callback moduleapi/BillingApi~getInvoiceByUuidCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20010{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Invoice by UUID
     * To retrieve the invoice items for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID&#x60;.
     * @param {String} invoiceUuid UUID of the invoice
     * @param {module:api/BillingApi~getInvoiceByUuidCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getInvoiceByUuid(invoiceUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getInvoiceCsvByUuid operation.
     * @callback moduleapi/BillingApi~getInvoiceCsvByUuidCallback
     * @param {String} error Error message, if any.
     * @param {'String'{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Invoice CSV by UUID
     * To retrieve a CSV for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID/csv&#x60;.
     * @param {String} invoiceUuid UUID of the invoice
     * @param {module:api/BillingApi~getInvoiceCsvByUuidCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getInvoiceCsvByUuid(invoiceUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getInvoicePdfByUuid operation.
     * @callback moduleapi/BillingApi~getInvoicePdfByUuidCallback
     * @param {String} error Error message, if any.
     * @param {'Blob'{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Invoice PDF by UUID
     * To retrieve a PDF for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID/pdf&#x60;.
     * @param {String} invoiceUuid UUID of the invoice
     * @param {module:api/BillingApi~getInvoicePdfByUuidCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getInvoicePdfByUuid(invoiceUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getInvoiceSummaryByUuid operation.
     * @callback moduleapi/BillingApi~getInvoiceSummaryByUuidCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InvoiceSummary{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Invoice Summary by UUID
     * To retrieve a summary for an invoice, send a GET request to &#x60;/v2/customers/my/invoices/$INVOICE_UUID/summary&#x60;.
     * @param {String} invoiceUuid UUID of the invoice
     * @param {module:api/BillingApi~getInvoiceSummaryByUuidCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getInvoiceSummaryByUuid(invoiceUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the listBillingHistory operation.
     * @callback moduleapi/BillingApi~listBillingHistoryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2008{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Billing History
     * To retrieve a list of all billing history entries, send a GET request to &#x60;/v2/customers/my/billing_history&#x60;.
     * @param {module:api/BillingApi~listBillingHistoryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listBillingHistory(callback: any): any;
    /**
     * Callback function to receive the result of the listInvoices operation.
     * @callback moduleapi/BillingApi~listInvoicesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2009{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Invoices
     * To retrieve a list of all invoices, send a GET request to &#x60;/v2/customers/my/invoices&#x60;.
     * @param {module:api/BillingApi~listInvoicesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listInvoices(callback: any): any;
}
/**
 * /BillingApi~getCustomerBalanceCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

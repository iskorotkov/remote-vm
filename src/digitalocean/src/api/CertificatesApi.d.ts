/**
* Certificates service.
* @module api/CertificatesApi
* @version 2.0
*/
export class CertificatesApi {
    /**
    * Constructs a new CertificatesApi.
    * @alias module:api/CertificatesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createCertificates operation.
     * @callback moduleapi/CertificatesApi~createCertificatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2012{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Certificate
     * To upload new SSL certificate which you have previously generated, send a POST request to &#x60;/v2/certificates&#x60;.  When uploading a user-generated certificate, the &#x60;private_key&#x60;, &#x60;leaf_certificate&#x60;, and optionally the &#x60;certificate_chain&#x60; attributes should be provided. The type must be set to &#x60;custom&#x60;.  When using Let&#x27;s Encrypt to create a certificate, the &#x60;dns_names&#x60; attribute must be provided, and the type must be set to &#x60;lets_encrypt&#x60;.
     * @param {module:model/V2CertificatesBody} body
     * @param {module:api/CertificatesApi~createCertificatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createCertificates(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteCertificate operation.
     * @callback moduleapi/CertificatesApi~deleteCertificateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Certificate
     * To delete a specific certificate, send a DELETE request to &#x60;/v2/certificates/$CERTIFICATE_ID&#x60;.
     * @param {String} certificateId A unique identifier for a certificate.
     * @param {module:api/CertificatesApi~deleteCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteCertificate(certificateId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getCertificate operation.
     * @callback moduleapi/CertificatesApi~getCertificateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2012{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Certificate
     * To show information about an existing certificate, send a GET request to &#x60;/v2/certificates/$CERTIFICATE_ID&#x60;.
     * @param {String} certificateId A unique identifier for a certificate.
     * @param {module:api/CertificatesApi~getCertificateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getCertificate(certificateId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listCertificates operation.
     * @callback moduleapi/CertificatesApi~listCertificatesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2007{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Certificates
     * To list all of the certificates available on your account, send a GET request to &#x60;/v2/certificates&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/CertificatesApi~listCertificatesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listCertificates(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
}
/**
 * /CertificatesApi~createCertificatesCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

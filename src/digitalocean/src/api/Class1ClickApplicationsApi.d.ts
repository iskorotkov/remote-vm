/**
* Class1ClickApplications service.
* @module api/Class1ClickApplicationsApi
* @version 2.0
*/
export class Class1ClickApplicationsApi {
    /**
    * Constructs a new Class1ClickApplicationsApi.
    * @alias module:api/Class1ClickApplicationsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the installKubernetes operation.
     * @callback moduleapi/Class1ClickApplicationsApi~installKubernetesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2001{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Install Kubernetes 1-Click Applications
     * To install a Kubernetes 1-Click application on a cluster, send a POST request to &#x60;/v2/1-clicks/kubernetes&#x60;. The &#x60;addon_slugs&#x60; and &#x60;cluster_uuid&#x60; must be provided as body parameter in order to specify which 1-Click application(s) to install. To list all available 1-Click Kubernetes applications, send a request to &#x60;/v2/1-clicks?type&#x3D;kubernetes&#x60;.
     * @param {module:model/Model1ClickCreate} body
     * @param {module:api/Class1ClickApplicationsApi~installKubernetesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    installKubernetes(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the list operation.
     * @callback moduleapi/Class1ClickApplicationsApi~listCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse200{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List 1-Click Applications
     * To list all available 1-Click applications, send a GET request to &#x60;/v2/1-clicks&#x60;. The &#x60;type&#x60; may be provided as query paramater in order to restrict results to a certain type of 1-Click, for example: &#x60;/v2/1-clicks?type&#x3D;droplet&#x60;. Current supported types are &#x60;kubernetes&#x60; and &#x60;droplet&#x60;.  The response will be a JSON object with a key called &#x60;1_clicks&#x60;. This will be set to an array of 1-Click application data, each of which will contain the the slug and type for the 1-Click.
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.type Restrict results to a certain type of 1-Click.
     * @param {module:api/Class1ClickApplicationsApi~listCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    list(opts: {
        type: any;
    }, callback: any): any;
}
/**
 * /Class1ClickApplicationsApi~installKubernetesCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

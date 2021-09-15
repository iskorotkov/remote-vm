/**
* Droplets service.
* @module api/DropletsApi
* @version 2.0
*/
export class DropletsApi {
    /**
    * Constructs a new DropletsApi.
    * @alias module:api/DropletsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createDroplet operation.
     * @callback moduleapi/DropletsApi~createDropletCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse202{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Droplet
     * To create a new Droplet, send a POST request to &#x60;/v2/droplets&#x60; setting the required attributes.  A Droplet will be created using the provided information. The response body will contain a JSON object with a key called &#x60;droplet&#x60;. The value will be an object containing the standard attributes for your new Droplet. The response code, 202 Accepted, does not indicate the success or failure of the operation, just that the request has been accepted for processing. The &#x60;actions&#x60; returned as part of the response&#x27;s &#x60;links&#x60; object can be used to check the status of the Droplet create event.  ### Create Multiple Droplets  Creating multiple Droplets is very similar to creating a single Droplet. Instead of sending &#x60;name&#x60; as a string, send &#x60;names&#x60; as an array of strings. A Droplet will be created for each name you send using the associated information. Up to ten Droplets may be created this way at a time.  Rather than returning a single Droplet, the response body will contain a JSON array with a key called &#x60;droplets&#x60;. This will be set to an array of JSON objects, each of which will contain the standard Droplet attributes. The response code, 202 Accepted, does not indicate the success or failure of any operation, just that the request has been accepted for processing. The array of &#x60;actions&#x60; returned as part of the response&#x27;s &#x60;links&#x60; object can be used to check the status of each individual Droplet create event.
     * @param {Object} opts Optional parameters
     * @param {module:model/V2DropletsBody} opts.body
     * @param {module:api/DropletsApi~createDropletCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createDroplet(opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the destroyDroplet operation.
     * @callback moduleapi/DropletsApi~destroyDropletCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete an Existing Droplet
     * To delete a Droplet, send a DELETE request to &#x60;/v2/droplets/$DROPLET_ID&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~destroyDropletCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyDroplet(dropletId: number, callback: any): any;
    /**
     * Callback function to receive the result of the destroyDropletsByTag operation.
     * @callback moduleapi/DropletsApi~destroyDropletsByTagCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Deleting Droplets by Tag
     * To delete **all** Droplets assigned to a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag in your DELETE request. For example,  &#x60;/v2/droplets?tag_name&#x3D;$TAG_NAME&#x60;.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {String} tagName Specifies Droplets to be deleted by tag.
     * @param {module:api/DropletsApi~destroyDropletsByTagCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyDropletsByTag(tagName: string, callback: any): any;
    /**
     * Callback function to receive the result of the destroyWithAssociatedResourcesDangerous operation.
     * @callback moduleapi/DropletsApi~destroyWithAssociatedResourcesDangerousCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Destroy a Droplet and All of its Associated Resources (Dangerous)
     * To destroy a Droplet along with all of its associated resources, send a DELETE request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/dangerous&#x60; endpoint. The headers of this request must include an &#x60;X-Dangerous&#x60; key set to &#x60;true&#x60;. To preview which resources will be destroyed, first query the Droplet&#x27;s associated resources. This operation _can not_ be reverse and should be used with caution.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Boolean} xDangerous Acknowledge this action will destroy the Droplet and all associated resources and _can not_ be reversed.
     * @param {module:api/DropletsApi~destroyWithAssociatedResourcesDangerousCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyWithAssociatedResourcesDangerous(dropletId: number, xDangerous: boolean, callback: any): any;
    /**
     * Callback function to receive the result of the destroyWithAssociatedResourcesSelective operation.
     * @callback moduleapi/DropletsApi~destroyWithAssociatedResourcesSelectiveCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Selectively Destroy a Droplet and its Associated Resources
     * To destroy a Droplet along with a sub-set of its associated resources, send a DELETE request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/selective&#x60; endpoint. The JSON body of the request should include &#x60;snapshots&#x60;, &#x60;volumes&#x60;, or &#x60;volume_snapshots&#x60; keys each set to an array of IDs for the associated resources to be destroyed. The IDs can be found by querying the Droplet&#x27;s associated resources. Any associated resource not included in the request will remain and continue to accrue changes on your account.  A successful response will include a 202 response code and no content. Use the status endpoint to check on the success or failure of the destruction of the individual resources.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~destroyWithAssociatedResourcesSelectiveCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyWithAssociatedResourcesSelective(dropletId: number, callback: any): any;
    /**
     * Callback function to receive the result of the getDestroyWithAssociatedResourcesStatus operation.
     * @callback moduleapi/DropletsApi~getDestroyWithAssociatedResourcesStatusCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssociatedResourceStatus{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Check Status of a Droplet Destroy with Associated Resources Request
     * To check on the status of a request to destroy a Droplet with its associated resources, send a GET request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/status&#x60; endpoint.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~getDestroyWithAssociatedResourcesStatusCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDestroyWithAssociatedResourcesStatus(dropletId: number, callback: any): any;
    /**
     * Callback function to receive the result of the getDroplet operation.
     * @callback moduleapi/DropletsApi~getDropletCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20023{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Droplet
     * To show information about an individual Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID&#x60;.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~getDropletCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDroplet(dropletId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listAllDropletNeighborsIds operation.
     * @callback moduleapi/DropletsApi~listAllDropletNeighborsIdsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NeighborIds{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Droplet Neighbors
     * To retrieve a list of all Droplets that are co-located on the same physical hardware, send a GET request to &#x60;/v2/reports/droplet_neighbors_ids&#x60;.  The results will be returned as a JSON object with a key of &#x60;neighbor_ids&#x60;. This will be set to an array of arrays. Each array will contain a set of Droplet IDs for Droplets that share a physical server. An empty array indicates that all Droplets associated with your account are located on separate physical hardware.
     * @param {module:api/DropletsApi~listAllDropletNeighborsIdsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllDropletNeighborsIds(callback: any): any;
    /**
     * Callback function to receive the result of the listAllDroplets operation.
     * @callback moduleapi/DropletsApi~listAllDropletsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20022{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Droplets
     * To list all Droplets in your account, send a GET request to &#x60;/v2/droplets&#x60;.  The response body will be a JSON object with a key of &#x60;droplets&#x60;. This will be set to an array containing objects each representing a Droplet. These will contain the standard Droplet attributes.  ### Filtering Results by Tag  It&#x27;s possible to request filtered results by including certain query parameters. To only list Droplets assigned to a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag in your GET request. For example, &#x60;/v2/droplets?tag_name&#x3D;$TAG_NAME&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {String} opts.tagName Used to filter Droplets by a specific tag.
     * @param {module:api/DropletsApi~listAllDropletsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllDroplets(opts: {
        perPage: number;
        page: number;
        tagName: string;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletAssociatedResources operation.
     * @callback moduleapi/DropletsApi~listDropletAssociatedResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20029{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Associated Resources for a Droplet
     * To list the associated billable resources that can be destroyed along with a Droplet, send a GET request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources&#x60; endpoint.  The response will be a JSON object containing &#x60;snapshots&#x60;, &#x60;volumes&#x60;, and &#x60;volume_snapshots&#x60; keys. Each will be set to an array of objects containing information about the associated resources.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~listDropletAssociatedResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletAssociatedResources(dropletId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletBackups operation.
     * @callback moduleapi/DropletsApi~listDropletBackupsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20024{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Backups for a Droplet
     * To retrieve any backups associated with a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/backups&#x60;.  You will get back a JSON object that has a &#x60;backups&#x60; key. This will be set to an array of backup objects, each of which contain the standard Droplet backup attributes.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/DropletsApi~listDropletBackupsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletBackups(dropletId: number, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletFirewalls operation.
     * @callback moduleapi/DropletsApi~listDropletFirewallsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20027{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List all Firewalls Applied to a Droplet
     * To retrieve a list of all firewalls available to a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/firewalls&#x60;  The response will be a JSON object that has a key called &#x60;firewalls&#x60;. This will be set to an array of &#x60;firewall&#x60; objects, each of which contain the standard &#x60;firewall&#x60; attributes.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/DropletsApi~listDropletFirewallsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletFirewalls(dropletId: number, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletKernels operation.
     * @callback moduleapi/DropletsApi~listDropletKernelsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20026{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Available Kernels for a Droplet
     * To retrieve a list of all kernels available to a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/kernels&#x60;  The response will be a JSON object that has a key called &#x60;kernels&#x60;. This will be set to an array of &#x60;kernel&#x60; objects, each of which contain the standard &#x60;kernel&#x60; attributes.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/DropletsApi~listDropletKernelsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletKernels(dropletId: number, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletNeighbors operation.
     * @callback moduleapi/DropletsApi~listDropletNeighborsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20028{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Neighbors for a Droplet
     * To retrieve a list of any \&quot;neighbors\&quot; (i.e. Droplets that are co-located on the same physical hardware) for a specific Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/neighbors&#x60;.  The results will be returned as a JSON object with a key of &#x60;droplets&#x60;. This will be set to an array containing objects representing any other Droplets that share the same physical hardware. An empty array indicates that the Droplet is not co-located any other Droplets associated with your account.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~listDropletNeighborsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletNeighbors(dropletId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listDropletSnapshots operation.
     * @callback moduleapi/DropletsApi~listDropletSnapshotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20025{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Snapshots for a Droplet
     * To retrieve the snapshots that have been created from a Droplet, send a GET request to &#x60;/v2/droplets/$DROPLET_ID/snapshots&#x60;.  You will get back a JSON object that has a &#x60;snapshots&#x60; key. This will be set to an array of snapshot objects, each of which contain the standard Droplet snapshot attributes.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/DropletsApi~listDropletSnapshotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDropletSnapshots(dropletId: number, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the retryDestroyWithAssociatedResource operation.
     * @callback moduleapi/DropletsApi~retryDestroyWithAssociatedResourceCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retry a Droplet Destroy with Associated Resources Request
     * If the status of a request to destroy a Droplet with its associated resources reported any errors, it can be retried by sending a POST request to the &#x60;/v2/droplets/$DROPLET_ID/destroy_with_associated_resources/retry&#x60; endpoint.  Only one destroy can be active at a time per Droplet. If a retry is issued while another destroy is in progress for the Droplet a 409 status code will be returned. A successful response will include a 202 response code and no content.
     * @param {Number} dropletId A unique identifier for a Droplet instance.
     * @param {module:api/DropletsApi~retryDestroyWithAssociatedResourceCallback} callback The callback function, accepting three arguments: error, data, response
     */
    retryDestroyWithAssociatedResource(dropletId: number, callback: any): any;
}
/**
 * /DropletsApi~createDropletCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

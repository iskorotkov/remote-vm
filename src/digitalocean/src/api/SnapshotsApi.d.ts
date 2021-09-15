/**
* Snapshots service.
* @module api/SnapshotsApi
* @version 2.0
*/
export class SnapshotsApi {
    /**
    * Constructs a new SnapshotsApi.
    * @alias module:api/SnapshotsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the deleteSnapshot operation.
     * @callback moduleapi/SnapshotsApi~deleteSnapshotCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Snapshot
     * Both Droplet and volume snapshots are managed through the &#x60;/v2/snapshots/&#x60; endpoint. To delete a snapshot, send a DELETE request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {module:model/SnapshotId} snapshotId Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.
     * @param {module:api/SnapshotsApi~deleteSnapshotCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteSnapshot(snapshotId: any, callback: any): any;
    /**
     * Callback function to receive the result of the getSnapshot operation.
     * @callback moduleapi/SnapshotsApi~getSnapshotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20054{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Snapshot
     * To retrieve information about a snapshot, send a GET request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  The response will be a JSON object with a key called &#x60;snapshot&#x60;. The value of this will be an snapshot object containing the standard snapshot attributes.
     * @param {module:model/SnapshotId} snapshotId Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.
     * @param {module:api/SnapshotsApi~getSnapshotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getSnapshot(snapshotId: any, callback: any): any;
    /**
     * Callback function to receive the result of the listAllSnapshots operation.
     * @callback moduleapi/SnapshotsApi~listAllSnapshotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20053{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Snapshots
     * To list all of the snapshots available on your account, send a GET request to &#x60;/v2/snapshots&#x60;.  The response will be a JSON object with a key called &#x60;snapshots&#x60;. This will be set to an array of &#x60;snapshot&#x60; objects, each of which will contain the standard snapshot attributes.  ### Filtering Results by Resource Type  It&#x27;s possible to request filtered results by including certain query parameters.  #### List Droplet Snapshots  To retrieve only snapshots based on Droplets, include the &#x60;resource_type&#x60; query parameter set to &#x60;droplet&#x60;. For example, &#x60;/v2/snapshots?resource_type&#x3D;droplet&#x60;.  #### List Volume Snapshots  To retrieve only snapshots based on volumes, include the &#x60;resource_type&#x60; query parameter set to &#x60;volume&#x60;. For example, &#x60;/v2/snapshots?resource_type&#x3D;volume&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:model/String} opts.resourceType Used to filter snapshots by a resource type.
     * @param {module:api/SnapshotsApi~listAllSnapshotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllSnapshots(opts: {
        perPage: number;
        page: number;
        resourceType: any;
    }, callback: any): any;
}
/**
 * /SnapshotsApi~deleteSnapshotCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

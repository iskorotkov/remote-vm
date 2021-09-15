/**
* BlockStorage service.
* @module api/BlockStorageApi
* @version 2.0
*/
export class BlockStorageApi {
    /**
    * Constructs a new BlockStorageApi.
    * @alias module:api/BlockStorageApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createNewVolume operation.
     * @callback moduleapi/BlockStorageApi~createNewVolumeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20116{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Block Storage Volume
     * To create a new volume, send a POST request to &#x60;/v2/volumes&#x60;. Optionally, a &#x60;filesystem_type&#x60; attribute may be provided in order to automatically format the volume&#x27;s filesystem. Pre-formatted volumes are automatically mounted when attached to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018. Attaching pre-formatted volumes to Droplets without support for auto-mounting is not recommended.
     * @param {module:model/V2VolumesBody} body
     * @param {module:api/BlockStorageApi~createNewVolumeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createNewVolume(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the createVolumeSnapshot operation.
     * @callback moduleapi/BlockStorageApi~createVolumeSnapshotCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20058{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create Snapshot from a Volume
     * To create a snapshot from a volume, sent a POST request to &#x60;/v2/volumes/$VOLUME_ID/snapshots&#x60;.
     * @param {module:model/VolumeIdSnapshotsBody} body
     * @param {String} volumeId The ID of the block storage volume.
     * @param {module:api/BlockStorageApi~createVolumeSnapshotCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createVolumeSnapshot(body: any, volumeId: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteVolume operation.
     * @callback moduleapi/BlockStorageApi~deleteVolumeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Block Storage Volume
     * To delete a block storage volume, destroying all data and removing it from your account, send a DELETE request to &#x60;/v2/volumes/$VOLUME_ID&#x60;. No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {String} volumeId The ID of the block storage volume.
     * @param {module:api/BlockStorageApi~deleteVolumeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVolume(volumeId: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteVolumeByName operation.
     * @callback moduleapi/BlockStorageApi~deleteVolumeByNameCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Block Storage Volume by Name
     * Block storage volumes may also be deleted by name by sending a DELETE request with the volume&#x27;s **name** and the **region slug** for the region it is located in as query parameters to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&amp;region&#x3D;nyc1&#x60;. No response body will be sent back, but the response code will indicate success. Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
     * @param {Object} opts Optional parameters
     * @param {String} opts.name The block storage volume&#x27;s name.
     * @param {module:model/RegionSlug} opts.region The slug identifier for the region where the resource is available.
     * @param {module:api/BlockStorageApi~deleteVolumeByNameCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVolumeByName(opts: {
        name: string;
        region: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteVolumeSnapshotById operation.
     * @callback moduleapi/BlockStorageApi~deleteVolumeSnapshotByIdCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Volume Snapshot
     * To delete a volume snapshot, send a DELETE request to &#x60;/v2/snapshots/$SNAPSHOT_ID&#x60;.  A status of 204 will be given. This indicates that the request was processed successfully, but that no response body is needed.
     * @param {module:model/SnapshotId} snapshotId Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.
     * @param {module:api/BlockStorageApi~deleteVolumeSnapshotByIdCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVolumeSnapshotById(snapshotId: any, callback: any): any;
    /**
     * Callback function to receive the result of the getVolume operation.
     * @callback moduleapi/BlockStorageApi~getVolumeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20116{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Block Storage Volume
     * To show information about a block storage volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID&#x60;.
     * @param {String} volumeId The ID of the block storage volume.
     * @param {module:api/BlockStorageApi~getVolumeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getVolume(volumeId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getVolumeSnapshotById operation.
     * @callback moduleapi/BlockStorageApi~getVolumeSnapshotByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20058{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retreive an Existing Volume Snapshot
     * To retrieve the details of a snapshot that has been created from a volume, send a GET request to &#x60;/v2/volumes/snapshots/$SNAPSHOT_ID&#x60;.
     * @param {module:model/SnapshotId} snapshotId Either the ID of an existing snapshot. This will be an integer for a Droplet snapshot or a string for a volume snapshot.
     * @param {module:api/BlockStorageApi~getVolumeSnapshotByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getVolumeSnapshotById(snapshotId: any, callback: any): any;
    /**
     * Callback function to receive the result of the listAllVolumes operation.
     * @callback moduleapi/BlockStorageApi~listAllVolumesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20057{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Block Storage Volumes
     * To list all of the block storage volumes available on your account, send a GET request to &#x60;/v2/volumes&#x60;. ## Filtering Results ### By Region The &#x60;region&#x60; may be provided as query paramater in order to restrict results to volumes available in a specific region. For example: &#x60;/v2/volumes?region&#x3D;nyc1&#x60; ### By Name It is also possible to list volumes on your account that match a specified name. To do so, send a GET request with the volume&#x27;s name as a query parameter to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&#x60;. **Note:** You can only create one volume per region with the same name. ### By Name and Region It is also possible to retrieve information about a block storage volume by name. To do so, send a GET request with the volume&#x27;s name and the region slug for the region it is located in as query parameters to &#x60;/v2/volumes?name&#x3D;$VOLUME_NAME&amp;region&#x3D;nyc1&#x60;.
     * @param {Object} opts Optional parameters
     * @param {String} opts.name The block storage volume&#x27;s name.
     * @param {module:model/RegionSlug} opts.region The slug identifier for the region where the resource is available.
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageApi~listAllVolumesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllVolumes(opts: {
        name: string;
        region: any;
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listVolumeSnapshots operation.
     * @callback moduleapi/BlockStorageApi~listVolumeSnapshotsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20060{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Snapshots for a Volume
     * To retrieve the snapshots that have been created from a volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/snapshots&#x60;.
     * @param {String} volumeId The ID of the block storage volume.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageApi~listVolumeSnapshotsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listVolumeSnapshots(volumeId: string, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
}
/**
 * /BlockStorageApi~createNewVolumeCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

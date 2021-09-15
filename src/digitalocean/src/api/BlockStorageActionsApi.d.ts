/**
* BlockStorageActions service.
* @module api/BlockStorageActionsApi
* @version 2.0
*/
export class BlockStorageActionsApi {
    /**
    * Constructs a new BlockStorageActionsApi.
    * @alias module:api/BlockStorageActionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getVolumeAction operation.
     * @callback moduleapi/BlockStorageActionsApi~getVolumeActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2027{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Volume Action
     * To retrieve the status of a volume action, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/actions/$ACTION_ID&#x60;.
     * @param {String} volumeId The ID of the block storage volume.
     * @param {Number} actionId A unique numeric ID that can be used to identify and reference an action.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageActionsApi~getVolumeActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getVolumeAction(volumeId: string, actionId: number, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listAllVolumeActions operation.
     * @callback moduleapi/BlockStorageActionsApi~listAllVolumeActionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20059{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Actions for a Volume
     * To retrieve all actions that have been executed on a volume, send a GET request to &#x60;/v2/volumes/$VOLUME_ID/actions&#x60;.
     * @param {String} volumeId The ID of the block storage volume.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageActionsApi~listAllVolumeActionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllVolumeActions(volumeId: string, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the postVolumeActionById operation.
     * @callback moduleapi/BlockStorageActionsApi~postVolumeActionByIdCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2027{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Initiate A Block Storage Action By Volume Id
     * To initiate an action on a block storage volume by Id, send a POST request to &#x60;~/v2/volumes/$VOLUME_ID/actions&#x60;. The body should contain the appropriate attributes for the respective action.  ## Attach a Block Storage Volume to a Droplet  | Attribute  | Details                                                             | | ---------- | ------------------------------------------------------------------- | | type       | This must be &#x60;attach&#x60;                                               | | droplet_id | Set to the Droplet&#x27;s ID                                             | | region     | Set to the slug representing the region where the volume is located |  Each volume may only be attached to a single Droplet. However, up to five volumes may be attached to a Droplet at a time. Pre-formatted volumes will be automatically mounted to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018 when attached. On older Droplets, [additional configuration](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-digitalocean-block-storage-volumes-in-linux#mounting-the-filesystems) is required.  ## Remove a Block Storage Volume from a Droplet  | Attribute  | Details                                                             | | ---------- | ------------------------------------------------------------------- | | type       | This must be &#x60;detach&#x60;                                               | | droplet_id | Set to the Droplet&#x27;s ID                                             | | region     | Set to the slug representing the region where the volume is located |  ## Resize a Volume  | Attribute      | Details                                                             | | -------------- | ------------------------------------------------------------------- | | type           | This must be &#x60;resize&#x60;                                               | | size_gigabytes | The new size of the block storage volume in GiB (1024^3)            | | region         | Set to the slug representing the region where the volume is located |  Volumes may only be resized upwards. The maximum size for a volume is 16TiB.
     * @param {module:model/VolumeIdActionsBody} body
     * @param {String} volumeId The ID of the block storage volume.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageActionsApi~postVolumeActionByIdCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postVolumeActionById(body: any, volumeId: string, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the postVolumeActionByName operation.
     * @callback moduleapi/BlockStorageActionsApi~postVolumeActionByNameCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2027{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Initiate A Block Storage Action By Volume Name
     * To initiate an action on a block storage volume by Id, send a POST request to &#x60;~/v2/volumes/actions&#x60;. The body should contain the appropriate attributes for the respective action.  ## Attach a Block Storage Volume to a Droplet  | Attribute   | Details                                                             | | ----------- | ------------------------------------------------------------------- | | type        | This must be &#x60;attach&#x60;                                               | | volume_name | The name of the block storage volume                                | | droplet_id  | Set to the Droplet&#x27;s ID                                             | | region      | Set to the slug representing the region where the volume is located |  Each volume may only be attached to a single Droplet. However, up to five volumes may be attached to a Droplet at a time. Pre-formatted volumes will be automatically mounted to Ubuntu, Debian, Fedora, Fedora Atomic, and CentOS Droplets created on or after April 26, 2018 when attached. On older Droplets, [additional configuration](https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-digitalocean-block-storage-volumes-in-linux#mounting-the-filesystems) is required.  ## Remove a Block Storage Volume from a Droplet  | Attribute   | Details                                                             | | ----------- | ------------------------------------------------------------------- | | type        | This must be &#x60;detach&#x60;                                               | | volume_name | The name of the block storage volume                                | | droplet_id  | Set to the Droplet&#x27;s ID                                             | | region      | Set to the slug representing the region where the volume is located |
     * @param {module:model/VolumesActionsBody} body
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/BlockStorageActionsApi~postVolumeActionByNameCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postVolumeActionByName(body: any, opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
}
/**
 * /BlockStorageActionsApi~getVolumeActionCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

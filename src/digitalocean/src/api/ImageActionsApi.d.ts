/**
* ImageActions service.
* @module api/ImageActionsApi
* @version 2.0
*/
export class ImageActionsApi {
    /**
    * Constructs a new ImageActionsApi.
    * @alias module:api/ImageActionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the getImageAction operation.
     * @callback moduleapi/ImageActionsApi~getImageActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Action{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Action
     * To retrieve the status of an image action, send a GET request to &#x60;/v2/images/$IMAGE_ID/actions/$IMAGE_ACTION_ID&#x60;.
     * @param {Number} imageId A unique number that can be used to identify and reference a specific image.
     * @param {Number} actionId A unique numeric ID that can be used to identify and reference an action.
     * @param {module:api/ImageActionsApi~getImageActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getImageAction(imageId: number, actionId: number, callback: any): any;
    /**
     * Callback function to receive the result of the listImageActions operation.
     * @callback moduleapi/ImageActionsApi~listImageActionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2004{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Actions for an Image
     * To retrieve all actions that have been executed on an image, send a GET request to &#x60;/v2/images/$IMAGE_ID/actions&#x60;.
     * @param {Number} imageId A unique number that can be used to identify and reference a specific image.
     * @param {module:api/ImageActionsApi~listImageActionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listImageActions(imageId: number, callback: any): any;
    /**
     * Callback function to receive the result of the postImageAction operation.
     * @callback moduleapi/ImageActionsApi~postImageActionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Action{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Initiate an Image Action
     * The following actions are available on an Image.  ## Convert an Image to a Snapshot  To convert an image, for example, a backup to a snapshot, send a POST request to &#x60;/v2/images/$IMAGE_ID/actions&#x60;. Set the &#x60;type&#x60; attribute to &#x60;convert&#x60;.  ## Transfer an Image  To transfer an image to another region, send a POST request to &#x60;/v2/images/$IMAGE_ID/actions&#x60;. Set the &#x60;type&#x60; attribute to &#x60;transfer&#x60; and set &#x60;region&#x60; attribute to the slug identifier of the region you wish to transfer to.
     * @param {Number} imageId A unique number that can be used to identify and reference a specific image.
     * @param {Object} opts Optional parameters
     * @param {module:model/ImageIdActionsBody} opts.body
     * @param {module:api/ImageActionsApi~postImageActionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postImageAction(imageId: number, opts: {
        body: any;
    }, callback: any): any;
}
/**
 * /ImageActionsApi~getImageActionCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

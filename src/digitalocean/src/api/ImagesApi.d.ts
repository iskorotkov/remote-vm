/**
* Images service.
* @module api/ImagesApi
* @version 2.0
*/
export class ImagesApi {
    /**
    * Constructs a new ImagesApi.
    * @alias module:api/ImagesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createCustomImage operation.
     * @callback moduleapi/ImagesApi~createCustomImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2023{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a Custom Image
     * To create a new custom image, send a POST request to /v2/images. The body must contain a url attribute pointing to a Linux virtual machine image to be imported into DigitalOcean. The image must be in the raw, qcow2, vhdx, vdi, or vmdk format. It may be compressed using gzip or bzip2 and must be smaller than 100 GB after  being decompressed.
     * @param {module:model/ImageNewCustom} body
     * @param {module:api/ImagesApi~createCustomImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createCustomImage(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteImage operation.
     * @callback moduleapi/ImagesApi~deleteImageCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete an Image
     * To delete a snapshot or custom image, send a &#x60;DELETE&#x60; request to &#x60;/v2/images/$IMAGE_ID&#x60;.
     * @param {Number} imageId A unique number that can be used to identify and reference a specific image.
     * @param {module:api/ImagesApi~deleteImageCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteImage(imageId: number, callback: any): any;
    /**
     * Callback function to receive the result of the getImage operation.
     * @callback moduleapi/ImagesApi~getImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20034{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Image
     * To retrieve information about an image, send a &#x60;GET&#x60; request to &#x60;/v2/images/$IDENTIFIER&#x60;.
     * @param {module:model/ImageId} imageId A unique number (id) or string (slug) used to identify and reference a specific image.  **Public** images can be identified by image &#x60;id&#x60; or &#x60;slug&#x60;.  **Private** images *must* be identified by image &#x60;id&#x60;.
     * @param {module:api/ImagesApi~getImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getImage(imageId: any, callback: any): any;
    /**
     * Callback function to receive the result of the getImagesList operation.
     * @callback moduleapi/ImagesApi~getImagesListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20033{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Images
     * To list all of the images available on your account, send a GET request to /v2/images.  ## Filtering Results -----  It&#x27;s possible to request filtered results by including certain query parameters.  **Image Type**  Either 1-Click Application or OS Distribution images can be filtered by using the &#x60;type&#x60; query parameter.  &gt; Important: The &#x60;type&#x60; query parameter does not directly relate to the &#x60;type&#x60; attribute.  To retrieve only ***distribution*** images, include the &#x60;type&#x60; query parameter set to distribution, &#x60;/v2/images?type&#x3D;distribution&#x60;.  To retrieve only ***application*** images, include the &#x60;type&#x60; query parameter set to application, &#x60;/v2/images?type&#x3D;application&#x60;.  **User Images**  To retrieve only the private images of a user, include the &#x60;private&#x60; query parameter set to true, &#x60;/v2/images?private&#x3D;true&#x60;.  **Tags**  To list all images assigned to a specific tag, include the &#x60;tag_name&#x60; query parameter set to the name of the tag in your GET request. For example, &#x60;/v2/images?tag_name&#x3D;$TAG_NAME&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.type Filters results based on image type which can be either &#x60;application&#x60; or &#x60;distribution&#x60;.
     * @param {Boolean} opts._private Used to filter only user images.
     * @param {String} opts.tagName Used to filter images by a specific tag.
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/ImagesApi~getImagesListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getImagesList(opts: {
        type: any;
        _private: boolean;
        tagName: string;
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the updateImage operation.
     * @callback moduleapi/ImagesApi~updateImageCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20034{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update an Image
     * To update an image, send a &#x60;PUT&#x60; request to &#x60;/v2/images/$IMAGE_ID&#x60;. Set the &#x60;name&#x60; attribute to the new value you would like to use. For custom images, the &#x60;description&#x60; and &#x60;distribution&#x60; attributes may also be updated.
     * @param {module:model/ImageUpdate} body
     * @param {Number} imageId A unique number that can be used to identify and reference a specific image.
     * @param {module:api/ImagesApi~updateImageCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateImage(body: any, imageId: number, callback: any): any;
}
/**
 * /ImagesApi~createCustomImageCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

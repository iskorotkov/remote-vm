/**
* Tags service.
* @module api/TagsApi
* @version 2.0
*/
export class TagsApi {
    /**
    * Constructs a new TagsApi.
    * @alias module:api/TagsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createNewTag operation.
     * @callback moduleapi/TagsApi~createNewTagCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20115{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Tag
     * To create a tag you can send a POST request to &#x60;/v2/tags&#x60; with a &#x60;name&#x60; attribute.
     * @param {module:model/Tag} body
     * @param {module:api/TagsApi~createNewTagCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createNewTag(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteTag operation.
     * @callback moduleapi/TagsApi~deleteTagCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Tag
     * A tag can be deleted by sending a &#x60;DELETE&#x60; request to &#x60;/v2/tags/$TAG_NAME&#x60;. Deleting a tag also untags all the resources that have previously been tagged by the Tag.
     * @param {String} tagId The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.
     * @param {module:api/TagsApi~deleteTagCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteTag(tagId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getTag operation.
     * @callback moduleapi/TagsApi~getTagCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20056{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve a Tag
     * To retrieve an individual tag, you can send a &#x60;GET&#x60; request to &#x60;/v2/tags/$TAG_NAME&#x60;.
     * @param {String} tagId The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.
     * @param {module:api/TagsApi~getTagCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getTag(tagId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listAllTags operation.
     * @callback moduleapi/TagsApi~listAllTagsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20055{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Tags
     * To list all of your tags, you can send a GET request to &#x60;/v2/tags&#x60;.
     * @param {module:api/TagsApi~listAllTagsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllTags(callback: any): any;
    /**
     * Callback function to receive the result of the tagResource operation.
     * @callback moduleapi/TagsApi~tagResourceCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Tag a Resource
     * Resources can be tagged by sending a POST request to &#x60;/v2/tags/$TAG_NAME/resources&#x60; with an array of json objects containing &#x60;resource_id&#x60; and &#x60;resource_type&#x60; attributes. Currently only tagging of Droplets, Images, Volumes, and Volume Snapshots is supported. &#x60;resource_id&#x60; is expected to be the Droplet&#x27;s id, Image&#x27;s id, or Volume/Volume Snapshot&#x27;s UUID attribute as a string, and &#x60;resource_type&#x60; is expected to be the string &#x60;droplet&#x60;, &#x60;image&#x60;, &#x60;volume&#x60; or &#x60;volume_snapshot&#x60;.
     * @param {module:model/TagResource} body
     * @param {String} tagId The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.
     * @param {module:api/TagsApi~tagResourceCallback} callback The callback function, accepting three arguments: error, data, response
     */
    tagResource(body: any, tagId: string, callback: any): any;
    /**
     * Callback function to receive the result of the untagResource operation.
     * @callback moduleapi/TagsApi~untagResourceCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Untag a Resource
     * Resources can be tagged by sending a DELETE request to &#x60;/v2/tags/$TAG_NAME/resources&#x60; with an array of json objects containing &#x60;resource_id&#x60; and &#x60;resource_type&#x60; attributes. Currently only untagging of Droplets, Images, Volumes, and Volume Snapshots is supported. &#x60;resource_id&#x60; is expected to be the Droplet&#x27;s id, Image&#x27;s id, or Volume/Volume Snapshot&#x27;s UUID attribute as a string, and &#x60;resource_type&#x60; is expected to be the string &#x60;droplet&#x60;, &#x60;image&#x60;, &#x60;volume&#x60; or &#x60;volume_snapshot&#x60;.
     * @param {module:model/TagResource} body
     * @param {String} tagId The name of the tag. Tags may contain letters, numbers, colons, dashes, and underscores. There is a limit of 255 characters per tag.
     * @param {module:api/TagsApi~untagResourceCallback} callback The callback function, accepting three arguments: error, data, response
     */
    untagResource(body: any, tagId: string, callback: any): any;
}
/**
 * /TagsApi~createNewTagCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

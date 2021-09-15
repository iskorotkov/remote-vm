/**
* ProjectResources service.
* @module api/ProjectResourcesApi
* @version 2.0
*/
export class ProjectResourcesApi {
    /**
    * Constructs a new ProjectResourcesApi.
    * @alias module:api/ProjectResourcesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the assignDefaultProjectResources operation.
     * @callback moduleapi/ProjectResourcesApi~assignDefaultProjectResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20044{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Assign Resources to Default Project
     * To assign resources to your default project, send a POST request to &#x60;/v2/projects/default/resources&#x60;.
     * @param {module:model/ProjectAssignment} body
     * @param {module:api/ProjectResourcesApi~assignDefaultProjectResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    assignDefaultProjectResources(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the assignProjectResources operation.
     * @callback moduleapi/ProjectResourcesApi~assignProjectResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20044{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Assign Resources to a Project
     * To assign resources to a project, send a POST request to &#x60;/v2/projects/$PROJECT_ID/resources&#x60;.
     * @param {module:model/ProjectAssignment} body
     * @param {String} projectId A unique identifier for a project.
     * @param {module:api/ProjectResourcesApi~assignProjectResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    assignProjectResources(body: any, projectId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listDefaultProjectResources operation.
     * @callback moduleapi/ProjectResourcesApi~listDefaultProjectResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20043{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Default Project Resources
     * To list all your resources in your default project, send a GET request to &#x60;/v2/projects/default/resources&#x60;.
     * @param {module:api/ProjectResourcesApi~listDefaultProjectResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDefaultProjectResources(callback: any): any;
    /**
     * Callback function to receive the result of the listProjectResources operation.
     * @callback moduleapi/ProjectResourcesApi~listProjectResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20043{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Project Resources
     * To list all your resources in a project, send a GET request to &#x60;/v2/projects/$PROJECT_ID/resources&#x60;.
     * @param {String} projectId A unique identifier for a project.
     * @param {module:api/ProjectResourcesApi~listProjectResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listProjectResources(projectId: string, callback: any): any;
}
/**
 * /ProjectResourcesApi~assignDefaultProjectResourcesCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

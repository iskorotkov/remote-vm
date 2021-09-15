/**
* Projects service.
* @module api/ProjectsApi
* @version 2.0
*/
export class ProjectsApi {
    /**
    * Constructs a new ProjectsApi.
    * @alias module:api/ProjectsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createProject operation.
     * @callback moduleapi/ProjectsApi~createProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20114{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a Project
     * To create a project, send a POST request to &#x60;/v2/projects&#x60;.
     * @param {module:model/V2ProjectsBody} body
     * @param {module:api/ProjectsApi~createProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createProject(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteProject operation.
     * @callback moduleapi/ProjectsApi~deleteProjectCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete an Existing Project
     * To delete a project, send a DELETE request to &#x60;/v2/projects/$PROJECT_ID&#x60;. To be deleted, a project must not have any resources assigned to it. Any existing resources must first be reassigned or destroyed, or you will receive a 412 error.  A successful request will receive a 204 status code with no body in response. This indicates that the request was processed successfully.
     * @param {String} projectId A unique identifier for a project.
     * @param {module:api/ProjectsApi~deleteProjectCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteProject(projectId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDefaultProject operation.
     * @callback moduleapi/ProjectsApi~getDefaultProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20042{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve the Default Project
     * To get your default project, send a GET request to &#x60;/v2/projects/default&#x60;.
     * @param {module:api/ProjectsApi~getDefaultProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDefaultProject(callback: any): any;
    /**
     * Callback function to receive the result of the getProject operation.
     * @callback moduleapi/ProjectsApi~getProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20114{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Project
     * To get a project, send a GET request to &#x60;/v2/projects/$PROJECT_ID&#x60;.
     * @param {String} projectId A unique identifier for a project.
     * @param {module:api/ProjectsApi~getProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getProject(projectId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listProjects operation.
     * @callback moduleapi/ProjectsApi~listProjectsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20041{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Projects
     * To list all your projects, send a GET request to &#x60;/v2/projects&#x60;.
     * @param {module:api/ProjectsApi~listProjectsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listProjects(callback: any): any;
    /**
     * Callback function to receive the result of the patchDefaultProject operation.
     * @callback moduleapi/ProjectsApi~patchDefaultProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20114{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Patch the Default Project
     * To update only specific attributes of a project, send a PATCH request to &#x60;/v2/projects/default&#x60;. At least one of the following attributes needs to be sent.
     * @param {module:model/Project} body
     * @param {module:api/ProjectsApi~patchDefaultProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    patchDefaultProject(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the patchProject operation.
     * @callback moduleapi/ProjectsApi~patchProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20114{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Patch a Project
     * To update only specific attributes of a project, send a PATCH request to &#x60;/v2/projects/$PROJECT_ID&#x60;. At least one of the following attributes needs to be sent.
     * @param {module:model/Project} body
     * @param {String} projectId A unique identifier for a project.
     * @param {module:api/ProjectsApi~patchProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    patchProject(body: any, projectId: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateDefaultProject operation.
     * @callback moduleapi/ProjectsApi~updateDefaultProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20114{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update the Default Project
     * To update a project, send a PUT request to &#x60;/v2/projects/default&#x60;. All of the following attributes must be sent.
     * @param {module:model/ProjectsDefaultBody} body
     * @param {module:api/ProjectsApi~updateDefaultProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateDefaultProject(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the updateProject operation.
     * @callback moduleapi/ProjectsApi~updateProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20114{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Project
     * To update a project, send a PUT request to &#x60;/v2/projects/$PROJECT_ID&#x60;. All of the following attributes must be sent.
     * @param {module:model/ProjectsProjectIdBody} body
     * @param {String} projectId A unique identifier for a project.
     * @param {module:api/ProjectsApi~updateProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateProject(body: any, projectId: string, callback: any): any;
}
/**
 * /ProjectsApi~createProjectCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

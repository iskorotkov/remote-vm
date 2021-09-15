/**
* VPCs service.
* @module api/VPCsApi
* @version 2.0
*/
export class VPCsApi {
    /**
    * Constructs a new VPCsApi.
    * @alias module:api/VPCsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createVpc operation.
     * @callback moduleapi/VPCsApi~createVpcCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20117{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New VPC
     * To create a VPC, send a POST request to &#x60;/v2/vpcs&#x60; specifying the attributes in the table below in the JSON body.  **Note:** If you do not currently have a VPC network in a specific datacenter region, the first one that you create will be set as the default for that region. The default VPC for a region cannot be changed or deleted.
     * @param {module:model/V2VpcsBody} body
     * @param {module:api/VPCsApi~createVpcCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createVpc(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteVpc operation.
     * @callback moduleapi/VPCsApi~deleteVpcCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a VPC
     * To delete a VPC, send a DELETE request to &#x60;/v2/vpcs/$VPC_ID&#x60;. A 204 status code with no body will be returned in response to a successful request.  The default VPC for a region can not be deleted. Additionally, a VPC can only be deleted if it does not contain any member resources. Attempting to delete a region&#x27;s default VPC or a VPC that still has members will result in a 403 Forbidden error response.
     * @param {String} vpcId A unique identifier for a VPC.
     * @param {module:api/VPCsApi~deleteVpcCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteVpc(vpcId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getVpc operation.
     * @callback moduleapi/VPCsApi~getVpcCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20117{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing VPC
     * To show information about an existing VPC, send a GET request to &#x60;/v2/vpcs/$VPC_ID&#x60;.
     * @param {String} vpcId A unique identifier for a VPC.
     * @param {module:api/VPCsApi~getVpcCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getVpc(vpcId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listVpcMembers operation.
     * @callback moduleapi/VPCsApi~listVpcMembersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20062{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List the Member Resources of a VPC
     * To list all of the resources that are members of a VPC, send a GET request to &#x60;/v2/vpcs/$VPC_ID/members&#x60;.  To only list resources of a specific type that are members of the VPC, included a &#x60;resource_type&#x60; query parameter. For example, to only list Droplets in the VPC, send a GET request to &#x60;/v2/vpcs/$VPC_ID/members?resource_type&#x3D;droplet&#x60;.
     * @param {String} vpcId A unique identifier for a VPC.
     * @param {Object} opts Optional parameters
     * @param {String} opts.resourceType Used to filter VPC members by a resource type.
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/VPCsApi~listVpcMembersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listVpcMembers(vpcId: string, opts: {
        resourceType: string;
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listVpcs operation.
     * @callback moduleapi/VPCsApi~listVpcsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20061{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All VPCs
     * To list all of the VPCs on your account, send a GET request to &#x60;/v2/vpcs&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/VPCsApi~listVpcsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listVpcs(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the patchVpc operation.
     * @callback moduleapi/VPCsApi~patchVpcCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20117{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Partially Update a VPC
     * To update a subset of information about a VPC, send a PATCH request to &#x60;/v2/vpcs/$VPC_ID&#x60;.
     * @param {module:model/VpcsVpcIdBody1} body
     * @param {String} vpcId A unique identifier for a VPC.
     * @param {module:api/VPCsApi~patchVpcCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    patchVpc(body: any, vpcId: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateVpc operation.
     * @callback moduleapi/VPCsApi~updateVpcCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20117{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a VPC
     * To update information about a VPC, send a PUT request to &#x60;/v2/vpcs/$VPC_ID&#x60;.
     * @param {module:model/VpcsVpcIdBody} body
     * @param {String} vpcId A unique identifier for a VPC.
     * @param {module:api/VPCsApi~updateVpcCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateVpc(body: any, vpcId: string, callback: any): any;
}
/**
 * /VPCsApi~createVpcCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

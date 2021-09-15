/**
* Apps service.
* @module api/AppsApi
* @version 2.0
*/
export class AppsApi {
    /**
    * Constructs a new AppsApi.
    * @alias module:api/AppsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createApp operation.
     * @callback moduleapi/AppsApi~createAppCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New App
     * Create a new app by submitting an app specification. For documentation on app specifications (&#x60;AppSpec&#x60; objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
     * @param {module:model/AppsCreateAppRequest} body
     * @param {module:api/AppsApi~createAppCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createApp(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the createDeployment operation.
     * @callback moduleapi/AppsApi~createDeploymentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsDeploymentResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create an App Deployment
     * Creating an app deployment will pull the latest changes from your repository and schedule a new deployment for your app.
     * @param {module:model/AppsCreateDeploymentRequest} body
     * @param {String} appId The app ID
     * @param {module:api/AppsApi~createDeploymentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createDeployment(body: any, appId: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteApp operation.
     * @callback moduleapi/AppsApi~deleteAppCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsDeleteAppResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete an App
     * Delete an existing app. Once deleted, all active deployments will be permanently shut down and the app deleted. If needed, be sure to back up your app specification so that you may re-create it at a later time.
     * @param {String} id The ID of the app
     * @param {module:api/AppsApi~deleteAppCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    deleteApp(id: string, callback: any): any;
    /**
     * Callback function to receive the result of the getApp operation.
     * @callback moduleapi/AppsApi~getAppCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing App
     * Retrieve details about an existing app by either its ID or name. To retrieve an app by its name, do not include an ID in the request path. Information about the current active deployment as well as any in progress ones will also be included in the response.
     * @param {String} id The ID of the app
     * @param {Object} opts Optional parameters
     * @param {String} opts.name The name of the app to retrieve.
     * @param {module:api/AppsApi~getAppCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getApp(id: string, opts: {
        name: string;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getDeployment operation.
     * @callback moduleapi/AppsApi~getDeploymentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsDeploymentResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an App Deployment
     * Retrieve information about an app deployment.
     * @param {String} appId The app ID
     * @param {String} deploymentId The deployment ID
     * @param {module:api/AppsApi~getDeploymentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDeployment(appId: string, deploymentId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getInstanceSize operation.
     * @callback moduleapi/AppsApi~getInstanceSizeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsGetInstanceSizeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Instance Size
     * Retrieve information about a specific instance size for &#x60;service&#x60;, &#x60;worker&#x60;, and &#x60;job&#x60; components.
     * @param {String} slug The slug of the instance size
     * @param {module:api/AppsApi~getInstanceSizeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getInstanceSize(slug: string, callback: any): any;
    /**
     * Callback function to receive the result of the getLogs operation.
     * @callback moduleapi/AppsApi~getLogsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsGetLogsResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve Deployment Logs
     * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
     * @param {String} appId The app ID
     * @param {String} deploymentId The deployment ID
     * @param {String} componentName An optional component name. If set, logs will be limited to this component only.
     * @param {module:model/String} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.follow Whether the logs should follow live updates.
     * @param {String} opts.podConnectionTimeout An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
     * @param {module:api/AppsApi~getLogsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getLogs(appId: string, deploymentId: string, componentName: string, type: any, opts: {
        follow: boolean;
        podConnectionTimeout: string;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getLogsAggregate operation.
     * @callback moduleapi/AppsApi~getLogsAggregateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsGetLogsResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve Aggregate Deployment Logs
     * Retrieve the logs of a past, in-progress, or active deployment. If a component name is specified, the logs will be limited to only that component. The response will include links to either real-time logs of an in-progress or active deployment or archived logs of a past deployment.
     * @param {String} appId The app ID
     * @param {String} deploymentId The deployment ID
     * @param {module:model/String} type The type of logs to retrieve - BUILD: Build-time logs - DEPLOY: Deploy-time logs - RUN: Live run-time logs
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.follow Whether the logs should follow live updates.
     * @param {String} opts.podConnectionTimeout An optional time duration to wait if the underlying component instance is not immediately available. Default: &#x60;3m&#x60;.
     * @param {module:api/AppsApi~getLogsAggregateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getLogsAggregate(appId: string, deploymentId: string, type: any, opts: {
        follow: boolean;
        podConnectionTimeout: string;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getTier operation.
     * @callback moduleapi/AppsApi~getTierCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsGetTierResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an App Tier
     * Retrieve information about a specific app tier.
     * @param {String} slug The slug of the tier
     * @param {module:api/AppsApi~getTierCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getTier(slug: string, callback: any): any;
    /**
     * Callback function to receive the result of the listApps operation.
     * @callback moduleapi/AppsApi~listAppsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Apps
     * List all apps on your account. Information about the current active deployment as well as any in progress ones will also be included for each app.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {module:api/AppsApi~listAppsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listApps(opts: {
        page: number;
        perPage: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listDeployments operation.
     * @callback moduleapi/AppsApi~listDeploymentsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsDeploymentsResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List App Deployments
     * List all deployments of an app.
     * @param {String} appId The app ID
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {module:api/AppsApi~listDeploymentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listDeployments(appId: string, opts: {
        page: number;
        perPage: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listInstanceSizes operation.
     * @callback moduleapi/AppsApi~listInstanceSizesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsListInstanceSizesResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Instance Sizes
     * List all instance sizes for &#x60;service&#x60;, &#x60;worker&#x60;, and &#x60;job&#x60; components.
     * @param {module:api/AppsApi~listInstanceSizesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listInstanceSizes(callback: any): any;
    /**
     * Callback function to receive the result of the listRegions operation.
     * @callback moduleapi/AppsApi~listRegionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsListRegionsResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List App Regions
     * List all regions supported by App Platform.
     * @param {module:api/AppsApi~listRegionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listRegions(callback: any): any;
    /**
     * Callback function to receive the result of the listTiers operation.
     * @callback moduleapi/AppsApi~listTiersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsListTiersResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List App Tiers
     * List all app tiers.
     * @param {module:api/AppsApi~listTiersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listTiers(callback: any): any;
    /**
     * Callback function to receive the result of the postCancelDeployment operation.
     * @callback moduleapi/AppsApi~postCancelDeploymentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppsDeploymentResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Cancel a Deployment
     * Immediately cancel an in-progress deployment.
     * @param {String} appId The app ID
     * @param {String} deploymentId The deployment ID
     * @param {module:api/AppsApi~postCancelDeploymentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    postCancelDeployment(appId: string, deploymentId: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateApp operation.
     * @callback moduleapi/AppsApi~updateAppCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update an App
     * Update an existing app by submitting a new app specification. For documentation on app specifications (&#x60;AppSpec&#x60; objects), please refer to [the product documentation](https://www.digitalocean.com/docs/app-platform/references/app-specification-reference/).
     * @param {module:model/AppsUpdateAppRequest} body
     * @param {String} id The ID of the app
     * @param {module:api/AppsApi~updateAppCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateApp(body: any, id: string, callback: any): any;
    /**
     * Callback function to receive the result of the validateAppSpec operation.
     * @callback moduleapi/AppsApi~validateAppSpecCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppProposeResponse{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Propose an App Spec
     * To propose and validate a spec for a new or existing app, send a PUT request to the &#x60;/v2/apps/propose&#x60; endpoint. The request returns some information about the proposed app, including app cost and upgrade cost. If an existing app ID is specified, the app spec is treated as a proposed update to the existing app.
     * @param {module:model/AppPropose} body
     * @param {module:api/AppsApi~validateAppSpecCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    validateAppSpec(body: any, callback: any): any;
}
/**
 * /AppsApi~createAppCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

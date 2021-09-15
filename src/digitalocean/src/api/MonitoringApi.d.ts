/**
* Monitoring service.
* @module api/MonitoringApi
* @version 2.0
*/
export class MonitoringApi {
    /**
    * Constructs a new MonitoringApi.
    * @alias module:api/MonitoringApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the createAlertPolicy operation.
     * @callback moduleapi/MonitoringApi~createAlertPolicyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AlertPolicy{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create Alert Policy
     * To create a new alert, send a POST request to &#x60;/v2/monitoring/alerts&#x60;.
     * @param {module:model/AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
     * @param {module:api/MonitoringApi~createAlertPolicyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createAlertPolicy(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteAlertPolicy operation.
     * @callback moduleapi/MonitoringApi~deleteAlertPolicyCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete an Alert Policy
     * To delete an alert policy, send a DELETE request to &#x60;/v2/monitoring/alerts/{alert_uuid}&#x60;
     * @param {String} alertUuid A unique identifier for an alert policy.
     * @param {module:api/MonitoringApi~deleteAlertPolicyCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteAlertPolicy(alertUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getAlertPolicy operation.
     * @callback moduleapi/MonitoringApi~getAlertPolicyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AlertPolicy{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Alert Policy
     * To retrieve a given alert policy, send a GET request to &#x60;/v2/monitoring/alerts/{alert_uuid}&#x60;
     * @param {String} alertUuid A unique identifier for an alert policy.
     * @param {module:api/MonitoringApi~getAlertPolicyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getAlertPolicy(alertUuid: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletBandwidthMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletBandwidthMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Bandwidth Metrics
     * To retrieve bandwidth metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/bandwidth&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {module:model/String} _interface The network interface.
     * @param {module:model/String} direction The traffic direction.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletBandwidthMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletBandwidthMetrics(hostId: string, _interface: any, direction: any, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletCpuMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletCpuMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet CPU Metrics
     * To retrieve CPU metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/cpu&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletCpuMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletCpuMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletFilesystemFreeMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletFilesystemFreeMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Filesystem Free Metrics
     * To retrieve filesystem free metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/filesystem_free&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletFilesystemFreeMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletFilesystemFreeMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletFilesystemSizeMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletFilesystemSizeMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Filesystem Size Metrics
     * To retrieve filesystem size metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/filesystem_size&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletFilesystemSizeMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletFilesystemSizeMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletLoad15Metrics operation.
     * @callback moduleapi/MonitoringApi~getDropletLoad15MetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Load15 Metrics
     * To retrieve 15 minute load average metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/load_15&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletLoad15MetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletLoad15Metrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletLoad1Metrics operation.
     * @callback moduleapi/MonitoringApi~getDropletLoad1MetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Load1 Metrics
     * To retrieve 1 minute load average metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/load_1&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletLoad1MetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletLoad1Metrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletLoad5Metrics operation.
     * @callback moduleapi/MonitoringApi~getDropletLoad5MetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Load5 Metrics
     * To retrieve 5 minute load average metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/load_5&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletLoad5MetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletLoad5Metrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletMemoryAvailableMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletMemoryAvailableMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Available Memory Metrics
     * To retrieve available memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_available&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletMemoryAvailableMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletMemoryAvailableMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletMemoryCachedMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletMemoryCachedMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Cached Memory Metrics
     * To retrieve cached memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_cached&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletMemoryCachedMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletMemoryCachedMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletMemoryFreeMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletMemoryFreeMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Free Memory Metrics
     * To retrieve free memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_free&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletMemoryFreeMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletMemoryFreeMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the getDropletMemoryTotalMetrics operation.
     * @callback moduleapi/MonitoringApi~getDropletMemoryTotalMetricsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Metrics{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Get Droplet Total Memory Metrics
     * To retrieve total memory metrics for a given droplet, send a GET request to &#x60;/v2/monitoring/metrics/droplet/memory_total&#x60;.
     * @param {String} hostId The droplet ID.
     * @param {String} start Timestamp to start metric window.
     * @param {String} end Timestamp to end metric window.
     * @param {module:api/MonitoringApi~getDropletMemoryTotalMetricsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getDropletMemoryTotalMetrics(hostId: string, start: string, end: string, callback: any): any;
    /**
     * Callback function to receive the result of the listAlertPolicies operation.
     * @callback moduleapi/MonitoringApi~listAlertPoliciesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20040{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Alert Policies
     * Returns all alert policies that are configured for the given account. To List all alert policies, send a GET request to &#x60;/v2/monitoring/alerts&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/MonitoringApi~listAlertPoliciesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAlertPolicies(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the updateAlertPolicy operation.
     * @callback moduleapi/MonitoringApi~updateAlertPolicyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AlertPolicy{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update an Alert Policy
     * To update en existing policy, send a PUT request to &#x60;v2/monitoring/alerts/{alert_uuid}&#x60;.
     * @param {module:model/AlertPolicyRequest} body The &#x27;type&#x27; field dictates what type of entity that the alert policy applies to and hence what type of entity is passed in the &#x27;entities&#x27; array. If both the &#x27;tags&#x27; array and &#x27;entities&#x27; array are empty the alert policy applies to all entities of the relevant type that are owned by the user account. Otherwise the following table shows the valid entity types for each type of alert policy: &lt;table&gt;&lt;thead&gt;&lt;tr&gt;&lt;td&gt;Type&lt;/td&gt;&lt;td&gt;Description&lt;/td&gt;&lt;td&gt;Valid Entity Type&lt;/td&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/memory_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of memory utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_read&lt;/td&gt;&lt;td&gt;alert on the rate of disk read I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_5&lt;/td&gt;&lt;td&gt;alert on the 5 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_15&lt;/td&gt;&lt;td&gt;alert on the 15 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_utilization_percent&lt;/td&gt;&lt;td&gt;alert on the percent of disk utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/cpu&lt;/td&gt;&lt;td&gt;alert on the percent of CPU utilization&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/disk_write&lt;/td&gt;&lt;td&gt;alert on the rate of disk write I/O in MBps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/public_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of public inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_outbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private outbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/private_inbound_bandwidth&lt;/td&gt;&lt;td&gt;alert on the rate of private inbound bandwidth in Mbps&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;v1/insights/droplet/load_1&lt;/td&gt;&lt;td&gt;alert on the 1 minute load average&lt;/td&gt;&lt;td&gt;droplet ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
     * @param {String} alertUuid A unique identifier for an alert policy.
     * @param {module:api/MonitoringApi~updateAlertPolicyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateAlertPolicy(body: any, alertUuid: string, callback: any): any;
}
/**
 * /MonitoringApi~createAlertPolicyCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

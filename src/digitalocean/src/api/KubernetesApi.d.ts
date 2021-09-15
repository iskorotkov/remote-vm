/**
* Kubernetes service.
* @module api/KubernetesApi
* @version 2.0
*/
export class KubernetesApi {
    /**
    * Constructs a new KubernetesApi.
    * @alias module:api/KubernetesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient?: any);
    apiClient: any;
    /**
     * Callback function to receive the result of the addKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~addKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20113{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add a Node Pool to a Kubernetes Cluster
     * To add an additional node pool to a Kubernetes clusters, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools&#x60; with the following attributes.
     * @param {module:model/KubernetesNodePool} body
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~addKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    addKubernetesNodePool(body: any, clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the addRegistry operation.
     * @callback moduleapi/KubernetesApi~addRegistryCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Add Container Registry to Kubernetes Clusters
     * To integrate the container registry with Kubernetes clusters, send a POST request to &#x60;/v2/kubernetes/registry&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/ClusterRegistries} opts.body
     * @param {module:api/KubernetesApi~addRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     */
    addRegistry(opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the createKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~createKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20112{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Create a New Kubernetes Cluster
     * To create a new Kubernetes cluster, send a POST request to &#x60;/v2/kubernetes/clusters&#x60;. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details.
     * @param {module:model/Cluster} body
     * @param {module:api/KubernetesApi~createKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    createKubernetesCluster(body: any, callback: any): any;
    /**
     * Callback function to receive the result of the deleteKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~deleteKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Kubernetes Cluster
     * To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60;.  A 204 status code with no body will be returned in response to a successful request.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~deleteKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKubernetesCluster(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the deleteKubernetesNode operation.
     * @callback moduleapi/KubernetesApi~deleteKubernetesNodeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Node in a Kubernetes Cluster
     * To delete a single node in a pool, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID&#x60;.  Appending the &#x60;skip_drain&#x3D;1&#x60; query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.  Appending the &#x60;replace&#x3D;1&#x60; query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {String} nodeId A unique ID that can be used to reference a node in a Kubernetes node pool.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.skipDrain Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion. (default to <.>)
     * @param {Number} opts.replace Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement. (default to <.>)
     * @param {module:api/KubernetesApi~deleteKubernetesNodeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKubernetesNode(clusterId: string, nodePoolId: string, nodeId: string, opts: {
        skipDrain: number;
        replace: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the deleteKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~deleteKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Node Pool in a Kubernetes Cluster
     * To delete a node pool, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60;.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~deleteKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     */
    deleteKubernetesNodePool(clusterId: string, nodePoolId: string, callback: any): any;
    /**
     * Callback function to receive the result of the destroyKubernetesAssociatedResourcesDangerous operation.
     * @callback moduleapi/KubernetesApi~destroyKubernetesAssociatedResourcesDangerousCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Delete a Cluster and All of its Associated Resources (Dangerous)
     * To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous&#x60;. A 204 status code with no body will be returned in response to a successful request.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~destroyKubernetesAssociatedResourcesDangerousCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyKubernetesAssociatedResourcesDangerous(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the destroyKubernetesAssociatedResourcesSelective operation.
     * @callback moduleapi/KubernetesApi~destroyKubernetesAssociatedResourcesSelectiveCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Selectively Delete a Cluster and its Associated Resources
     * To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective&#x60;.  The JSON body of the request should include &#x60;load_balancers&#x60;, &#x60;volumes&#x60;, or &#x60;volume_snapshots&#x60; keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster&#x27;s associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account.
     * @param {module:model/DestroyAssociatedKubernetesResources} body
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~destroyKubernetesAssociatedResourcesSelectiveCallback} callback The callback function, accepting three arguments: error, data, response
     */
    destroyKubernetesAssociatedResourcesSelective(body: any, clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getAvailableUpgrades operation.
     * @callback moduleapi/KubernetesApi~getAvailableUpgradesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20036{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve Available Upgrades for an Existing Kubernetes Cluster
     * To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades&#x60;.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~getAvailableUpgradesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getAvailableUpgrades(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getClusterUser operation.
     * @callback moduleapi/KubernetesApi~getClusterUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve User Information for a Kubernetes Cluster
     * To show information the user associated with a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user&#x60;.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~getClusterUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getClusterUser(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getClusterlintResults operation.
     * @callback moduleapi/KubernetesApi~getClusterlintResultsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ClusterlintResults{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Fetch Clusterlint Diagnostics for a Kubernetes Cluster
     * To request clusterlint diagnostics for your cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint&#x60;. If the &#x60;run_id&#x60; query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md).
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {String} opts.runId Specifies the clusterlint run whose results will be retrieved.
     * @param {module:api/KubernetesApi~getClusterlintResultsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getClusterlintResults(clusterId: string, opts: {
        runId: string;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getCredentials operation.
     * @callback moduleapi/KubernetesApi~getCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Credentials{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve Credentials for a Kubernetes Cluster
     * This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \&quot;[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\&quot;.  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials&#x60;.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds&#x3D;$DURATION_IN_SECONDS&#x60;. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expirySeconds The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry. (default to <.>)
     * @param {module:api/KubernetesApi~getCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getCredentials(clusterId: string, opts: {
        expirySeconds: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getKubeconfig operation.
     * @callback moduleapi/KubernetesApi~getKubeconfigCallback
     * @param {String} error Error message, if any.
     * @param {'String'{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve the kubeconfig for a Kubernetes Cluster
     * This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, &#x60;kubectl&#x60;, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \&quot;[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\&quot;.  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig&#x60;.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds&#x3D;$DURATION_IN_SECONDS&#x60;. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expirySeconds The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry. (default to <.>)
     * @param {module:api/KubernetesApi~getKubeconfigCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getKubeconfig(clusterId: string, opts: {
        expirySeconds: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the getKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~getKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20112{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve an Existing Kubernetes Cluster
     * To show information about an existing Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60;.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~getKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getKubernetesCluster(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the getNodePool operation.
     * @callback moduleapi/KubernetesApi~getNodePoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20038{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Retrieve a Node Pool for a Kubernetes Cluster
     * To show information about a specific node pool in a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60;.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~getNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    getNodePool(clusterId: string, nodePoolId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listAllKubernetesClusters operation.
     * @callback moduleapi/KubernetesApi~listAllKubernetesClustersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20035{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Kubernetes Clusters
     * To list all of the Kubernetes clusters on your account, send a GET request to &#x60;/v2/kubernetes/clusters&#x60;.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.perPage Number of items returned per page (default to <.>)
     * @param {Number} opts.page Which &#x27;page&#x27; of paginated results to return. (default to <.>)
     * @param {module:api/KubernetesApi~listAllKubernetesClustersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listAllKubernetesClusters(opts: {
        perPage: number;
        page: number;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the listKubernetesAssociatedResources operation.
     * @callback moduleapi/KubernetesApi~listKubernetesAssociatedResourcesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AssociatedKubernetesResources{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Associated Resources for Cluster Deletion
     * To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources&#x60; endpoint.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~listKubernetesAssociatedResourcesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listKubernetesAssociatedResources(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the listKubernetesOptions operation.
     * @callback moduleapi/KubernetesApi~listKubernetesOptionsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/KubernetesOptions{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List Available Regions, Node Sizes, and Versions of Kubernetes
     * To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to &#x60;/v2/kubernetes/options&#x60;.
     * @param {module:api/KubernetesApi~listKubernetesOptionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listKubernetesOptions(callback: any): any;
    /**
     * Callback function to receive the result of the listNodePools operation.
     * @callback moduleapi/KubernetesApi~listNodePoolsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20037{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * List All Node Pools in a Kubernetes Clusters
     * To list all of the node pools in a Kubernetes clusters, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools&#x60;.
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~listNodePoolsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    listNodePools(clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the recycleKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~recycleKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Recycle a Kubernetes Node Pool
     * The endpoint has been deprecated. Please use the DELETE &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID&#x60; method instead.
     * @param {module:model/NodePoolIdRecycleBody} body
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~recycleKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     */
    recycleKubernetesNodePool(body: any, clusterId: string, nodePoolId: string, callback: any): any;
    /**
     * Callback function to receive the result of the removeRegistry operation.
     * @callback moduleapi/KubernetesApi~removeRegistryCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Remove Container Registry from Kubernetes Clusters
     * To remove the container registry from Kubernetes clusters, send a DELETE request to &#x60;/v2/kubernetes/registry&#x60;.
     * @param {Object} opts Optional parameters
     * @param {module:model/ClusterRegistries} opts.body
     * @param {module:api/KubernetesApi~removeRegistryCallback} callback The callback function, accepting three arguments: error, data, response
     */
    removeRegistry(opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the runClusterlint operation.
     * @callback moduleapi/KubernetesApi~runClusterlintCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2025{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Run Clusterlint Checks on a Kubernetes Cluster
     * Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint&#x60;. This will run all checks present in the &#x60;doks&#x60; group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md).
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {Object} opts Optional parameters
     * @param {module:model/ClusterlintRequest} opts.body
     * @param {module:api/KubernetesApi~runClusterlintCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    runClusterlint(clusterId: string, opts: {
        body: any;
    }, callback: any): any;
    /**
     * Callback function to receive the result of the updateKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~updateKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20112{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Kubernetes Cluster
     * To update a Kubernetes cluster, send a PUT request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60; and specify one or more of the attributes below.
     * @param {module:model/ClusterUpdate} body
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~updateKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateKubernetesCluster(body: any, clusterId: string, callback: any): any;
    /**
     * Callback function to receive the result of the updateKubernetesNodePool operation.
     * @callback moduleapi/KubernetesApi~updateKubernetesNodePoolCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2024{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Update a Node Pool in a Kubernetes Cluster
     * To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60; with the following attributes.
     * @param {module:model/KubernetesNodePoolUpdate} body
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {String} nodePoolId A unique ID that can be used to reference a Kubernetes node pool.
     * @param {module:api/KubernetesApi~updateKubernetesNodePoolCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    updateKubernetesNodePool(body: any, clusterId: string, nodePoolId: string, callback: any): any;
    /**
     * Callback function to receive the result of the upgradeKubernetesCluster operation.
     * @callback moduleapi/KubernetesApi~upgradeKubernetesClusterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */
    /**
     * Upgrade a Kubernetes Cluster
     * To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade&#x60;. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades&#x60;.
     * @param {module:model/ClusterIdUpgradeBody} body
     * @param {String} clusterId A unique ID that can be used to reference a Kubernetes cluster.
     * @param {module:api/KubernetesApi~upgradeKubernetesClusterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    upgradeKubernetesCluster(body: any, clusterId: string, callback: any): any;
}
/**
 * /KubernetesApi~addKubernetesNodePoolCallback
 */
export type moduleapi = (error: string, data: any, response: string) => any;

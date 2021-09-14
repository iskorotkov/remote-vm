# DigitalOceanApi.KubernetesApi

All URIs are relative to *https://api.digitalocean.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addKubernetesNodePool**](KubernetesApi.md#addKubernetesNodePool) | **POST** /v2/kubernetes/clusters/{cluster_id}/node_pools | Add a Node Pool to a Kubernetes Cluster
[**addRegistry**](KubernetesApi.md#addRegistry) | **POST** /v2/kubernetes/registry | Add Container Registry to Kubernetes Clusters
[**createKubernetesCluster**](KubernetesApi.md#createKubernetesCluster) | **POST** /v2/kubernetes/clusters | Create a New Kubernetes Cluster
[**deleteKubernetesCluster**](KubernetesApi.md#deleteKubernetesCluster) | **DELETE** /v2/kubernetes/clusters/{cluster_id} | Delete a Kubernetes Cluster
[**deleteKubernetesNode**](KubernetesApi.md#deleteKubernetesNode) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/nodes/{node_id} | Delete a Node in a Kubernetes Cluster
[**deleteKubernetesNodePool**](KubernetesApi.md#deleteKubernetesNodePool) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id} | Delete a Node Pool in a Kubernetes Cluster
[**destroyKubernetesAssociatedResourcesDangerous**](KubernetesApi.md#destroyKubernetesAssociatedResourcesDangerous) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/dangerous | Delete a Cluster and All of its Associated Resources (Dangerous)
[**destroyKubernetesAssociatedResourcesSelective**](KubernetesApi.md#destroyKubernetesAssociatedResourcesSelective) | **DELETE** /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources/selective | Selectively Delete a Cluster and its Associated Resources
[**getAvailableUpgrades**](KubernetesApi.md#getAvailableUpgrades) | **GET** /v2/kubernetes/clusters/{cluster_id}/upgrades | Retrieve Available Upgrades for an Existing Kubernetes Cluster
[**getClusterUser**](KubernetesApi.md#getClusterUser) | **GET** /v2/kubernetes/clusters/{cluster_id}/user | Retrieve User Information for a Kubernetes Cluster
[**getClusterlintResults**](KubernetesApi.md#getClusterlintResults) | **GET** /v2/kubernetes/clusters/{cluster_id}/clusterlint | Fetch Clusterlint Diagnostics for a Kubernetes Cluster
[**getCredentials**](KubernetesApi.md#getCredentials) | **GET** /v2/kubernetes/clusters/{cluster_id}/credentials | Retrieve Credentials for a Kubernetes Cluster
[**getKubeconfig**](KubernetesApi.md#getKubeconfig) | **GET** /v2/kubernetes/clusters/{cluster_id}/kubeconfig | Retrieve the kubeconfig for a Kubernetes Cluster
[**getKubernetesCluster**](KubernetesApi.md#getKubernetesCluster) | **GET** /v2/kubernetes/clusters/{cluster_id} | Retrieve an Existing Kubernetes Cluster
[**getNodePool**](KubernetesApi.md#getNodePool) | **GET** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id} | Retrieve a Node Pool for a Kubernetes Cluster
[**listAllKubernetesClusters**](KubernetesApi.md#listAllKubernetesClusters) | **GET** /v2/kubernetes/clusters | List All Kubernetes Clusters
[**listKubernetesAssociatedResources**](KubernetesApi.md#listKubernetesAssociatedResources) | **GET** /v2/kubernetes/clusters/{cluster_id}/destroy_with_associated_resources | List Associated Resources for Cluster Deletion
[**listKubernetesOptions**](KubernetesApi.md#listKubernetesOptions) | **GET** /v2/kubernetes/options | List Available Regions, Node Sizes, and Versions of Kubernetes
[**listNodePools**](KubernetesApi.md#listNodePools) | **GET** /v2/kubernetes/clusters/{cluster_id}/node_pools | List All Node Pools in a Kubernetes Clusters
[**recycleKubernetesNodePool**](KubernetesApi.md#recycleKubernetesNodePool) | **POST** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id}/recycle | Recycle a Kubernetes Node Pool
[**removeRegistry**](KubernetesApi.md#removeRegistry) | **DELETE** /v2/kubernetes/registry | Remove Container Registry from Kubernetes Clusters
[**runClusterlint**](KubernetesApi.md#runClusterlint) | **POST** /v2/kubernetes/clusters/{cluster_id}/clusterlint | Run Clusterlint Checks on a Kubernetes Cluster
[**updateKubernetesCluster**](KubernetesApi.md#updateKubernetesCluster) | **PUT** /v2/kubernetes/clusters/{cluster_id} | Update a Kubernetes Cluster
[**updateKubernetesNodePool**](KubernetesApi.md#updateKubernetesNodePool) | **PUT** /v2/kubernetes/clusters/{cluster_id}/node_pools/{node_pool_id} | Update a Node Pool in a Kubernetes Cluster
[**upgradeKubernetesCluster**](KubernetesApi.md#upgradeKubernetesCluster) | **POST** /v2/kubernetes/clusters/{cluster_id}/upgrade | Upgrade a Kubernetes Cluster

<a name="addKubernetesNodePool"></a>
# **addKubernetesNodePool**
> InlineResponse20113 addKubernetesNodePool(body, clusterId)

Add a Node Pool to a Kubernetes Cluster

To add an additional node pool to a Kubernetes clusters, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools&#x60; with the following attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.KubernetesNodePool(); // KubernetesNodePool | 
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.addKubernetesNodePool(body, clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**KubernetesNodePool**](KubernetesNodePool.md)|  | 
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**InlineResponse20113**](InlineResponse20113.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="addRegistry"></a>
# **addRegistry**
> addRegistry(opts)

Add Container Registry to Kubernetes Clusters

To integrate the container registry with Kubernetes clusters, send a POST request to &#x60;/v2/kubernetes/registry&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let opts = { 
  'body': new DigitalOceanApi.ClusterRegistries() // ClusterRegistries | 
};
apiInstance.addRegistry(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ClusterRegistries**](ClusterRegistries.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createKubernetesCluster"></a>
# **createKubernetesCluster**
> InlineResponse20112 createKubernetesCluster(body)

Create a New Kubernetes Cluster

To create a new Kubernetes cluster, send a POST request to &#x60;/v2/kubernetes/clusters&#x60;. The request must contain at least one node pool with at least one worker.  The request may contain a maintenance window policy describing a time period when disruptive maintenance tasks may be carried out. Omitting the policy implies that a window will be chosen automatically. See [here](https://www.digitalocean.com/docs/kubernetes/how-to/upgrade-cluster/) for details. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.Cluster(); // Cluster | 

apiInstance.createKubernetesCluster(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Cluster**](Cluster.md)|  | 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteKubernetesCluster"></a>
# **deleteKubernetesCluster**
> deleteKubernetesCluster(clusterId)

Delete a Kubernetes Cluster

To delete a Kubernetes cluster and all services deployed to it, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60;.  A 204 status code with no body will be returned in response to a successful request. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.deleteKubernetesCluster(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteKubernetesNode"></a>
# **deleteKubernetesNode**
> deleteKubernetesNode(clusterId, nodePoolId, nodeId, opts)

Delete a Node in a Kubernetes Cluster

To delete a single node in a pool, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID&#x60;.  Appending the &#x60;skip_drain&#x3D;1&#x60; query parameter to the request causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion.  Appending the &#x60;replace&#x3D;1&#x60; query parameter to the request causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let nodePoolId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes node pool.
let nodeId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a node in a Kubernetes node pool.
let opts = { 
  'skipDrain': 0, // Number | Specifies whether or not to drain workloads from a node before it is deleted. Setting it to `1` causes node draining to be skipped. Omitting the query parameter or setting its value to `0` carries out draining prior to deletion.
  'replace': 0 // Number | Specifies whether or not to replace a node after it has been deleted. Setting it to `1` causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to `0` deletes without replacement.
};
apiInstance.deleteKubernetesNode(clusterId, nodePoolId, nodeId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **nodePoolId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes node pool. | 
 **nodeId** | [**String**](.md)| A unique ID that can be used to reference a node in a Kubernetes node pool. | 
 **skipDrain** | **Number**| Specifies whether or not to drain workloads from a node before it is deleted. Setting it to &#x60;1&#x60; causes node draining to be skipped. Omitting the query parameter or setting its value to &#x60;0&#x60; carries out draining prior to deletion. | [optional] [default to 0]
 **replace** | **Number**| Specifies whether or not to replace a node after it has been deleted. Setting it to &#x60;1&#x60; causes the node to be replaced by a new one after deletion. Omitting the query parameter or setting its value to &#x60;0&#x60; deletes without replacement. | [optional] [default to 0]

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteKubernetesNodePool"></a>
# **deleteKubernetesNodePool**
> deleteKubernetesNodePool(clusterId, nodePoolId)

Delete a Node Pool in a Kubernetes Cluster

To delete a node pool, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60;.  A 204 status code with no body will be returned in response to a successful request. Nodes in the pool will subsequently be drained and deleted. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let nodePoolId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes node pool.

apiInstance.deleteKubernetesNodePool(clusterId, nodePoolId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **nodePoolId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes node pool. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyKubernetesAssociatedResourcesDangerous"></a>
# **destroyKubernetesAssociatedResourcesDangerous**
> destroyKubernetesAssociatedResourcesDangerous(clusterId)

Delete a Cluster and All of its Associated Resources (Dangerous)

To delete a Kubernetes cluster with all of its associated resources, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/dangerous&#x60;. A 204 status code with no body will be returned in response to a successful request. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.destroyKubernetesAssociatedResourcesDangerous(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="destroyKubernetesAssociatedResourcesSelective"></a>
# **destroyKubernetesAssociatedResourcesSelective**
> destroyKubernetesAssociatedResourcesSelective(body, clusterId)

Selectively Delete a Cluster and its Associated Resources

To delete a Kubernetes cluster along with a subset of its associated resources, send a DELETE request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources/selective&#x60;.  The JSON body of the request should include &#x60;load_balancers&#x60;, &#x60;volumes&#x60;, or &#x60;volume_snapshots&#x60; keys each set to an array of IDs for the associated resources to be destroyed.  The IDs can be found by querying the cluster&#x27;s associated resources endpoint. Any associated resource not included in the request will remain and continue to accrue changes on your account. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.DestroyAssociatedKubernetesResources(); // DestroyAssociatedKubernetesResources | 
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.destroyKubernetesAssociatedResourcesSelective(body, clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DestroyAssociatedKubernetesResources**](DestroyAssociatedKubernetesResources.md)|  | 
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getAvailableUpgrades"></a>
# **getAvailableUpgrades**
> InlineResponse20036 getAvailableUpgrades(clusterId)

Retrieve Available Upgrades for an Existing Kubernetes Cluster

To determine whether a cluster can be upgraded, and the versions to which it can be upgraded, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.getAvailableUpgrades(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**InlineResponse20036**](InlineResponse20036.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getClusterUser"></a>
# **getClusterUser**
> User getClusterUser(clusterId)

Retrieve User Information for a Kubernetes Cluster

To show information the user associated with a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/user&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.getClusterUser(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**User**](User.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getClusterlintResults"></a>
# **getClusterlintResults**
> ClusterlintResults getClusterlintResults(clusterId, opts)

Fetch Clusterlint Diagnostics for a Kubernetes Cluster

To request clusterlint diagnostics for your cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint&#x60;. If the &#x60;run_id&#x60; query parameter is provided, then the diagnostics for the specific run is fetched. By default, the latest results are shown.  To find out how to address clusterlint feedback, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let opts = { 
  'runId': "38400000-8cf0-11bd-b23e-10b96e4ef00d" // String | Specifies the clusterlint run whose results will be retrieved.
};
apiInstance.getClusterlintResults(clusterId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **runId** | [**String**](.md)| Specifies the clusterlint run whose results will be retrieved. | [optional] 

### Return type

[**ClusterlintResults**](ClusterlintResults.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getCredentials"></a>
# **getCredentials**
> Credentials getCredentials(clusterId, opts)

Retrieve Credentials for a Kubernetes Cluster

This endpoint returns a JSON object . It can be used to programmatically construct Kubernetes clients which cannot parse kubeconfig files.  The resulting JSON object contains token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \&quot;[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\&quot;.  To retrieve credentials for accessing a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/credentials&#x60;.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds&#x3D;$DURATION_IN_SECONDS&#x60;. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let opts = { 
  'expirySeconds': 0 // Number | The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
};
apiInstance.getCredentials(clusterId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **expirySeconds** | **Number**| The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry. | [optional] [default to 0]

### Return type

[**Credentials**](Credentials.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getKubeconfig"></a>
# **getKubeconfig**
> &#x27;String&#x27; getKubeconfig(clusterId, opts)

Retrieve the kubeconfig for a Kubernetes Cluster

This endpoint returns a kubeconfig file in YAML format. It can be used to connect to and administer the cluster using the Kubernetes command line tool, &#x60;kubectl&#x60;, or other programs supporting kubeconfig files (e.g., client libraries).  The resulting kubeconfig file uses token-based authentication for clusters supporting it, and certificate-based authentication otherwise. For a list of supported versions and more information, see \&quot;[How to Connect to a DigitalOcean Kubernetes Cluster with kubectl](https://www.digitalocean.com/docs/kubernetes/how-to/connect-with-kubectl/)\&quot;.  To retrieve a kubeconfig file for use with a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig&#x60;.  Clusters supporting token-based authentication may define an expiration by passing a duration in seconds as a query parameter to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/kubeconfig?expiry_seconds&#x3D;$DURATION_IN_SECONDS&#x60;. If not set or 0, then the token will have a 7 day expiry. The query parameter has no impact in certificate-based authentication. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let opts = { 
  'expirySeconds': 0 // Number | The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry.
};
apiInstance.getKubeconfig(clusterId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **expirySeconds** | **Number**| The duration in seconds that the returned Kubernetes credentials will be valid. If not set or 0, the credentials will have a 7 day expiry. | [optional] [default to 0]

### Return type

**&#x27;String&#x27;**

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/yaml, application/json

<a name="getKubernetesCluster"></a>
# **getKubernetesCluster**
> InlineResponse20112 getKubernetesCluster(clusterId)

Retrieve an Existing Kubernetes Cluster

To show information about an existing Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.getKubernetesCluster(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getNodePool"></a>
# **getNodePool**
> InlineResponse20038 getNodePool(clusterId, nodePoolId)

Retrieve a Node Pool for a Kubernetes Cluster

To show information about a specific node pool in a Kubernetes cluster, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let nodePoolId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes node pool.

apiInstance.getNodePool(clusterId, nodePoolId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **nodePoolId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes node pool. | 

### Return type

[**InlineResponse20038**](InlineResponse20038.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listAllKubernetesClusters"></a>
# **listAllKubernetesClusters**
> InlineResponse20035 listAllKubernetesClusters(opts)

List All Kubernetes Clusters

To list all of the Kubernetes clusters on your account, send a GET request to &#x60;/v2/kubernetes/clusters&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let opts = { 
  'perPage': 20, // Number | Number of items returned per page
  'page': 1 // Number | Which 'page' of paginated results to return.
};
apiInstance.listAllKubernetesClusters(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **perPage** | **Number**| Number of items returned per page | [optional] [default to 20]
 **page** | **Number**| Which &#x27;page&#x27; of paginated results to return. | [optional] [default to 1]

### Return type

[**InlineResponse20035**](InlineResponse20035.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listKubernetesAssociatedResources"></a>
# **listKubernetesAssociatedResources**
> AssociatedKubernetesResources listKubernetesAssociatedResources(clusterId)

List Associated Resources for Cluster Deletion

To list the associated billable resources that can be destroyed along with a cluster, send a GET request to the &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/destroy_with_associated_resources&#x60; endpoint.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.listKubernetesAssociatedResources(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**AssociatedKubernetesResources**](AssociatedKubernetesResources.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listKubernetesOptions"></a>
# **listKubernetesOptions**
> KubernetesOptions listKubernetesOptions()

List Available Regions, Node Sizes, and Versions of Kubernetes

To list the versions of Kubernetes available for use, the regions that support Kubernetes, and the available node sizes, send a GET request to &#x60;/v2/kubernetes/options&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
apiInstance.listKubernetesOptions((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**KubernetesOptions**](KubernetesOptions.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listNodePools"></a>
# **listNodePools**
> InlineResponse20037 listNodePools(clusterId)

List All Node Pools in a Kubernetes Clusters

To list all of the node pools in a Kubernetes clusters, send a GET request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.listNodePools(clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**InlineResponse20037**](InlineResponse20037.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="recycleKubernetesNodePool"></a>
# **recycleKubernetesNodePool**
> recycleKubernetesNodePool(body, clusterId, nodePoolId)

Recycle a Kubernetes Node Pool

The endpoint has been deprecated. Please use the DELETE &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID/nodes/$NODE_ID&#x60; method instead. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.NodePoolIdRecycleBody(); // NodePoolIdRecycleBody | 
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let nodePoolId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes node pool.

apiInstance.recycleKubernetesNodePool(body, clusterId, nodePoolId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**NodePoolIdRecycleBody**](NodePoolIdRecycleBody.md)|  | 
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **nodePoolId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes node pool. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="removeRegistry"></a>
# **removeRegistry**
> removeRegistry(opts)

Remove Container Registry from Kubernetes Clusters

To remove the container registry from Kubernetes clusters, send a DELETE request to &#x60;/v2/kubernetes/registry&#x60;.

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let opts = { 
  'body': new DigitalOceanApi.ClusterRegistries() // ClusterRegistries | 
};
apiInstance.removeRegistry(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ClusterRegistries**](ClusterRegistries.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="runClusterlint"></a>
# **runClusterlint**
> InlineResponse2025 runClusterlint(clusterId, opts)

Run Clusterlint Checks on a Kubernetes Cluster

Clusterlint helps operators conform to Kubernetes best practices around resources, security and reliability to avoid common problems while operating or upgrading the clusters.  To request a clusterlint run on your cluster, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/clusterlint&#x60;. This will run all checks present in the &#x60;doks&#x60; group by default, if a request body is not specified. Optionally specify the below attributes.  For information about the available checks, please refer to [the clusterlint check documentation](https://github.com/digitalocean/clusterlint/blob/master/checks.md). 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let opts = { 
  'body': new DigitalOceanApi.ClusterlintRequest() // ClusterlintRequest | 
};
apiInstance.runClusterlint(clusterId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **body** | [**ClusterlintRequest**](ClusterlintRequest.md)|  | [optional] 

### Return type

[**InlineResponse2025**](InlineResponse2025.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateKubernetesCluster"></a>
# **updateKubernetesCluster**
> InlineResponse20112 updateKubernetesCluster(body, clusterId)

Update a Kubernetes Cluster

To update a Kubernetes cluster, send a PUT request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID&#x60; and specify one or more of the attributes below. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.ClusterUpdate(); // ClusterUpdate | 
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.updateKubernetesCluster(body, clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ClusterUpdate**](ClusterUpdate.md)|  | 
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

[**InlineResponse20112**](InlineResponse20112.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateKubernetesNodePool"></a>
# **updateKubernetesNodePool**
> InlineResponse2024 updateKubernetesNodePool(body, clusterId, nodePoolId)

Update a Node Pool in a Kubernetes Cluster

To update the name of a node pool, edit the tags applied to it, or adjust its number of nodes, send a PUT request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/node_pools/$NODE_POOL_ID&#x60; with the following attributes. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.KubernetesNodePoolUpdate(); // KubernetesNodePoolUpdate | 
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.
let nodePoolId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes node pool.

apiInstance.updateKubernetesNodePool(body, clusterId, nodePoolId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**KubernetesNodePoolUpdate**](KubernetesNodePoolUpdate.md)|  | 
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 
 **nodePoolId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes node pool. | 

### Return type

[**InlineResponse2024**](InlineResponse2024.md)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="upgradeKubernetesCluster"></a>
# **upgradeKubernetesCluster**
> upgradeKubernetesCluster(body, clusterId)

Upgrade a Kubernetes Cluster

To immediately upgrade a Kubernetes cluster to a newer patch release of Kubernetes, send a POST request to &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrade&#x60;. The body of the request must specify a version attribute.  Available upgrade versions for a cluster can be fetched from &#x60;/v2/kubernetes/clusters/$K8S_CLUSTER_ID/upgrades&#x60;. 

### Example
```javascript
import {DigitalOceanApi} from 'digital_ocean_api';
let defaultClient = DigitalOceanApi.ApiClient.instance;


let apiInstance = new DigitalOceanApi.KubernetesApi();
let body = new DigitalOceanApi.ClusterIdUpgradeBody(); // ClusterIdUpgradeBody | 
let clusterId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | A unique ID that can be used to reference a Kubernetes cluster.

apiInstance.upgradeKubernetesCluster(body, clusterId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ClusterIdUpgradeBody**](ClusterIdUpgradeBody.md)|  | 
 **clusterId** | [**String**](.md)| A unique ID that can be used to reference a Kubernetes cluster. | 

### Return type

null (empty response body)

### Authorization

[bearer_auth](../README.md#bearer_auth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


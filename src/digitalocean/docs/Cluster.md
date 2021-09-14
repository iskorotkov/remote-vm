# DigitalOceanApi.Cluster

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | A unique ID that can be used to identify and reference a Kubernetes cluster. | [optional] 
**name** | **String** | A human-readable name for a Kubernetes cluster. | 
**region** | **String** | The slug identifier for the region where the Kubernetes cluster is located. | 
**version** | **String** | The slug identifier for the version of Kubernetes used for the cluster. If set to a minor version (e.g. \&quot;1.14\&quot;), the latest version within it will be used (e.g. \&quot;1.14.6-do.1\&quot;); if set to \&quot;latest\&quot;, the latest published version will be used. See the &#x60;/v2/kubernetes/options&#x60; endpoint to find all currently available versions. | 
**clusterSubnet** | **String** | The range of IP addresses in the overlay network of the Kubernetes cluster in CIDR notation. | [optional] 
**serviceSubnet** | **String** | The range of assignable IP addresses for services running in the Kubernetes cluster in CIDR notation. | [optional] 
**vpcUuid** | **String** | A string specifying the UUID of the VPC to which the Kubernetes cluster is assigned. | [optional] 
**ipv4** | **String** | The public IPv4 address of the Kubernetes master node. | [optional] 
**endpoint** | **String** | The base URL of the API server on the Kubernetes master node. | [optional] 
**tags** | **[String]** | An array of tags applied to the Kubernetes cluster. All clusters are automatically tagged &#x60;k8s&#x60; and &#x60;k8s:$K8S_CLUSTER_ID&#x60;. | [optional] 
**nodePools** | [**[KubernetesNodePool]**](KubernetesNodePool.md) | An object specifying the details of the worker nodes available to the Kubernetes cluster. | 
**maintenancePolicy** | [**MaintenancePolicy**](MaintenancePolicy.md) |  | [optional] 
**autoUpgrade** | **Boolean** | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. | [optional] [default to false]
**status** | [**ClusterStatus**](ClusterStatus.md) |  | [optional] 
**createdAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was created. | [optional] 
**updatedAt** | **Date** | A time value given in ISO8601 combined date and time format that represents when the Kubernetes cluster was last updated. | [optional] 
**surgeUpgrade** | **Boolean** | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. Surge upgrade makes cluster upgrades fast and reliable by bringing up new nodes before destroying the outdated nodes. | [optional] [default to false]
**registryEnabled** | **Boolean** | A read-only boolean value indicating if a container registry is integrated with the cluster. | [optional] 

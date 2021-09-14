# DigitalOceanApi.ClusterUpdate

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | A human-readable name for a Kubernetes cluster. | 
**tags** | **[String]** | An array of tags applied to the Kubernetes cluster. All clusters are automatically tagged &#x60;k8s&#x60; and &#x60;k8s:$K8S_CLUSTER_ID&#x60;. | [optional] 
**maintenancePolicy** | [**MaintenancePolicy**](MaintenancePolicy.md) |  | [optional] 
**autoUpgrade** | **Boolean** | A boolean value indicating whether the cluster will be automatically upgraded to new patch releases during its maintenance window. | [optional] [default to false]
**surgeUpgrade** | **Boolean** | A boolean value indicating whether surge upgrade is enabled/disabled for the cluster. Surge upgrade makes cluster upgrades fast and reliable by bringing up new nodes before destroying the outdated nodes. | [optional] [default to false]

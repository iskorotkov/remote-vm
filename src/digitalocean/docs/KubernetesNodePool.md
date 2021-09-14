# DigitalOceanApi.KubernetesNodePool

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | A unique ID that can be used to identify and reference a specific node pool. | [optional] 
**name** | **String** | A human-readable name for the node pool. | 
**count** | **Number** | The number of Droplet instances in the node pool. | 
**tags** | **[String]** | An array containing the tags applied to the node pool. All node pools are automatically tagged &#x60;k8s&#x60;, &#x60;k8s-worker&#x60;, and &#x60;k8s:$K8S_CLUSTER_ID&#x60;. | [optional] 
**labels** | **Object** | An object containing a set of Kubernetes labels. The keys and are values are both user-defined. | [optional] 
**taints** | [**[KubernetesNodePoolTaint]**](KubernetesNodePoolTaint.md) | An array of taints to apply to all nodes in a pool. Taints will automatically be applied to all existing nodes and any subsequent nodes added to the pool. When a taint is removed, it is removed from all nodes in the pool. | [optional] 
**autoScale** | **Boolean** | A boolean value indicating whether auto-scaling is enabled for this node pool. | [optional] 
**minNodes** | **Number** | The minimum number of nodes that this node pool can be auto-scaled to. The value will be &#x60;0&#x60; if &#x60;auto_scale&#x60; is set to &#x60;false&#x60;. | [optional] 
**maxNodes** | **Number** | The maximum number of nodes that this node pool can be auto-scaled to. The value will be &#x60;0&#x60; if &#x60;auto_scale&#x60; is set to &#x60;false&#x60;. | [optional] 
**nodes** | [**[Node]**](Node.md) | An object specifying the details of a specific worker node in a node pool. | [optional] 

/**
 * The KubernetesNodePoolBase model module.
 * @module model/KubernetesNodePoolBase
 * @version 2.0
 */
export class KubernetesNodePoolBase {
    /**
     * Constructs a <code>KubernetesNodePoolBase</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesNodePoolBase} obj Optional instance to populate.
     * @return {module:model/KubernetesNodePoolBase} The populated <code>KubernetesNodePoolBase</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A unique ID that can be used to identify and reference a specific node pool.
     * @member {String} id
     */
    id: any;
    /**
     * A human-readable name for the node pool.
     * @member {String} name
     */
    name: any;
    /**
     * The number of Droplet instances in the node pool.
     * @member {Number} count
     */
    count: any;
    /**
     * An array containing the tags applied to the node pool. All node pools are automatically tagged `k8s`, `k8s-worker`, and `k8s:$K8S_CLUSTER_ID`.
     * @member {Array.<String>} tags
     */
    tags: any;
    /**
     * An object containing a set of Kubernetes labels. The keys and are values are both user-defined.
     * @member {Object} labels
     */
    labels: any;
    /**
     * An array of taints to apply to all nodes in a pool. Taints will automatically be applied to all existing nodes and any subsequent nodes added to the pool. When a taint is removed, it is removed from all nodes in the pool.
     * @member {Array.<module:model/KubernetesNodePoolTaint>} taints
     */
    taints: any;
    /**
     * A boolean value indicating whether auto-scaling is enabled for this node pool.
     * @member {Boolean} autoScale
     */
    autoScale: any;
    /**
     * The minimum number of nodes that this node pool can be auto-scaled to. The value will be `0` if `auto_scale` is set to `false`.
     * @member {Number} minNodes
     */
    minNodes: any;
    /**
     * The maximum number of nodes that this node pool can be auto-scaled to. The value will be `0` if `auto_scale` is set to `false`.
     * @member {Number} maxNodes
     */
    maxNodes: any;
    /**
     * An object specifying the details of a specific worker node in a node pool.
     * @member {Array.<module:model/Node>} nodes
     */
    nodes: any;
}

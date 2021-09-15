/**
 * The KubernetesNodePool model module.
 * @module model/KubernetesNodePool
 * @version 2.0
 */
export class KubernetesNodePool extends KubernetesNodePoolSize {
    /**
     * Constructs a new <code>KubernetesNodePool</code>.
     * @alias module:model/KubernetesNodePool
     * @class
     * @extends module:model/KubernetesNodePoolSize
     * @param name {} A human-readable name for the node pool.
     * @param count {} The number of Droplet instances in the node pool.
     * @param size {} The slug identifier for the type of Droplet used as workers in the node pool.
     */
    constructor(name: any, count: any, size: any);
    name: any;
    count: any;
    /**
     * A unique ID that can be used to identify and reference a specific node pool.
     * @member {String} id
     */
    id: any;
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
import { KubernetesNodePoolSize } from "./KubernetesNodePoolSize";

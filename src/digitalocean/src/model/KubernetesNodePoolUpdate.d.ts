/**
 * The KubernetesNodePoolUpdate model module.
 * @module model/KubernetesNodePoolUpdate
 * @version 2.0
 */
export class KubernetesNodePoolUpdate extends KubernetesNodePoolBase {
    /**
     * Constructs a new <code>KubernetesNodePoolUpdate</code>.
     * @alias module:model/KubernetesNodePoolUpdate
     * @class
     * @extends module:model/KubernetesNodePoolBase
     * @param name {} A human-readable name for the node pool.
     * @param count {} The number of Droplet instances in the node pool.
     */
    constructor(name: any, count: any);
}
import { KubernetesNodePoolBase } from "./KubernetesNodePoolBase";

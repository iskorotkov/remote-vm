/**
 * The KubernetesNodePoolSize model module.
 * @module model/KubernetesNodePoolSize
 * @version 2.0
 */
export class KubernetesNodePoolSize {
    /**
     * Constructs a <code>KubernetesNodePoolSize</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesNodePoolSize} obj Optional instance to populate.
     * @return {module:model/KubernetesNodePoolSize} The populated <code>KubernetesNodePoolSize</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * The slug identifier for the type of Droplet used as workers in the node pool.
     * @member {String} size
     */
    size: any;
}

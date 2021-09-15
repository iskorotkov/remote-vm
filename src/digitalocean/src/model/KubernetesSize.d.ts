/**
 * The KubernetesSize model module.
 * @module model/KubernetesSize
 * @version 2.0
 */
export class KubernetesSize {
    /**
     * Constructs a <code>KubernetesSize</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesSize} obj Optional instance to populate.
     * @return {module:model/KubernetesSize} The populated <code>KubernetesSize</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A Droplet size available for use in a Kubernetes node pool.
     * @member {String} name
     */
    name: any;
    /**
     * The identifier for a size for use when creating a new cluster.
     * @member {String} slug
     */
    slug: any;
}

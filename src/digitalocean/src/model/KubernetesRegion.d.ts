/**
 * The KubernetesRegion model module.
 * @module model/KubernetesRegion
 * @version 2.0
 */
export class KubernetesRegion {
    /**
     * Constructs a <code>KubernetesRegion</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/KubernetesRegion} obj Optional instance to populate.
     * @return {module:model/KubernetesRegion} The populated <code>KubernetesRegion</code> instance.
     */
    static constructFromObject(data: any, obj: any): any;
    /**
     * A DigitalOcean region where Kubernetes is available.
     * @member {String} name
     */
    name: any;
    /**
     * The identifier for a region for use when creating a new cluster.
     * @member {String} slug
     */
    slug: any;
}
